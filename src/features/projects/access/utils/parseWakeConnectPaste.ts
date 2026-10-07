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

/** Host of an https wake link, else null (http, broken or not a web address). */
export const wakeLinkHost = (value: string): string | null => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.hostname : null;
  } catch {
    return null;
  }
};

/** The first web address in the paste (http or https), trailing punctuation trimmed; "" if none. */
export const findWakeLinkCandidate = (text: string): string =>
  URL_PATTERN.exec(text)?.[0].replace(/[),.;]+$/, "") ?? "";

/** The key: the longest leftover token (≥ 8 chars) once the address and labels are gone. */
export const findWakeKey = (text: string): string | undefined => {
  const match = URL_PATTERN.exec(text)?.[0] ?? "";
  const rest = text.replace(match, " ").replace(LABEL_PATTERN, " ");
  const tokens = rest
    .split(/\s+/)
    .map((token) => token.replace(EDGE_PUNCTUATION, ""))
    .filter((token) => token.length >= MIN_KEY_LENGTH);
  return [...tokens].sort((a, b) => b.length - a.length)[0];
};

/** Accepts the wake link and key in any order, on one line or two, with or without labels. */
export const parseWakeConnectPaste = (text: string): WakeConnectPaste => {
  const webhookUrl = findWakeLinkCandidate(text);
  if (wakeLinkHost(webhookUrl) === null) return { ok: false, error: "bad_link" };
  const webhookKey = findWakeKey(text);
  if (webhookKey === undefined) return { ok: false, error: "missing_key" };
  return { ok: true, webhookUrl, webhookKey };
};
