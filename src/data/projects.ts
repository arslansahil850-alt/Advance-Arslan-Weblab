import inventory from "./imported/inventory.json";

export type ProjectCategory = "frontend" | "backend";
export type ProjectSubcategory =
  | "static-pages"
  | "javascript"
  | "web-projects"
  | "learn-code";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  subcategory: ProjectSubcategory;
  image: string;
  live: string;
  github: string;
  tags: string[];
  featured: boolean;
  reusedImage?: boolean;
  notes?: string | null;
}

export interface ProjectHubInfo {
  id: "basic" | "advanced";
  url: string;
  count: number;
  categories: string[];
}

export interface CaseStudyItem {
  id: string;
  number: string;
  category: string;
  stack: string;
  title: string;
  summary: string;
  role: string;
  focus: string;
  linkedProjectId: string;
}

export const projectsData: ProjectItem[] = inventory.hubProjects.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  category: item.category as ProjectCategory,
  subcategory: item.subcategory as ProjectSubcategory,
  image: item.localCoverPath,
  live: item.live,
  github: item.github,
  tags: item.tags,
  featured: item.featured,
  reusedImage: item.reusedImage,
  notes: item.notes
}));

export const featuredHomeProjectIds = [
  "web-loaders",
  "classic-food-web",
  "stayora"
] as const;

export const projectHubs: ReadonlyArray<ProjectHubInfo> = [
  {
    id: "basic",
    url: "https://myprojects-hub.netlify.app/",
    count: 28,
    categories: ["HTML & CSS", "JavaScript", "Web Projects"]
  },
  {
    id: "advanced",
    url: "https://projects-hub-snowy.vercel.app/",
    count: 34,
    categories: ["Frontend Projects", "Backend Development Phases 1–6", "Global Search"]
  }
];

export const projectTypesMarquee: ReadonlyArray<string> = [
  "Gym & Fitness Websites",
  "E-Commerce Stores",
  "Real Estate Websites",
  "Dental Clinic Websites",
  "SaaS Dashboards",
  "Business Websites",
  "Online Learning Platforms",
  "Hotel Booking Websites",
  "Food Ordering Websites",
  "Digital Agency Websites"
];

export const caseStudiesData: CaseStudyItem[] = inventory.caseStudies;
