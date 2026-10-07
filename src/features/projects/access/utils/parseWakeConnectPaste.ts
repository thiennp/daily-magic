import { isPublicWakeLinkHost } from "@/features/projects/access/utils/isPublicWakeLinkHost";

/** P1-S1b one-box wake connect: the pasted text → wake link + key, or why not. */
export type WakeConnectPaste =
  | { readonly ok: true; readonly webhookUrl: string; readonly webhookKey: string }
  | { readonly ok: false; readonly error: "bad_link" | "missing_key" };

const URL_PATTERN = /https?:\/\/[^\s"'<>]+/gi;
/** Labels people copy along with the values ("Wake link:", "Key =", "Bearer"). */
const LABEL_PATTERN =
  /(?:^|\s)(?:wake\s*link|webhook(?:\s*url)?|url|link|key|token|secret|authorization)\s*[:=]|\bbearer\s+/gim;
const EDGE_PUNCTUATION = /^[\s"'`,;:()[\]{}]+|[\s"'`,;:()[\]{}]+$/g;
/** Same cap as the server (writeProjectGrokRoutineWebhook: trimmed, 1–2000). */
export const WAKE_KEY_MAX_LENGTH = 2000;

/** Every web address in the paste (http or https), trailing punctuation trimmed. */
export const findWakeLinkCandidates = (text: string): readonly string[] =>
  [...text.matchAll(URL_PATTERN)].map((m) => m[0].replace(/[),.;]+$/, ""));

/** The first web address in the paste; "" if none. */
export const findWakeLinkCandidate = (text: string): string =>
  findWakeLinkCandidates(text)[0] ?? "";

/** https, no `user:pass@`, public host (client mirror of the server) → hostname; else null. */
export const wakeLinkHost = (value: string): string | null => {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return isPublicWakeLinkHost(url.hostname) ? url.hostname : null;
  } catch {
    return null;
  }
};

/**
 * The key: what is left once the addresses and labels are gone. The server
 * accepts any 1–2000 characters, so any length counts; when several words are
 * left (chatter around the values) the longest one is the key.
 */
export const findWakeKey = (text: string): string | undefined => {
  const rest = text.replace(URL_PATTERN, " ").replace(LABEL_PATTERN, " ");
  const tokens = rest
    .split(/\s+/)
    .map((token) => token.replace(EDGE_PUNCTUATION, ""))
    .filter((token) => /[\p{L}\p{N}]/u.test(token));
  return [...tokens].sort((a, b) => b.length - a.length)[0];
};

/** Accepts the wake link and key in any order, on one line or two, with or without labels. */
export const parseWakeConnectPaste = (text: string): WakeConnectPaste => {
  const webhookUrl = findWakeLinkCandidate(text);
  if (wakeLinkHost(webhookUrl) === null) return { ok: false, error: "bad_link" };
  const webhookKey = findWakeKey(text);
  if (webhookKey === undefined || webhookKey.length > WAKE_KEY_MAX_LENGTH) {
    return { ok: false, error: "missing_key" };
  }
  return { ok: true, webhookUrl, webhookKey };
};
