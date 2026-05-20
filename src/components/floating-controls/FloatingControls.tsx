import { BackToTop } from "../back-to-top/BackToTop";
import { FloatingToc } from "../floating-toc/FloatingToc";
import "./FloatingControls.scss";

export function FloatingControls() {
  return (
    <div className="floating-controls">
      <FloatingToc />
      <BackToTop />
    </div>
  );
}
