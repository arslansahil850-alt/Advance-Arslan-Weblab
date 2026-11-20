export interface SocialLinkItem {
  id: "github" | "whatsapp" | "facebook" | "email";
  labelKey: string;
  value: string;
  href: string;
  external: boolean;
}

export const socialLinksData: ReadonlyArray<SocialLinkItem> = [
  {
    id: "github",
    labelKey: "social.github",
    value: "@arslansahil850-alt",
    href: "https://github.com/arslansahil850-alt",
    external: true
  },
  {
    id: "whatsapp",
    labelKey: "social.whatsapp",
    value: "+92 343 7773393",
    href: "https://wa.me/923437773393?text=Hello%2C%20I%20visited%20ARSLAN%20WEBLAB%20and%20would%20like%20to%20discuss%20a%20project.",
    external: true
  },
  {
    id: "facebook",
    labelKey: "social.facebook",
    value: "Facebook",
    href: "https://www.facebook.com/share/18c4n4kW56/",
    external: true
  },
  {
    id: "email",
    labelKey: "social.email",
    value: "arslansahil850@gmail.com",
    href: "mailto:arslansahil850@gmail.com?subject=Project%20Inquiry%20-%20ARSLAN%20WEBLAB",
    external: false
  }
];
