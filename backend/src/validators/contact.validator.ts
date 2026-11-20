import crypto from "node:crypto";
import { z } from "zod";

const HEADER_INJECTION_PATTERN = /[\r\n]|%0a|%0d/i;

const singleLineText = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((val) => !HEADER_INJECTION_PATTERN.test(val), {
      message: "Invalid control characters detected."
    });

export const contactPayloadSchema = z.object({
  name: singleLineText(2, 100),
   email: z
  .string()
  .trim()
  .min(5)
  .max(160)
  .email()
  .refine((val) => !HEADER_INJECTION_PATTERN.test(val), {
    message: "Invalid control characters detected."
  }),
  projectType: singleLineText(2, 80),
  budget: singleLineText(2, 60),
  timeline: singleLineText(2, 60),
  message: z.string().trim().min(15).max(3000),
  website: z.string().max(120).optional().default(""),
  turnstileToken: z.string().max(4096).optional()
});

export type ValidatedContactInput = z.infer<typeof contactPayloadSchema>;

export function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function normalizeContactInput(data: ValidatedContactInput): ValidatedContactInput {
  return {
    ...data,
    name: data.name.replace(/\s+/g, " ").trim(),
    email: data.email.toLowerCase().trim(),
    projectType: data.projectType.replace(/\s+/g, " ").trim(),
    budget: data.budget.replace(/\s+/g, " ").trim(),
    timeline: data.timeline.replace(/\s+/g, " ").trim(),
    message: data.message.replace(/\r\n/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim()
  };
}

export function computeSubmissionDigest(data: ValidatedContactInput): string {
  return crypto
    .createHash("sha256")
    .update(`${data.email}|${data.projectType}|${data.message}`)
    .digest("hex");
}
