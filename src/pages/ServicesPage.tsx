import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { processStepsData, servicesData } from "../data/services";

export function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="border-b py-16 sm:py-24" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("services.pageKicker")}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold sm:text-5xl lg:text-6xl">
            {t("services.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t("services.pageSubtitle")}
          </p>

          <div className="mt-14 space-y-6">
            {servicesData.map((service, idx) => {
              const reversed = idx % 2 === 1;
              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="surface-panel grid gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-12 lg:items-center"
                >
                  <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono-num text-5xl font-semibold tracking-tight sm:text-6xl"
                        style={{ color: "var(--accent-soft)", WebkitTextStroke: "1px var(--accent)" }}
                      >
                        {service.number}
                      </span>
                      <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent)" }}>
                        {service.code}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                      {t(service.titleKey)}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {t(service.descriptionKey)}
                    </p>
                  </div>

                  <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
                    <ul className="space-y-2.5">
                      {service.deliverablesKeys.map((dKey) => (
                        <li key={dKey} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--accent-bright)" }}
                            aria-hidden="true"
                          />
                          <span style={{ color: "var(--text-primary)" }}>{t(dKey)}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-4"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {service.tags.join(" · ")}
                      </span>
                      <Link
                        to={`/contact?service=${encodeURIComponent(service.id)}`}
                        className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-xs font-semibold whitespace-nowrap"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--accent-contrast)"
                        }}
                      >
                        <span>{t("services.startProject")}</span>
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="py-20"
        style={{ backgroundColor: "var(--bg-elevated)" }}
        aria-labelledby="services-process-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
              {t("services.processKicker")}
            </p>
            <h2 id="services-process-heading" className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t("services.processTitle")}
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processStepsData.map((step) => (
              <div key={step.key} className="surface-panel rounded-2xl p-6">
                <div className="font-mono-num text-lg font-semibold" style={{ color: "var(--accent-bright)" }}>
                  {step.number}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {t(`services.process.${step.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(`services.process.${step.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
