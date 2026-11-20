export type SkillCategory = "frontend" | "backend" | "languages" | "workflow";

export interface TechnologyItem {
  id: string;
  name: string;
  shortCode: string;
  category: SkillCategory;
  summaryKey: string;
  accentHex: string;
}

export const technologiesData: ReadonlyArray<TechnologyItem> = [
  {
    id: "html5",
    name: "HTML5",
    shortCode: "H5",
    category: "frontend",
    summaryKey: "skills.items.html5",
    accentHex: "#E34F26"
  },
  {
    id: "css3",
    name: "CSS3",
    shortCode: "C3",
    category: "frontend",
    summaryKey: "skills.items.css3",
    accentHex: "#1572B6"
  },
  {
    id: "javascript",
    name: "JavaScript",
    shortCode: "JS",
    category: "languages",
    summaryKey: "skills.items.javascript",
    accentHex: "#F7DF1E"
  },
  {
    id: "react",
    name: "React",
    shortCode: "RE",
    category: "frontend",
    summaryKey: "skills.items.react",
    accentHex: "#61DAFB"
  },
  {
    id: "nodejs",
    name: "Node.js",
    shortCode: "ND",
    category: "backend",
    summaryKey: "skills.items.nodejs",
    accentHex: "#5FA04E"
  },
  {
    id: "expressjs",
    name: "Express.js",
    shortCode: "EX",
    category: "backend",
    summaryKey: "skills.items.expressjs",
    accentHex: "#D4AF37"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    shortCode: "MG",
    category: "backend",
    summaryKey: "skills.items.mongodb",
    accentHex: "#47A248"
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    shortCode: "API",
    category: "backend",
    summaryKey: "skills.items.restApis",
    accentHex: "#E7C873"
  },
  {
    id: "python",
    name: "Python",
    shortCode: "PY",
    category: "languages",
    summaryKey: "skills.items.python",
    accentHex: "#3776AB"
  },
  {
    id: "cpp",
    name: "C++",
    shortCode: "C++",
    category: "languages",
    summaryKey: "skills.items.cpp",
    accentHex: "#00599C"
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    shortCode: "GIT",
    category: "workflow",
    summaryKey: "skills.items.gitGithub",
    accentHex: "#F05032"
  },
  {
    id: "responsive-ui",
    name: "Responsive UI/UX",
    shortCode: "UI",
    category: "workflow",
    summaryKey: "skills.items.responsiveUi",
    accentHex: "#D4AF37"
  }
];

export const skillsMarqueeItems: ReadonlyArray<string> = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Python",
  "C++",
  "Responsive Design",
  "UI/UX Implementation",
  "Git & GitHub"
];
