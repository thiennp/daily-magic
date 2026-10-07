/** P1-S1b one-box wake connect: the pasted text → wake link + key, or why not. */
export type WakeConnectPaste =
  | { readonly ok: true; readonly webhookUrl: string; readonly webhookKey: string }
  | { readonly ok: false; readonly error: "bad_link" | "missing_key" };

const URL_PATTERN = /https?:\/\/[^\s"'<>]+/i;
/** Labels people copy along with the values ("Wake link:", "Key =", "Bearer"). */
const LABEL_PATTERN =
  /(?:^|\s)(?:wake\s*link|webhook(?:\s*url)?|url|link|key|token|secret|authorization)\s*[:=]|\bbearer\s+/gim;
const EDGE_PUNCTUATION = /^[\s"'`,;:()[\]{}]+|[\s"'`,;:()[\]{}]+$/g;
const MIN_KEY_LENGTH = 8;

const isHttpsUrl = (value: string): boolean => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Accepts the wake link and key in any order, on one line or two, with or
 * without labels. The key is the longest leftover token (≥ 8 chars).
 */
export const parseWakeConnectPaste = (text: string): WakeConnectPaste => {
  const match = URL_PATTERN.exec(text);
  const webhookUrl = match?.[0].replace(/[),.;]+$/, "") ?? "";
  if (!isHttpsUrl(webhookUrl)) return { ok: false, error: "bad_link" };
  const rest = text.replace(match?.[0] ?? "", " ").replace(LABEL_PATTERN, " ");
  const tokens = rest
    .split(/\s+/)
    .map((token) => token.replace(EDGE_PUNCTUATION, ""))
    .filter((token) => token.length >= MIN_KEY_LENGTH);
  const webhookKey = [...tokens].sort((a, b) => b.length - a.length)[0];
  if (webhookKey === undefined) return { ok: false, error: "missing_key" };
  return { ok: true, webhookUrl, webhookKey };
};
