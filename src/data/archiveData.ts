import backThenCoral from "../assets/archive/BackThenTingsILiked-coral.png";
import backThenMint from "../assets/archive/BackThenTingsILiked-mint.png";
import christmasNutcracker from "../assets/archive/ChristmasNutcracker.png";
import exhibitionWall from "../assets/archive/Exhibition Wall.png";
import floatingState from "../assets/archive/Floating State.png";
import floatingStateWall from "../assets/archive/Floating State-Wall.png";
import gardenWalker from "../assets/archive/GardenWalker.png";
import midnightLetter from "../assets/archive/MidnightLetter.png";
import pinkSignal from "../assets/archive/PinkSignal.png";
import printedMoments from "../assets/archive/Printed Moments.png";
import sunnyHug from "../assets/archive/SunnyHug.png";
import tomatoMirror from "../assets/archive/TomatoMirror.png";
import winterMood from "../assets/archive/WinterMood.png";

/** Accent hex — string으로 풀어 새 색을 자유롭게 추가할 수 있게. */
export type ArchiveAccentHex = string;

/** 카테고리당 부착물 종류 — Pinboard 시각언어의 핵심 */
export type ArchiveFastener = "pin" | "tape" | "clip";

/** 단일 기록 카드 */
export type ArchiveRecordCard = {
  id: string;
  title: string;
  category: string;
  year: string;
  memo: string;
  mainImage: string;
  detailImages?: string[];
  tags: string[];
  imageAlt: string;
  accentColor: ArchiveAccentHex;
};

export type ArchiveColumnData = {
  id: string;
  columnTitle: string;
  /** 손글씨로 노출할 한글 라벨 */
  columnKorean: string;
  /** 핀 / 와시테이프 / 클립 */
  fastener: ArchiveFastener;
  accentColor: ArchiveAccentHex;
  /** 마지막 카드 옆에 "곧 추가될 예정" placeholder를 표시할지 */
  showComingSoon?: boolean;
  cards: ArchiveRecordCard[];
};

/** 모달 등 기존 코드 호환 */
export type ArchiveItem = ArchiveRecordCard;

const coral = "#FF785D";
const mint = "#0AA5A5";
const ochre = "#C58A2A";

export const archiveColumns: ArchiveColumnData[] = [
  {
    id: "things-i-liked",
    columnTitle: "Things I Liked",
    columnKorean: "좋아했던 것",
    fastener: "pin",
    accentColor: coral,
    showComingSoon: true,
    cards: [
      {
        id: "til-coral",
        title: "Things I Liked — Coral",
        category: "Things I Liked",
        year: "2024 Spring",
        memo: "코랄 톤 포스터 출력본을 대표 기록으로 남긴 컷입니다.",
        mainImage: backThenCoral,
        tags: ["Poster", "Print"],
        imageAlt: "Things I Liked 코랄 포스터",
        accentColor: coral,
      },
      {
        id: "til-mint",
        title: "Things I Liked — Mint",
        category: "Things I Liked",
        year: "2024 Spring",
        memo: "같은 구도의 민트 톤 변형을 나란히 보관했습니다.",
        mainImage: backThenMint,
        tags: ["Poster", "Variant"],
        imageAlt: "Things I Liked 민트 포스터",
        accentColor: mint,
      },
      {
        id: "til-exhibition",
        title: "전시 벽면",
        category: "Things I Liked",
        year: "2024 Spring",
        memo: "전시장 벽면에 걸린 두 포스터가 함께 보인 현장 기록입니다.",
        mainImage: exhibitionWall,
        tags: ["Exhibition", "Venue"],
        imageAlt: "전시 벽면과 두 포스터",
        accentColor: coral,
      },
      {
        id: "til-goods",
        title: "굿즈 테이블",
        category: "Things I Liked",
        year: "2024 Spring",
        memo: "행사 당일 테이블 위에 올려 두었던 엽서와 소량 인쇄물 자리입니다.",
        mainImage: printedMoments,
        tags: ["Goods", "Desk"],
        imageAlt: "굿즈와 엽서 테이블",
        accentColor: mint,
      },
    ],
  },
  {
    id: "seasonal-notes",
    columnTitle: "Seasonal Notes",
    columnKorean: "계절의 기록",
    fastener: "tape",
    accentColor: mint,
    showComingSoon: true,
    cards: [
      {
        id: "season-nutcracker",
        title: "Christmas Nutcracker",
        category: "Seasonal Notes",
        year: "2024 Winter",
        memo: "연말 행사용으로 게시해 본 포스터 실물 기록입니다.",
        mainImage: christmasNutcracker,
        tags: ["Holiday", "Poster"],
        imageAlt: "Christmas Nutcracker 일러스트",
        accentColor: coral,
      },
      {
        id: "season-winter",
        title: "Winter Mood",
        category: "Seasonal Notes",
        year: "2025 Winter",
        memo: "겨울 팔레트를 정리해 둔 노트형 드로잉입니다.",
        mainImage: winterMood,
        tags: ["Winter", "Palette"],
        imageAlt: "Winter Mood 드로잉",
        accentColor: mint,
      },
      {
        id: "season-sunny",
        title: "Sunny Hug",
        category: "Seasonal Notes",
        year: "2025 Summer",
        memo: "세로로 긴 햇살 포스터 출력 후 남긴 컷입니다.",
        mainImage: sunnyHug,
        tags: ["Summer", "Poster"],
        imageAlt: "Sunny Hug 포스터",
        accentColor: coral,
      },
      {
        id: "season-midnight",
        title: "Midnight Letter",
        category: "Seasonal Notes",
        year: "2024 Autumn",
        memo: "밤에만 이어 붙인 레터링 시도와 여백 기록입니다.",
        mainImage: midnightLetter,
        tags: ["Night", "Letter"],
        imageAlt: "Midnight Letter 드로잉",
        accentColor: mint,
      },
    ],
  },
  {
    id: "drawings",
    columnTitle: "Drawings",
    columnKorean: "그린 것들",
    fastener: "clip",
    accentColor: ochre,
    showComingSoon: true,
    cards: [
      {
        id: "draw-garden",
        title: "Garden Walker",
        category: "Drawings",
        year: "2024 Summer",
        memo: "연못과 동선을 담은 일러스트 원본 기록입니다.",
        mainImage: gardenWalker,
        tags: ["Illustration", "Nature"],
        imageAlt: "Garden Walker 일러스트",
        accentColor: mint,
      },
      {
        id: "draw-floating",
        title: "Floating State",
        category: "Drawings",
        year: "2025 Summer",
        memo: "포스터 출력본과 전시 벽면 설치 상태를 한 세트로 묶었습니다.",
        mainImage: floatingState,
        detailImages: [floatingStateWall],
        tags: ["Print", "Wall"],
        imageAlt: "Floating State 포스터",
        accentColor: coral,
      },
      {
        id: "draw-tomato",
        title: "Tomato Mirror",
        category: "Drawings",
        year: "2024 Summer",
        memo: "책상 위 오브제와 함께 남긴 스케치 한 장입니다.",
        mainImage: tomatoMirror,
        tags: ["Sketch", "Object"],
        imageAlt: "Tomato Mirror 드로잉",
        accentColor: mint,
      },
      {
        id: "draw-pink",
        title: "Pink Signal",
        category: "Drawings",
        year: "2025 Spring",
        memo: "실내 조명 아래에서만 보이던 분홍 톤을 옮긴 출력 기록입니다.",
        mainImage: pinkSignal,
        tags: ["Indoor", "Glow"],
        imageAlt: "Pink Signal 포스터",
        accentColor: coral,
      },
    ],
  },
];
