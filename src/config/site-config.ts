export const siteConfig = {
  brandName: "ARSLAN WEBLAB",
  brandShort: "Arslan Weblab",
  ownerName: "Arslan Sahil",
  handle: "@arslansahil850-alt",
  publicEmail: "arslansahil850@gmail.com",
  whatsappNumber: "923437773393",
  whatsappDisplay: "+92 343 7773393",
  whatsappHandle: "ArslanSahil2011",
  canonicalBaseUrl: import.meta.env.VITE_SITE_URL || "https://arslan-weblab-new.vercel.app",
  contactApiBaseUrl: import.meta.env.VITE_CONTACT_API_URL || "",
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || "",
  assets: {
    brandMonogram: "/assets/images/brand/brand-monogram.webp",
    heroBackground: "/assets/images/hero/hero-background.jpg"
  },
  hubs: {
    basic: {
      id: "basic-hub",
      url: "https://myprojects-hub.netlify.app/",
      projectCount: 28
    },
    advanced: {
      id: "advanced-hub",
      url: "https://projects-hub-snowy.vercel.app/",
      projectCount: 34
    }
  }
} as const;
