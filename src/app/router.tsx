import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/HomePage";

const ProjectsPage = lazy(() =>
  import("../pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage }))
);
const ServicesPage = lazy(() =>
  import("../pages/ServicesPage").then((m) => ({ default: m.ServicesPage }))
);
const AboutPage = lazy(() =>
  import("../pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const CaseStudiesPage = lazy(() =>
  import("../pages/CaseStudiesPage").then((m) => ({ default: m.CaseStudiesPage }))
);
const ContactPage = lazy(() =>
  import("../pages/ContactPage").then((m) => ({ default: m.ContactPage }))
);

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        role="status"
        aria-label="Loading page"
        className="circular-media-ring h-9 w-9 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: "var(--accent-bright)",
          borderRightColor: "var(--accent)",
          borderBottomColor: "var(--border-subtle)"
        }}
      />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/pages/projects" element={<Navigate to="/projects" replace />} />
            <Route path="/pages/services" element={<Navigate to="/services" replace />} />
            <Route path="/pages/about" element={<Navigate to="/about" replace />} />
            <Route path="/pages/case-studies" element={<Navigate to="/case-studies" replace />} />
            <Route path="/pages/contact" element={<Navigate to="/contact" replace />} />

            <Route path="/403" element={<ErrorPage code={403} />} />
            <Route path="/500" element={<ErrorPage code={500} />} />
            <Route path="*" element={<ErrorPage code={404} />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
