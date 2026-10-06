import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";

/**
 * Human-facing ownership consent (S2).
 * Reuses S1 Product EN for title / sub / success / deny / Assistant label.
 * No jargon.
 */
export const OAUTH_CONSENT_COPY = {
  title: DEVICE_VERIFY_COPY.title,
  ownerLine: DEVICE_VERIFY_COPY.ownerLine,
  pageTitle: DEVICE_VERIFY_COPY.pageTitle,
  sub: DEVICE_VERIFY_COPY.sub,
  stop: DEVICE_VERIFY_COPY.stop,
  /** Reuse S1 "Assistant" label; fallback "this assistant" when unnamed. */
  clientLabel: DEVICE_VERIFY_COPY.clientLabel,
  clientFallback: DEVICE_VERIFY_COPY.clientFallback,
  /** Shown before the redirect host, e.g. "Returns to claude.ai". */
  continueAtLabel: "Returns to",
  continueAtFallback: "this app",
  continueHint:
    "After you confirm, you'll go back there to finish setting up this assistant.",
  confirm: DEVICE_VERIFY_COPY.confirm,
  deny: DEVICE_VERIFY_COPY.deny,
  confirmed: DEVICE_VERIFY_COPY.confirmed,
  denied: DEVICE_VERIFY_COPY.denied,
  expired: "This link expired. Start again from your assistant.",
  termsLabel: "I accept the Terms and Privacy Policy for this assistant.",
  /** termsLabel split around the linked "Terms and Privacy Policy". */
  termsLabelPrefix: "I accept the ",
  termsLabelSuffix: " for this assistant.",
  termsRequired: "Accept the Terms and Privacy Policy to continue.",
  openLinkHint: "Open the link your assistant gave you to continue.",
  loginRequired: DEVICE_VERIFY_COPY.loginRequired,
} as const;
