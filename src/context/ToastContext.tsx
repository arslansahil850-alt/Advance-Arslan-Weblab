import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ToastVariant = "success" | "error" | "info" | "loading";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toasts: ToastMessage[];
  showToast: (
    title: string,
    options?: { description?: string; variant?: ToastVariant; durationMs?: number }
  ) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showToast = useCallback(
    (
      title: string,
      options?: { description?: string; variant?: ToastVariant; durationMs?: number }
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const variant = options?.variant ?? "info";
      const durationMs = options?.durationMs ?? (variant === "loading" ? 0 : 4200);

      setToasts((prev) => [...prev.slice(-3), { id, title, description: options?.description, variant }]);

      if (durationMs > 0) {
        window.setTimeout(() => {
          dismissToast(id);
        }, durationMs);
      }

      return id;
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
