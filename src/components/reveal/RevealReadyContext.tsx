import { createContext, useContext, type ReactNode } from "react";

/** Splash 등 외부 준비 전에는 false → IntersectionObserver 미연결 */
const RevealReadyContext = createContext(true);

export function RevealReadyProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return <RevealReadyContext.Provider value={ready}>{children}</RevealReadyContext.Provider>;
}

export function useRevealReady() {
  return useContext(RevealReadyContext);
}
