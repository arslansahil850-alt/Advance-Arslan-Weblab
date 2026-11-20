export interface ServiceItem {
  id: string;
  number: string;
  code: string;
  titleKey: string;
  descriptionKey: string;
  deliverablesKeys: string[];
  tags: string[];
}

export const servicesData: ReadonlyArray<ServiceItem> = [
  {
    id: "custom-website-development",
    number: "01",
    code: "WEB",
    titleKey: "services.items.custom.title",
    descriptionKey: "services.items.custom.description",
    deliverablesKeys: [
      "services.items.custom.d1",
      "services.items.custom.d2",
      "services.items.custom.d3"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Architecture"]
  },
  {
    id: "responsive-web-design",
    number: "02",
    code: "RWD",
    titleKey: "services.items.responsive.title",
    descriptionKey: "services.items.responsive.description",
    deliverablesKeys: [
      "services.items.responsive.d1",
      "services.items.responsive.d2",
      "services.items.responsive.d3"
    ],
    tags: ["Mobile-First", "Flexbox", "CSS Grid", "Breakpoints"]
  },
  {
    id: "frontend-development",
    number: "03",
    code: "FE",
    titleKey: "services.items.frontend.title",
    descriptionKey: "services.items.frontend.description",
    deliverablesKeys: [
      "services.items.frontend.d1",
      "services.items.frontend.d2",
      "services.items.frontend.d3"
    ],
    tags: ["React", "TypeScript", "JavaScript", "Performance"]
  },
  {
    id: "interactive-web-applications",
    number: "04",
    code: "APP",
    titleKey: "services.items.interactive.title",
    descriptionKey: "services.items.interactive.description",
    deliverablesKeys: [
      "services.items.interactive.d1",
      "services.items.interactive.d2",
      "services.items.interactive.d3"
    ],
    tags: ["State", "REST APIs", "DOM", "Animations"]
  },
  {
    id: "landing-page-development",
    number: "05",
    code: "LP",
    titleKey: "services.items.landing.title",
    descriptionKey: "services.items.landing.description",
    deliverablesKeys: [
      "services.items.landing.d1",
      "services.items.landing.d2",
      "services.items.landing.d3"
    ],
    tags: ["Conversion", "Hero Craft", "SEO", "Fast Load"]
  },
  {
    id: "website-redesign",
    number: "06",
    code: "RD",
    titleKey: "services.items.redesign.title",
    descriptionKey: "services.items.redesign.description",
    deliverablesKeys: [
      "services.items.redesign.d1",
      "services.items.redesign.d2",
      "services.items.redesign.d3"
    ],
    tags: ["Modernization", "Accessibility", "Refinement"]
  },
  {
    id: "website-maintenance",
    number: "07",
    code: "OPS",
    titleKey: "services.items.maintenance.title",
    descriptionKey: "services.items.maintenance.description",
    deliverablesKeys: [
      "services.items.maintenance.d1",
      "services.items.maintenance.d2",
      "services.items.maintenance.d3"
    ],
    tags: ["Updates", "Bug Fixes", "Optimization"]
  },
  {
    id: "ui-ux-implementation",
    number: "08",
    code: "UX",
    titleKey: "services.items.uiux.title",
    descriptionKey: "services.items.uiux.description",
    deliverablesKeys: [
      "services.items.uiux.d1",
      "services.items.uiux.d2",
      "services.items.uiux.d3"
    ],
    tags: ["Design Systems", "Typography", "Contrast", "RTL"]
  }
];

export const processStepsData: ReadonlyArray<{
  number: string;
  key: string;
}> = [
  { number: "01", key: "discover" },
  { number: "02", key: "plan" },
  { number: "03", key: "build" },
  { number: "04", key: "refine" }
];
