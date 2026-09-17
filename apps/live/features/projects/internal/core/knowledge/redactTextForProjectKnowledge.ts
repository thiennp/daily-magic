/** Best-effort redaction before persisting knowledge on disk. */
const redactTextForProjectKnowledge = (text: string): string =>
  text
    .replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      "[redacted-email]",
    )
    .replace(/\bsk-[a-zA-Z0-9]{20,}\b/g, "[redacted-secret]");

export default redactTextForProjectKnowledge;
