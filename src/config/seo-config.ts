export interface RouteSeoMeta {
  path: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  noIndex?: boolean;
}

export const routeSeoMap: Record<string, RouteSeoMeta> = {
  "/": {
    path: "/",
    titleEn: "ARSLAN WEBLAB — Web Development Portfolio & Digital Studio",
    titleUr: "ارسلان ویب لیب — ویب ڈویلپمنٹ پورٹ فولیو اور ڈیجیٹل اسٹوڈیو",
    descriptionEn:
      "Explore ARSLAN WEBLAB by Arslan Sahil: custom responsive websites, interactive web applications, 34+ showcased projects, and modern frontend engineering.",
    descriptionUr:
      "ارسلان ساحل کا ارسلان ویب لیب: جدید ریسپانسیو ویب سائٹس، انٹرایکٹو ویب ایپلیکیشنز اور 34 سے زائد تصدیق شدہ ویب منصوبوں کی نمائش۔"
  },
  "/projects": {
    path: "/projects",
    titleEn: "Projects & Project Universe — ARSLAN WEBLAB",
    titleUr: "پروجیکٹس اور پروجیکٹ یونیورس — ارسلان ویب لیب",
    descriptionEn:
      "Browse 34 verified frontend and backend projects alongside the Basic Projects Hub and Advanced Projects Hub.",
    descriptionUr:
      "بنیادی اور ایڈوانسڈ پروجیکٹ ہب سمیت 34 تصدیق شدہ فرنٹ اینڈ اور بیک اینڈ پروجیکٹس دریافت کریں۔"
  },
  "/services": {
    path: "/services",
    titleEn: "Web Development Services — ARSLAN WEBLAB",
    titleUr: "ویب ڈویلپمنٹ سروسز — ارسلان ویب لیب",
    descriptionEn:
      "Eight specialized web services: custom website development, responsive web design, frontend engineering, interactive apps, landing pages, redesign, maintenance, and UI/UX.",
    descriptionUr:
      "آٹھ خصوصی ویب خدمات: کسٹم ویب ڈویلپمنٹ، ریسپانسیو ڈیزائن، فرنٹ اینڈ، انٹرایکٹو ایپس، لینڈنگ پیجز، ری ڈیزائن، مینٹیننس اور UI/UX نفاذ۔"
  },
  "/about": {
    path: "/about",
    titleEn: "About Arslan Sahil & Development Journey — ARSLAN WEBLAB",
    titleUr: "تعارف اور ترقی کا سفر — ارسلان ویب لیب",
    descriptionEn:
      "Learn about Arslan Sahil's web development journey, core technologies, workflow philosophy, and long-term engineering vision.",
    descriptionUr:
      "ارسلان ساحل کے ویب ڈویلپمنٹ کے سفر، بنیادی ٹیکنالوجیز، کام کے طریقہ کار اور مستقبل کے وژن کے بارے میں جانیں۔"
  },
  "/case-studies": {
    path: "/case-studies",
    titleEn: "Project Case Studies — ARSLAN WEBLAB",
    titleUr: "پروجیکٹ کیس اسٹڈیز — ارسلان ویب لیب",
    descriptionEn:
      "Detailed breakdowns of Shopora, Weather API Web App, and Modern Todo showing architecture, UI decisions, and JavaScript implementation.",
    descriptionUr:
      "شاپورا، ویدر ایپ اور ماڈرن ٹوڈو کے تکنیکی تجزیے، یوزر انٹرفیس کے فیصلے اور جاوا اسکرپٹ نفاذ۔"
  },
  "/contact": {
    path: "/contact",
    titleEn: "Contact & Start a Project — ARSLAN WEBLAB",
    titleUr: "رابطہ کریں — ارسلان ویب لیب",
    descriptionEn:
      "Get in touch with Arslan Sahil via our secured contact form, WhatsApp, or direct email at arslansahil850@gmail.com.",
    descriptionUr:
      "محفوظ رابطہ فارم، واٹس ایپ یا براہ راست ای میل arslansahil850@gmail.com کے ذریعے ارسلان ساحل سے رابطہ کریں۔"
  },
  "/403": {
    path: "/403",
    titleEn: "403 Access Restricted — ARSLAN WEBLAB",
    titleUr: "403 رسائی محدود — ارسلان ویب لیب",
    descriptionEn: "Access to the requested resource is restricted.",
    descriptionUr: "مطلوبہ وسیلے تک رسائی محدود ہے۔",
    noIndex: true
  },
  "/500": {
    path: "/500",
    titleEn: "500 Service Unavailable — ARSLAN WEBLAB",
    titleUr: "500 سروس کی خرابی — ارسلان ویب لیب",
    descriptionEn: "An unexpected application error occurred.",
    descriptionUr: "ایک غیر متوقع تکنیکی خرابی پیش آگئی۔",
    noIndex: true
  },
  "/404": {
    path: "/404",
    titleEn: "404 Page Not Found — ARSLAN WEBLAB",
    titleUr: "404 صفحہ نہیں ملا — ارسلان ویب لیب",
    descriptionEn: "The requested page could not be found on ARSLAN WEBLAB.",
    descriptionUr: "مطلوبہ صفحہ ارسلان ویب لیب پر موجود نہیں ہے۔",
    noIndex: true
  }
};
