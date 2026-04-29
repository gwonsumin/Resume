import heroChr from "../../assets/images/heroChr.png";
import "./Hero.scss";

export function Hero() {
  return (
    <div className="hero" aria-labelledby="hero-title">
      <svg
        className="hero__shape"
        width="640"
        height="520"
        viewBox="0 0 640 520"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M494.2 59.8C579.6 115.9 627.7 214 602.6 295.5C577.5 377 479.2 441.9 374.6 470.1C270.1 498.2 159.3 489.6 93.4 426.1C27.5 362.5 6.5 244 50.1 151.7C93.7 59.4 201.9 -6.7 306.4 4.3C410.8 15.3 408.8 3.7 494.2 59.8Z"
          fill="currentColor"
        />
      </svg>

      <div className="hero__inner">
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
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
