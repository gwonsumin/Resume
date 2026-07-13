import backThenCoral from "../assets/archive/BackThenTingsILiked-coral.png";
import backThenMint from "../assets/archive/BackThenTingsILiked-mint.png";
import christmasNutcracker from "../assets/archive/ChristmasNutcracker.png";
import exhibitionWall from "../assets/archive/Exhibition Wall.png";
import exhibitionWallFull from "../assets/archive/Exhibition Wall-full.png";
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
  /** ArchiveModal hero처럼 mainImage보다 큰 표시가 필요할 때만 사용하는 고해상도 버전 */
  mainImageFull?: string;
  detailImages?: string[];
  tags: string[];
  imageAlt: string;
  accentColor: ArchiveAccentHex;
  tool?: string;
  format?: string;
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

/** 카드 기울기(deg) — `cardId.charCodeAt(0) % 5` 인덱스 */
export const ARCHIVE_CARD_ROTATIONS = [-3, -1.5, 0, 1.5, 3] as const;

export function archiveCardRotationDeg(cardId: string): number {
  return ARCHIVE_CARD_ROTATIONS[cardId.charCodeAt(0) % 5]!;
}

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
        year: "2024",
        memo: "좋아하던 것들을 전부 한 장에 쑤셔 넣었더니, 포스터가 됐다.",
        mainImage: backThenCoral,
        tags: ["Poster", "Print"],
        imageAlt: "Things I Liked 코랄 포스터",
        accentColor: coral,
        tool: "Procreate · iPad",
        format: "A3 Poster · Print",
      },
      {
        id: "til-mint",
        title: "Things I Liked — Mint",
        category: "Things I Liked",
        year: "2024",
        memo: "같은 그림인데, 민트로 바꾸면 다른 기분이 된다.",
        mainImage: backThenMint,
        tags: ["Poster", "Variant"],
        imageAlt: "Things I Liked 민트 포스터",
        accentColor: mint,
        tool: "Procreate · iPad",
        format: "A3 Poster · Print",
      },
      {
        id: "til-exhibition",
        title: "전시 벽면",
        category: "Things I Liked",
        year: "2024",
        memo: "전시 당일, 벽에 나란히 걸린 순간.",
        mainImage: exhibitionWall,
        mainImageFull: exhibitionWallFull,
        tags: ["Exhibition", "Venue"],
        imageAlt: "전시 벽면과 두 포스터",
        accentColor: coral,
        format: "Exhibition · Wall",
      },
      {
        id: "til-goods",
        title: "굿즈 테이블",
        category: "Things I Liked",
        year: "2024",
        memo: "직접 그린 그림으로 만든 엽서와 스티커. 그날 팔았다.",
        mainImage: printedMoments,
        tags: ["Goods", "Desk"],
        imageAlt: "굿즈와 엽서 테이블",
        accentColor: mint,
        tool: "Procreate · iPad",
        format: "Postcard · Sticker",
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
        memo: "연말에 호두깎이 인형을 보고, Gcat으로 다시 그렸다.",
        mainImage: christmasNutcracker,
        tags: ["Holiday", "Poster"],
        imageAlt: "Christmas Nutcracker 일러스트",
        accentColor: coral,
        tool: "Procreate · iPad",
        format: "A3 Poster · Print",
      },
      {
        id: "season-winter",
        title: "Winter Mood",
        category: "Seasonal Notes",
        year: "2025 Winter",
        memo: "삐삐를 보고, Gcat 버전으로 만들어봤다. 겨울 삐삐.",
        mainImage: winterMood,
        tags: ["Winter", "Palette"],
        imageAlt: "Winter Mood 드로잉",
        accentColor: mint,
        tool: "Procreate · iPad",
        format: "Illustration",
      },
      {
        id: "season-sunny",
        title: "Sunny Hug",
        category: "Seasonal Notes",
        year: "2025 Summer",
        memo: "튤립을 보고, 처음 만든 고양이 캐릭터와 함께 그렸다.",
        mainImage: sunnyHug,
        tags: ["Summer", "Poster"],
        imageAlt: "Sunny Hug 포스터",
        accentColor: coral,
        tool: "Procreate · iPad",
        format: "A3 Poster · Print",
      },
      {
        id: "season-midnight",
        title: "Midnight Letter",
        category: "Seasonal Notes",
        year: "2024 Autumn",
        memo: "아이들이 산타에게 편지를 붙이는 걸 보고 그렸다.",
        mainImage: midnightLetter,
        tags: ["Night", "Letter"],
        imageAlt: "Midnight Letter 드로잉",
        accentColor: mint,
        tool: "Procreate · iPad",
        format: "Illustration",
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
        year: "2024",
        memo: "파리에 간다면, 꽃이 가득한 공원에 고양이와 앉아있고 싶다.",
        mainImage: gardenWalker,
        tags: ["Illustration", "Nature"],
        imageAlt: "Garden Walker 일러스트",
        accentColor: mint,
        tool: "Procreate · iPad",
        format: "Illustration",
      },
      {
        id: "draw-floating",
        title: "Floating State",
        category: "Drawings",
        year: "2025",
        memo: "잠수하는 오리를 보고, 선물받은 오리인형이 생각났다.",
        mainImage: floatingState,
        detailImages: [floatingStateWall],
        tags: ["Print", "Wall"],
        imageAlt: "Floating State 포스터",
        accentColor: coral,
        tool: "Procreate · iPad",
        format: "A3 Poster · Print",
      },
      {
        id: "draw-tomato",
        title: "Tomato Mirror",
        category: "Drawings",
        year: "2024",
        memo: "토마토에 관심을 갖게 만들어준 그림.",
        mainImage: tomatoMirror,
        tags: ["Sketch", "Object"],
        imageAlt: "Tomato Mirror 드로잉",
        accentColor: mint,
        tool: "Procreate · iPad",
        format: "Illustration",
      },
      {
        id: "draw-pink",
        title: "Pink Signal",
        category: "Drawings",
        year: "2025",
        memo: "거울에 비친 내 모습을 끄적이다가 완성됐다.",
        mainImage: pinkSignal,
        tags: ["Indoor", "Glow"],
        imageAlt: "Pink Signal 포스터",
        accentColor: coral,
        tool: "Procreate · iPad",
        format: "Illustration",
      },
    ],
  },
];
