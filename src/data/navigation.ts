export interface NavItem {
  id: string;
  to: string;
  labelKey: string;
}

export const primaryNavItems: ReadonlyArray<NavItem> = [
  { id: "home", to: "/", labelKey: "nav.home" },
  { id: "projects", to: "/projects", labelKey: "nav.projects" },
  { id: "services", to: "/services", labelKey: "nav.services" },
  { id: "about", to: "/about", labelKey: "nav.about" },
  { id: "case-studies", to: "/case-studies", labelKey: "nav.caseStudies" }
];

export const footerNavItems: ReadonlyArray<NavItem> = [
  ...primaryNavItems,
  { id: "contact", to: "/contact", labelKey: "nav.contact" }
];
