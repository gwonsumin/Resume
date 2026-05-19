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

export type SkillFrequency = "매일" | "자주" | "가끔" | "익히는 중";

export type Skill = {
  id: string;
  name: string;
  frequency: SkillFrequency;
  icon?: string;
  category: "frontend" | "styling" | "design" | "tool";
};

export const skills: Skill[] = [
  {
    id: "figma",
    name: "Figma",
    frequency: "매일",
    icon: figmaLogo,
    category: "design",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    frequency: "매일",
    icon: photoshopLogo,
    category: "design",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    frequency: "자주",
    icon: illustratorLogo,
    category: "design",
  },
  {
    id: "after-effects",
    name: "After Effects",
    frequency: "가끔",
    icon: afterEffectsLogo,
    category: "design",
  },
  {
    id: "procreate",
    name: "Procreate",
    frequency: "자주",
    icon: procreateLogo,
    category: "design",
  },
  {
    id: "react",
    name: "React",
    frequency: "매일",
    icon: reactLogo,
    category: "frontend",
  },
  {
    id: "javascript",
    name: "JavaScript",
    frequency: "매일",
    icon: javascriptLogo,
    category: "frontend",
  },
  {
    id: "jquery",
    name: "jQuery",
    frequency: "가끔",
    icon: jqueryLogo,
    category: "frontend",
  },
  {
    id: "vue",
    name: "Vue",
    frequency: "자주",
    icon: vueLogo,
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    frequency: "익히는 중",
    icon: nextjsLogo,
    category: "frontend",
  },
  {
    id: "nodejs",
    name: "Node.js",
    frequency: "자주",
    icon: nodejsLogo,
    category: "frontend",
  },
  {
    id: "php",
    name: "PHP",
    frequency: "가끔",
    icon: phpLogo,
    category: "frontend",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    frequency: "가끔",
    icon: mongoDbLogo,
    category: "frontend",
  },
  {
    id: "html-css",
    name: "HTML/CSS",
    frequency: "매일",
    icon: htmlLogo,
    category: "styling",
  },
  {
    id: "scss",
    name: "SCSS",
    frequency: "매일",
    icon: scssLogo,
    category: "styling",
  },
  {
    id: "css",
    name: "CSS",
    frequency: "매일",
    icon: cssLogo,
    category: "styling",
  },
  {
    id: "github",
    name: "GitHub",
    frequency: "매일",
    icon: githubLogo,
    category: "tool",
  },
  {
    id: "notion",
    name: "Notion",
    frequency: "매일",
    icon: notionLogo,
    category: "tool",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    frequency: "매일",
    icon: chatgptLogo,
    category: "tool",
  },
  {
    id: "cursor",
    name: "Cursor",
    frequency: "매일",
    icon: cursorLogo,
    category: "tool",
  },
];
