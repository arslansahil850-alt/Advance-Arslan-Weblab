import { CheckCircle2, AlertCircle, Info, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useToast } from "../../context/ToastContext";

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-20 end-4 z-50 flex w-full max-w-sm flex-col gap-2.5 sm:bottom-6 sm:end-6"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="pointer-events-auto flex items-start gap-3 rounded-xl p-3.5 shadow-xl"
            style={{
              backgroundColor: "var(--bg-surface-solid)",
              border: "1px solid var(--border-strong)",
              color: "var(--text-primary)"
            }}
          >
            <span className="mt-0.5 shrink-0" aria-hidden="true">
              {toast.variant === "success" && (
                <CheckCircle2 className="h-4 w-4" style={{ color: "var(--success)" }} />
              )}
              {toast.variant === "error" && (
                <AlertCircle className="h-4 w-4" style={{ color: "var(--danger)" }} />
              )}
              {toast.variant === "loading" && (
                <Loader2 className="h-4 w-4 animate-spin" style={{ color: "var(--accent)" }} />
              )}
              {toast.variant === "info" && (
                <Info className="h-4 w-4" style={{ color: "var(--accent)" }} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug">{toast.title}</p>
              {toast.description && (
                <p className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="rounded-md p-1 transition-opacity hover:opacity-75"
              style={{ color: "var(--text-muted)" }}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
