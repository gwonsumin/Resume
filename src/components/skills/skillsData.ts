import afterEffectsLogo from "../../assets/skills/afterEffects.svg";
import chatgptLogo from "../../assets/skills/chatgpt.svg";
import cssLogo from "../../assets/skills/css3.svg";
import cursorLogo from "../../assets/skills/cursor.svg";
import figmaLogo from "../../assets/skills/figma.svg";
import githubLogo from "../../assets/skills/github.svg";
import htmlLogo from "../../assets/skills/html5.svg";
import illustratorLogo from "../../assets/skills/illustrator.svg";
import javascriptLogo from "../../assets/skills/javascript.svg";
import jqueryLogo from "../../assets/skills/jquery.svg";
import mongoDbLogo from "../../assets/skills/mongoDB.svg";
import nextjsLogo from "../../assets/skills/nextjs.svg";
import nodejsLogo from "../../assets/skills/nodejs.svg";
import notionLogo from "../../assets/skills/notion.svg";
import phpLogo from "../../assets/skills/php.svg";
import photoshopLogo from "../../assets/skills/photoshop.svg";
import procreateLogo from "../../assets/skills/procreate.svg";
import reactLogo from "../../assets/skills/react.svg";
import scssLogo from "../../assets/skills/scss.svg";
import vueLogo from "../../assets/skills/vue.svg";
import claudeLogo from "../../assets/skills/claude.svg";
import renderLogo from "../../assets/skills/render.svg";
import vercelLogo from "../../assets/skills/vercel.svg";

export type SkillFreq = "매일" | "자주" | "가끔" | "익히는 중";

export type Skill = {
  id: string;
  name: string;
  freq: SkillFreq;
  /** 0–100, hover fill width only — not shown in UI */
  level: number;
  icon?: string;
  category: "frontend" | "styling" | "design" | "tool";
};

export const skills: Skill[] = [
  {
    id: "figma",
    name: "Figma",
    freq: "매일",
    level: 95,
    icon: figmaLogo,
    category: "design",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    freq: "매일",
    level: 90,
    icon: photoshopLogo,
    category: "design",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    freq: "매일",
    level: 90,
    icon: illustratorLogo,
    category: "design",
  },
  {
    id: "after-effects",
    name: "After Effects",
    freq: "가끔",
    level: 45,
    icon: afterEffectsLogo,
    category: "design",
  },
  {
    id: "procreate",
    name: "Procreate",
    freq: "매일",
    level: 100,
    icon: procreateLogo,
    category: "design",
  },
  {
    id: "react",
    name: "React",
    freq: "자주",
    level: 80,
    icon: reactLogo,
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    freq: "자주",
    level: 75,
    icon: javascriptLogo,
    category: "frontend",
  },
  {
    id: "jquery",
    name: "jQuery",
    freq: "가끔",
    level: 60,
    icon: jqueryLogo,
    category: "frontend",
  },
  {
    id: "vue",
    name: "Vue",
    freq: "자주",
    level: 80,
    icon: vueLogo,
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    freq: "가끔",
    level: 65,
    icon: nextjsLogo,
    category: "frontend",
  },
  {
    id: "nodejs",
    name: "Node.js",
    freq: "자주",
    level: 65,
    icon: nodejsLogo,
    category: "frontend",
  },
  {
    id: "php",
    name: "PHP",
    freq: "가끔",
    level: 70,
    icon: phpLogo,
    category: "frontend",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    freq: "자주",
    level: 60,
    icon: mongoDbLogo,
    category: "frontend",
  },
  {
    id: "html-css",
    name: "HTML",
    freq: "매일",
    level: 90,
    icon: htmlLogo,
    category: "styling",
  },
  {
    id: "css",
    name: "CSS",
    freq: "매일",
    level: 90,
    icon: cssLogo,
    category: "styling",
  },
  {
    id: "scss",
    name: "SCSS",
    freq: "매일",
    level: 90,
    icon: scssLogo,
    category: "styling",
  },

  {
    id: "github",
    name: "GitHub",
    freq: "매일",
    level: 80,
    icon: githubLogo,
    category: "tool",
  },
  {
    id: "render",
    name: "Render",
    freq: "자주",
    level: 70,
    icon: renderLogo,
    category: "tool",
  },
  {
    id: "vercel",
    name: "Vercel",
    freq: "자주",
    level: 70,
    icon: vercelLogo,
    category: "tool",
  },
  {
    id: "notion",
    name: "Notion",
    freq: "매일",
    level: 80,
    icon: notionLogo,
    category: "tool",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    freq: "매일",
    level: 90,
    icon: chatgptLogo,
    category: "tool",
  },
  {
    id: "cursor",
    name: "Cursor",
    freq: "매일",
    level: 90,
    icon: cursorLogo,
    category: "tool",
  },
  {
    id: "claude",
    name: "Claude",
    freq: "매일",
    level: 90,
    icon: claudeLogo,
    category: "tool",
  },
];
