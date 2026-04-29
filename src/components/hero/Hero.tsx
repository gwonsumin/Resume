import heroChr from '../../assets/images/heroChr.png'
import './Hero.scss'

export function Hero() {
  return (
    <div className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__eyebrow">UX/UI Designer · Frontend Developer</p>
        <h1 className="hero__title" id="hero-title">
          <span>지금,</span>
          <span>당신의 상태는</span>
          <span>
            얼마나 <em>선명한가요?</em>
          </span>
        </h1>
        <p className="hero__description">
          사용자의 상태를 이해하고
          <br />
          자연스럽게 선택할 수 있는 흐름을 설계합니다.
        </p>
      </div>

      <div className="hero__media">
        <img
          src={heroChr}
          alt="Hero 캐릭터 이미지"
          className="hero__image"
          loading="lazy"
        />
      </div>
    </div>
  )
}
