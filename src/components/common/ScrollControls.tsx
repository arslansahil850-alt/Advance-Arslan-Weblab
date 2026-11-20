import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

export function ScrollControls() {
  const { t } = useLanguage();
  const { reducedMotion } = useTheme();
  const [progress, setProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; visible: boolean }>({
    x: -100,
    y: -100,
    visible: false
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
      setShowBackTop(scrollTop > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const sysReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion || sysReduced) {
      setCursorPos((prev) => ({ ...prev, visible: false }));
      return;
    }

    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY, visible: true });
    };
    const onLeave = () => setCursorPos((prev) => ({ ...prev, visible: false }));

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5"
        style={{ backgroundColor: "transparent" }}
      >
        <div
          className="h-full transition-transform duration-75"
          style={{
            width: "100%",
            transform: `scaleX(${progress / 100})`,
            transformOrigin: "left",
            background: "linear-gradient(90deg, var(--accent), var(--accent-bright))"
          }}
        />
      </div>

      {cursorPos.visible && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform duration-75 lg:block"
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
            borderColor: "var(--accent)",
            opacity: 0.45
          }}
        />
      )}

      {showBackTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
          aria-label={t("footer.backToTop")}
          title={t("footer.backToTop")}
          className="fixed bottom-6 end-6 z-30 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--bg-surface-solid)",
            color: "var(--accent-bright)",
            border: "1px solid var(--border-strong)"
          }}
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
