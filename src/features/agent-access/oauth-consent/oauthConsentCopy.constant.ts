import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";

/** Human-facing ownership consent (S2). Reuses S1 locked owner line. No jargon. */
export const OAUTH_CONSENT_COPY = {
  title: DEVICE_VERIFY_COPY.title,
  ownerLine: DEVICE_VERIFY_COPY.ownerLine,
  clientLabel: DEVICE_VERIFY_COPY.clientLabel,
  clientFallback: DEVICE_VERIFY_COPY.clientFallback,
  confirm: DEVICE_VERIFY_COPY.confirm,
  deny: DEVICE_VERIFY_COPY.deny,
  confirmed: DEVICE_VERIFY_COPY.confirmed,
  denied: DEVICE_VERIFY_COPY.denied,
  expired: "This connect request expired. Start again from your assistant.",
  termsLabel: "I accept the Terms and Privacy Policy for this assistant",
  termsRequired: "Accept the Terms to continue.",
} as const;
