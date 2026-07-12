import { Resend } from "resend";

type ResendClient = Resend;

const resendHolder: { value?: ResendClient } = {};

const resolveResendApiKey = (): string => {
  if (!process.env.AUTH_RESEND_KEY) {
    throw new Error("AUTH_RESEND_KEY is not set");
  }

  return process.env.AUTH_RESEND_KEY;
};

export default function getResendClient(): ResendClient {
  if (!resendHolder.value) {
    resendHolder.value = new Resend(resolveResendApiKey());
  }

  return resendHolder.value;
}
