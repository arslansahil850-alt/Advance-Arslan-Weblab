import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollControls } from "../components/common/ScrollControls";
import { SEOHead } from "../components/common/SEOHead";
import { PreferencesModal } from "../components/modals/PreferencesModal";
import { Footer } from "../components/navigation/Footer";
import { Navbar } from "../components/navigation/Navbar";
import { ToastViewport } from "../components/notifications/ToastViewport";
import { GlobalSearchModal } from "../components/search/GlobalSearchModal";
import { usePreferences } from "../context/PreferencesContext";
import { initExternalAnalytics, trackEvent } from "../services/analytics";

export function MainLayout() {
  const { pathname, hash } = useLocation();
  const { analyticsConsent } = usePreferences();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  useEffect(() => {
    if (analyticsConsent) {
      initExternalAnalytics();
      trackEvent("page_view", { path: pathname });
    }
  }, [pathname, analyticsConsent]);

  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <GlobalSearchModal />
      <PreferencesModal />
      <ToastViewport />
      <ScrollControls />
    </div>
  );
}
