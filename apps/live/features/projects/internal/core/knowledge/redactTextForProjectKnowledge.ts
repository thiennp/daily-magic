import { scrubOutboundSecrets } from "@agent-witch/shared/dispatch";

const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Redaction before persisting knowledge / memory on disk: the shared S0-8
 * secret scrub (keys, tokens, PEM blocks, .env lines) plus emails.
 */
const redactTextForProjectKnowledge = (text: string): string =>
  scrubOutboundSecrets(text).scrubbed.replace(EMAIL_PATTERN, "[redacted-email]");

export default redactTextForProjectKnowledge;
