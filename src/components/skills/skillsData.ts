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

export type Skill = {
  id: string;
  name: string;
  percent: number;
  icon?: string;
  category: "frontend" | "styling" | "design" | "tool";
};

export const skills: Skill[] = [
  {
    id: "figma",
    name: "Figma",
    percent: 95,
    icon: figmaLogo,
    category: "design",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    percent: 90,
    icon: photoshopLogo,
    category: "design",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    percent: 90,
    icon: illustratorLogo,
    category: "design",
  },
  {
    id: "after-effects",
    name: "After Effects",
    percent: 70,
    icon: afterEffectsLogo,
    category: "design",
  },
  {
    id: "procreate",
    name: "Procreate",
    percent: 100,
    icon: procreateLogo,
    category: "design",
  },
  {
    id: "react",
    name: "React",
    percent: 79,
    icon: reactLogo,
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    percent: 78,
    icon: javascriptLogo,
    category: "frontend",
  },
  {
    id: "jquery",
    name: "jQuery",
    percent: 80,
    icon: jqueryLogo,
    category: "frontend",
  },
  { id: "vue", name: "Vue", percent: 80, icon: vueLogo, category: "frontend" },
  {
    id: "nextjs",
    name: "Next.js",
    percent: 67,
    icon: nextjsLogo,
    category: "frontend",
  },
  {
    id: "nodejs",
    name: "Node.js",
    percent: 68,
    icon: nodejsLogo,
    category: "frontend",
  },
  { id: "php", name: "PHP", percent: 85, icon: phpLogo, category: "frontend" },
  {
    id: "mongodb",
    name: "MongoDB",
    percent: 70,
    icon: mongoDbLogo,
    category: "frontend",
  },
  {
    id: "html-css",
    name: "HTML/CSS",
    percent: 90,
    icon: htmlLogo,
    category: "styling",
  },
  {
    id: "scss",
    name: "SCSS",
    percent: 90,
    icon: scssLogo,
    category: "styling",
  },
  { id: "css", name: "CSS", percent: 93, icon: cssLogo, category: "styling" },
  {
    id: "github",
    name: "GitHub",
    percent: 80,
    icon: githubLogo,
    category: "tool",
  },
  {
    id: "notion",
    name: "Notion",
    percent: 75,
    icon: notionLogo,
    category: "tool",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    percent: 93,
    icon: chatgptLogo,
    category: "tool",
  },
  {
    id: "cursor",
    name: "Cursor",
    percent: 90,
    icon: cursorLogo,
    category: "tool",
  },
];
