import { siteConfig } from "../config/site-config";

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}

export interface ContactSubmissionResult {
  ok: boolean;
  message: string;
  deliveryMode?: string;
}

export async function submitContactInquiry(
  payload: ContactSubmissionPayload
): Promise<ContactSubmissionResult> {
  const baseUrl = siteConfig.contactApiBaseUrl.replace(/\/+$/, "");
  const endpoint = baseUrl ? `${baseUrl}/api/contact` : "/api/contact";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    deliveryMode?: string;
  };

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Unable to send inquiry right now.");
  }

  return {
    ok: true,
    message: data.message || "Inquiry sent successfully.",
    deliveryMode: data.deliveryMode
  };
}
