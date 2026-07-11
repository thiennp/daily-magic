import { Resend } from "resend";

type ResendClient = Resend;

const resendHolder: { value?: ResendClient } = {};

const resolveResendApiKey = (): string => {
  const apiKey = process.env.AUTH_RESEND_KEY ?? process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("AUTH_RESEND_KEY is not set");
  }

  return apiKey;
};

export default function getResendClient(): ResendClient {
  if (!resendHolder.value) {
    resendHolder.value = new Resend(resolveResendApiKey());
  }

  return resendHolder.value;
}
