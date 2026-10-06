import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";

/**
 * Human-facing ownership consent (S2).
 * Reuses S1 Product EN for title / sub / success / deny. No jargon.
 */
export const OAUTH_CONSENT_COPY = {
  title: DEVICE_VERIFY_COPY.title,
  ownerLine: DEVICE_VERIFY_COPY.ownerLine,
  pageTitle: DEVICE_VERIFY_COPY.pageTitle,
  sub: DEVICE_VERIFY_COPY.sub,
  clientLabel: DEVICE_VERIFY_COPY.clientLabel,
  clientFallback: DEVICE_VERIFY_COPY.clientFallback,
  /** Where the sign-in continues after Confirm (redirect host, plain words). */
  continueAtLabel: "Continues at",
  continueAtFallback: "this app",
  /** Shown under name + host so the human knows what Confirm does. */
  continueHint:
    "After you confirm, you'll return to that place to finish connecting this assistant.",
  confirm: DEVICE_VERIFY_COPY.confirm,
  deny: DEVICE_VERIFY_COPY.deny,
  confirmed: DEVICE_VERIFY_COPY.confirmed,
  denied: DEVICE_VERIFY_COPY.denied,
  expired: "This connect request expired. Start again from your assistant.",
  termsLabel: "I accept the Terms and Privacy Policy for this assistant",
  termsRequired: "Accept the Terms to continue.",
  openLinkHint: "Open the connect link from your assistant to continue.",
  loginRequired: DEVICE_VERIFY_COPY.loginRequired,
} as const;
