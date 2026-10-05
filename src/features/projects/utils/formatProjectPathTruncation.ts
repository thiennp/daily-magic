export interface ProjectPathTruncation {
  readonly display: string;
  readonly full: string;
}

/**
 * Middle-ellipsis for project paths. Keeps a leading head (so `~/` stays at the
 * start) and a meaningful tail. Do not use CSS `CSS rtl direction` — it flips `~/`.
 */
const formatProjectPathTruncation = (
  folderPath: string,
  maxLength = 56,
): ProjectPathTruncation => {
  const full = folderPath.trim();
  if (full.length <= maxLength) {
    return { display: full, full };
  }

  const ellipsis = "…";
  const tailChars = Math.min(32, Math.max(14, Math.floor(maxLength * 0.5)));
  const headChars = Math.max(4, maxLength - tailChars - ellipsis.length);
  const display = `${full.slice(0, headChars)}${ellipsis}${full.slice(-tailChars)}`;

  return { display, full };
};

export default formatProjectPathTruncation;
