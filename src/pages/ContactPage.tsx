import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { siteConfig } from "../config/site-config";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "../context/ToastContext";
import { socialLinksData } from "../data/social-links";
import { trackEvent } from "../services/analytics";
import { submitContactInquiry } from "../services/contactClient";

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function ContactPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get("service") || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(() => {
    if (prefilledService.includes("redesign")) return "redesign";
    if (prefilledService.includes("landing")) return "landingPage";
    if (prefilledService.includes("maintenance")) return "maintenance";
    if (prefilledService.includes("interactive") || prefilledService.includes("frontend")) return "frontendApp";
    if (prefilledService) return "customWebsite";
    return "";
  });
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [websiteTrap, setWebsiteTrap] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const key = siteConfig.turnstileSiteKey;
    if (!key) return;

    const existing = document.getElementById("cf-turnstile-script");
    const renderWidget = () => {
      const target = document.getElementById("turnstile-widget-slot");
      if (window.turnstile && target && target.childElementCount === 0) {
        window.turnstile.render(target, {
          sitekey: key,
          callback: (token: string) => setTurnstileToken(token)
        });
      }
    };

    if (!existing) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      renderWidget();
    }
  }, []);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = t("contact.validation.nameRequired");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = t("contact.validation.emailInvalid");
    }
    if (!projectType) next.projectType = t("contact.validation.projectTypeRequired");
    if (!budget) next.budget = t("contact.validation.budgetRequired");
    if (!timeline) next.timeline = t("contact.validation.timelineRequired");
    if (message.trim().length < 15) next.message = t("contact.validation.messageMin");
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await submitContactInquiry({
        name: name.trim(),
        email: email.trim(),
        projectType,
        budget,
        timeline,
        message: message.trim(),
        website: websiteTrap,
        turnstileToken: turnstileToken || undefined
      });
      setFeedback({ type: "success", text: t("contact.successMessage") });
      showToast(t("contact.successTitle"), {
        description: t("contact.successMessage"),
        variant: "success"
      });
      trackEvent("contact_form_submitted", { projectType });
      setName("");
      setEmail("");
      setProjectType("");
      setBudget("");
      setTimeline("");
      setMessage("");
      setTurnstileToken("");
      if (window.turnstile) window.turnstile.reset();
    } catch (err) {
      const msg = err instanceof Error && err.message ? err.message : t("contact.errorFallback");
      setFeedback({ type: "error", text: msg });
      showToast(msg, { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.publicEmail);
      showToast(t("contact.emailCopied"), { variant: "success", durationMs: 2500 });
    } catch {
      showToast(siteConfig.publicEmail, { variant: "info" });
    }
  };

  const whatsappPrefillUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Arslan, I visited ARSLAN WEBLAB and would like to discuss a ${
      projectType || "web"
    } project.`
  )}`;

  return (
    <div>
      <section className="border-b py-16 sm:py-20" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("contact.pageKicker")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {t("contact.pageTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-base" style={{ color: "var(--text-secondary)" }}>
            {t("contact.pageSubtitle")}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-5">
              <div className="surface-panel rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold">{t("contact.directTitle")}</h2>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-3 rounded-xl p-3.5" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
                    <div className="min-w-0">
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {t("contact.emailLabel")}
                      </div>
                      <a
                        href={`mailto:${siteConfig.publicEmail}?subject=Project%20Inquiry%20-%20ARSLAN%20WEBLAB`}
                        className="block truncate text-sm font-medium hover:underline"
                      >
                        {siteConfig.publicEmail}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={t("contact.copyEmail")}
                      title={t("contact.copyEmail")}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent-bright)" }}
                    >
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <a
                    href={whatsappPrefillUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent("whatsapp_click", { source: "contact_page" });
                      showToast(t("contact.whatsappOpened"), { variant: "info", durationMs: 2500 });
                    }}
                    className="flex items-center justify-between gap-3 rounded-xl p-3.5 transition-colors"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      border: "1px solid var(--border-strong)"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 shrink-0" style={{ color: "var(--accent-bright)" }} aria-hidden="true" />
                      <div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {t("contact.whatsappLabel")}
                        </div>
                        <div className="text-sm font-semibold">{t("contact.whatsappAction")}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "var(--accent-bright)" }} aria-hidden="true" />
                  </a>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      siteConfig.publicEmail
                    )}&su=${encodeURIComponent("Project Inquiry - ARSLAN WEBLAB")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl p-3.5"
                    style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                      <span className="text-sm font-medium">{t("contact.gmailAction")}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5" style={{ borderColor: "var(--border-subtle)" }}>
                  {socialLinksData
                    .filter((s) => s.id === "github" || s.id === "facebook")
                    .map((social) => (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium"
                        style={{
                          backgroundColor: "var(--bg-elevated)",
                          border: "1px solid var(--border-subtle)"
                        }}
                      >
                        <span>{t(social.labelKey)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} aria-hidden="true" />
                      </a>
                    ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="surface-panel rounded-2xl p-6 sm:p-8"
              >
                <h2 className="font-display text-xl font-semibold">{t("contact.formTitle")}</h2>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="websiteTrap">Website</label>
                  <input
                    id="websiteTrap"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteTrap}
                    onChange={(e) => setWebsiteTrap(e.target.value)}
                  />
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium">
                      {t("contact.nameLabel")}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("contact.namePlaceholder")}
                      aria-invalid={Boolean(errors.name)}
                      className="mt-1.5 h-11 w-full rounded-xl px-3.5 text-sm outline-none"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: `1px solid ${errors.name ? "var(--danger)" : "var(--border-subtle)"}`,
                        color: "var(--text-primary)"
                      }}
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium">
                      {t("contact.emailFieldLabel")}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("contact.emailPlaceholder")}
                      aria-invalid={Boolean(errors.email)}
                      className="mt-1.5 h-11 w-full rounded-xl px-3.5 text-sm outline-none"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: `1px solid ${errors.email ? "var(--danger)" : "var(--border-subtle)"}`,
                        color: "var(--text-primary)"
                      }}
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-project-type" className="block text-xs font-medium">
                      {t("contact.projectTypeLabel")}
                    </label>
                    <select
                      id="contact-project-type"
                      required
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      aria-invalid={Boolean(errors.projectType)}
                      className="mt-1.5 h-11 w-full rounded-xl px-3 text-sm outline-none"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: `1px solid ${errors.projectType ? "var(--danger)" : "var(--border-subtle)"}`,
                        color: "var(--text-primary)"
                      }}
                    >
                      <option value="">{t("contact.projectTypePlaceholder")}</option>
                      <option value="customWebsite">{t("contact.projectTypes.customWebsite")}</option>
                      <option value="responsiveDesign">{t("contact.projectTypes.responsiveDesign")}</option>
                      <option value="frontendApp">{t("contact.projectTypes.frontendApp")}</option>
                      <option value="landingPage">{t("contact.projectTypes.landingPage")}</option>
                      <option value="redesign">{t("contact.projectTypes.redesign")}</option>
                      <option value="maintenance">{t("contact.projectTypes.maintenance")}</option>
                      <option value="other">{t("contact.projectTypes.other")}</option>
                    </select>
                    {errors.projectType && (
                      <p role="alert" className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-medium">
                      {t("contact.budgetLabel")}
                    </label>
                    <select
                      id="contact-budget"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      aria-invalid={Boolean(errors.budget)}
                      className="mt-1.5 h-11 w-full rounded-xl px-3 text-sm outline-none"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: `1px solid ${errors.budget ? "var(--danger)" : "var(--border-subtle)"}`,
                        color: "var(--text-primary)"
                      }}
                    >
                      <option value="">{t("contact.budgetPlaceholder")}</option>
                      <option value="under250">{t("contact.budgets.under250")}</option>
                      <option value="250to500">{t("contact.budgets.250to500")}</option>
                      <option value="500to1000">{t("contact.budgets.500to1000")}</option>
                      <option value="1000plus">{t("contact.budgets.1000plus")}</option>
                      <option value="flexible">{t("contact.budgets.flexible")}</option>
                    </select>
                    {errors.budget && (
                      <p role="alert" className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                        {errors.budget}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-timeline" className="block text-xs font-medium">
                    {t("contact.timelineLabel")}
                  </label>
                  <select
                    id="contact-timeline"
                    required
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    aria-invalid={Boolean(errors.timeline)}
                    className="mt-1.5 h-11 w-full rounded-xl px-3 text-sm outline-none"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      border: `1px solid ${errors.timeline ? "var(--danger)" : "var(--border-subtle)"}`,
                      color: "var(--text-primary)"
                    }}
                  >
                    <option value="">{t("contact.timelinePlaceholder")}</option>
                    <option value="urgent">{t("contact.timelines.urgent")}</option>
                    <option value="standard">{t("contact.timelines.standard")}</option>
                    <option value="extended">{t("contact.timelines.extended")}</option>
                    <option value="flexible">{t("contact.timelines.flexible")}</option>
                  </select>
                  {errors.timeline && (
                    <p role="alert" className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                      {errors.timeline}
                    </p>
                  )}
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-message" className="block text-xs font-medium">
                    {t("contact.messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contact.messagePlaceholder")}
                    aria-invalid={Boolean(errors.message)}
                    className="mt-1.5 w-full rounded-xl p-3.5 text-sm outline-none"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      border: `1px solid ${errors.message ? "var(--danger)" : "var(--border-subtle)"}`,
                      color: "var(--text-primary)"
                    }}
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {siteConfig.turnstileSiteKey && (
                  <div id="turnstile-widget-slot" className="mt-4" />
                )}

                {feedback && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-5 rounded-xl p-3.5 text-xs font-medium"
                    style={{
                      backgroundColor:
                        feedback.type === "success" ? "rgba(52, 211, 153, 0.12)" : "rgba(248, 113, 113, 0.12)",
                      border: `1px solid ${
                        feedback.type === "success" ? "var(--success)" : "var(--danger)"
                      }`,
                      color: feedback.type === "success" ? "var(--success)" : "var(--danger)"
                    }}
                  >
                    {feedback.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-opacity disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-contrast)"
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>{t("contact.submittingBtn")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>{t("contact.submitBtn")}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            {t("contact.nextKicker")}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {t("contact.nextTitle")}
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(["s1", "s2", "s3", "s4"] as const).map((stepKey, idx) => (
              <div key={stepKey} className="surface-panel rounded-2xl p-6">
                <span className="font-mono-num text-sm font-semibold" style={{ color: "var(--accent-bright)" }}>
                  0{idx + 1}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  {t(`contact.nextSteps.${stepKey}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(`contact.nextSteps.${stepKey}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
