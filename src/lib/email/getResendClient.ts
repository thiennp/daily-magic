import { Resend } from "resend";

import resolveResendApiKey from "./resolveResendApiKey";

type ResendClient = Resend;

const resendHolder: { value?: ResendClient } = {};

const requireResendApiKey = (): string => {
  const apiKey = resolveResendApiKey();
  if (!apiKey) {
    throw new Error("AUTH_RESEND_KEY or RESEND_API_KEY is not set");
  }

  return apiKey;
};

export default function getResendClient(): ResendClient {
  if (!resendHolder.value) {
    resendHolder.value = new Resend(requireResendApiKey());
  }

  return resendHolder.value;
}
