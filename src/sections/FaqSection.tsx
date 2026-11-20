import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { faqsData } from "../data/faqs";

export function FaqSection() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id ?? null);

  return (
    <section id="faq" className="py-20" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("faq.kicker")}
          </p>
          <h2 id="faq-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            const btnId = `faq-btn-${faq.id}`;
            return (
              <div
                key={faq.id}
                className="surface-panel overflow-hidden rounded-2xl"
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-start text-base font-medium"
                  >
                    <span>{t(faq.questionKey)}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: isOpen ? "var(--accent-soft)" : "var(--bg-elevated)",
                        color: "var(--accent-bright)"
                      }}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="border-t px-6 py-4 text-sm leading-relaxed"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)"
                    }}
                  >
                    {t(faq.answerKey)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
