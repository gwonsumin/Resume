import Matter from 'matter-js'

const WALL = 16

export type FooterPhysicsSpec =
  | { kind: 'circle'; element: HTMLElement; radius: number }
  | { kind: 'box'; element: HTMLElement; width: number; height: number }

export function mountFooterPhysics(
  container: HTMLElement,
  specs: FooterPhysicsSpec[],
): () => void {
  /* Matter 좌표계는 반드시 마우스가 붙은 container와 동일한 w/h (getBoundingClientRect 권장) */
  const cr = container.getBoundingClientRect()
  const w = Math.max(1, Math.round(cr.width))
  const h = Math.max(1, Math.round(cr.height))

  const engine = Matter.Engine.create({ enableSleeping: true })
  engine.world.gravity.y = 0.78

  /* 마스크·뷰포트 하단에서 잘리지 않도록 바닥을 충분히 올림 */
  const bottomSafe = Math.min(140, Math.max(88, h * 0.11))
  const floorY = h - bottomSafe - WALL / 2

  const floor = Matter.Bodies.rectangle(w / 2, floorY, w + WALL * 4, WALL, {
    isStatic: true,
    friction: 0.78,
    frictionStatic: 0.95,
    restitution: 0.06,
  })
  const ceiling = Matter.Bodies.rectangle(w / 2, WALL / 2, w + WALL * 4, WALL, { isStatic: true })
  const leftWall = Matter.Bodies.rectangle(WALL / 2, h / 2, WALL, h + WALL * 3, { isStatic: true })
  const rightWall = Matter.Bodies.rectangle(w - WALL / 2, h / 2, WALL, h + WALL * 3, { isStatic: true })

  const dynamics: Matter.Body[] = []
  const pairs: { body: Matter.Body; el: HTMLElement }[] = []

  const floorTopY = floorY - WALL / 2
  /* 초기 스폰: 중·하단 빈 영역, 바닥(클립)에서 띄움 */
  const bandTop = h * 0.36
  const bandBottom = floorTopY - Math.max(64, h * 0.08)
  const liftFromFloor = Math.min(240, Math.max(168, h * 0.23))
  const rowGap = Math.min(48, Math.max(28, h * 0.042))
  const spreadX = (i: number, n: number) => {
    const pad = w * 0.1
    const t = (i + 1) / (n + 1)
    return pad + (w - pad * 2) * t + Math.sin(i * 2.4 + 1) * (w * 0.035)
  }

  specs.forEach((spec, i) => {
    const rawY = floorTopY - liftFromFloor - i * rowGap
    const spawnY = Math.min(bandBottom - 20, Math.max(bandTop + 52, rawY))
    const spawnX = spreadX(i, specs.length)

    if (spec.kind === 'circle') {
      const body = Matter.Bodies.circle(spawnX, spawnY, spec.radius, {
        restitution: 0.18,
        friction: 0.42,
        frictionAir: 0.015,
        density: 0.0024,
      })
      dynamics.push(body)
      pairs.push({ body, el: spec.element })
    } else {
      const { width: bw, height: bh } = spec
      const body = Matter.Bodies.rectangle(spawnX, spawnY, bw, bh, {
        chamfer: { radius: Math.min(16, bw * 0.1) },
        restitution: 0.1,
        friction: 0.58,
        frictionAir: 0.02,
        density: 0.002,
      })
      dynamics.push(body)
      pairs.push({ body, el: spec.element })
    }
  })

  const mouse = Matter.Mouse.create(container)

  /* Matter.Mouse는 wheel/touch에 non-passive 리스너 + preventDefault → 푸터 위에서 전체 페이지 스크롤이 막힘 */
  const { mousewheel, mousemove, mousedown, mouseup } = mouse as typeof mouse & {
    mousewheel: (e: WheelEvent) => void
    mousemove: (e: Event) => void
    mousedown: (e: Event) => void
    mouseup: (e: Event) => void
  }
  container.removeEventListener('wheel', mousewheel as EventListener)
  container.addEventListener('wheel', mousewheel as EventListener, { passive: true })

  container.removeEventListener('touchmove', mousemove as EventListener)
  container.addEventListener('touchmove', mousemove as EventListener, { passive: true })

  container.removeEventListener('touchstart', mousedown as EventListener)
  container.addEventListener('touchstart', mousedown as EventListener, { passive: true })

  container.removeEventListener('touchend', mouseup as EventListener)
  container.addEventListener('touchend', mouseup as EventListener, { passive: true })

  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.42,
      damping: 0.08,
      render: { visible: false },
    },
  })

  Matter.Composite.add(engine.world, [floor, ceiling, leftWall, rightWall, ...dynamics, mouseConstraint])

  container.style.cursor = 'grab'
  /* touch-action:none 이면 푸터에서 시작하는 세로 스와이프 스크롤이 막힘 */
  container.style.touchAction = 'pan-y'

  const onGrab = () => {
    container.style.cursor = 'grabbing'
  }
  const onRelease = () => {
    container.style.cursor = 'grab'
  }
  container.addEventListener('pointerdown', onGrab)
  window.addEventListener('pointerup', onRelease)
  window.addEventListener('pointercancel', onRelease)

  const sync = () => {
    for (const { body, el } of pairs) {
      const bw = el.offsetWidth || 1
      const bh = el.offsetHeight || 1
      el.style.transform = `translate3d(${body.position.x - bw / 2}px, ${body.position.y - bh / 2}px, 0) rotate(${body.angle}rad)`
    }
  }

  Matter.Events.on(engine, 'afterUpdate', sync)

  const runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)

  const raf0 = requestAnimationFrame(sync)

  return () => {
    cancelAnimationFrame(raf0)
    container.removeEventListener('pointerdown', onGrab)
    window.removeEventListener('pointerup', onRelease)
    window.removeEventListener('pointercancel', onRelease)
    container.removeEventListener('wheel', mousewheel as EventListener)
    container.removeEventListener('touchmove', mousemove as EventListener)
    container.removeEventListener('touchstart', mousedown as EventListener)
    container.removeEventListener('touchend', mouseup as EventListener)
    Matter.Events.off(engine, 'afterUpdate', sync)
    Matter.Runner.stop(runner)
    Matter.World.clear(engine.world, false)
    Matter.Engine.clear(engine)
    container.style.cursor = ''
    container.style.touchAction = ''
    for (const { el } of pairs) {
      el.style.transform = ''
    }
  }
}
