import type { BackendEnvironment } from "../../config/environment.js";
import type { ValidatedContactInput } from "../../validators/contact.validator.js";
import { sendViaResendApi, type EmailSendResult } from "./api.provider.js";
import { sendViaSmtpFallback } from "./smtp.provider.js";

export interface EmailTransportDeps {
  sendApi?: (env: BackendEnvironment, data: ValidatedContactInput) => Promise<EmailSendResult>;
  sendSmtp?: (env: BackendEnvironment, data: ValidatedContactInput) => Promise<EmailSendResult>;
}

export async function deliverContactEmail(
  env: BackendEnvironment,
  data: ValidatedContactInput,
  deps: EmailTransportDeps = {}
): Promise<EmailSendResult> {
  const sendApi = deps.sendApi || sendViaResendApi;
  const sendSmtp = deps.sendSmtp || sendViaSmtpFallback;

  const hasResend = Boolean(env.resendApiKey);
  const hasSmtp = Boolean(env.smtpHost && env.smtpUser && env.smtpPass);

  if (!hasResend && !hasSmtp && !deps.sendApi && !deps.sendSmtp) {
    throw new Error("UNCONFIGURED_EMAIL_PROVIDER");
  }

  if (hasResend || deps.sendApi) {
    try {
      return await sendApi(env, data);
    } catch (apiError) {
      if (hasSmtp || deps.sendSmtp) {
        return await sendSmtp(env, data);
      }
      throw apiError;
    }
  }

  return await sendSmtp(env, data);
}
