import {
  WAKE_KEY_MAX_LENGTH,
  findWakeKey,
  findWakeLinkCandidates,
  wakeLinkHost,
} from "@/features/projects/access/utils/parseWakeConnectPaste";

/** Why a field is not valid yet (inline error); null = fine or empty. */
export type WakeConnectIssue = "two" | "https" | "bad" | "long" | null;

export type WakeUrlCheck = {
  readonly site: string | null;
  /** null = empty or valid (see `site`). */
  readonly issue: Extract<WakeConnectIssue, "https" | "bad" | "two"> | null;
};

/** The Wake link field alone: one https public address, nothing else. */
export const checkWakeUrlField = (value: string): WakeUrlCheck => {
  const text = value.trim();
  if (text === "") return { site: null, issue: null };
  if (/\s/.test(text)) return { site: null, issue: "two" };
  const site = wakeLinkHost(text);
  if (site !== null) return { site, issue: null };
  return { site: null, issue: /^https:\/\//i.test(text) ? "bad" : "https" };
};

/** The Key field alone: 1–2000 characters (same cap as the server). */
export const checkWakeKeyField = (
  value: string,
): { readonly ok: boolean; readonly issue: "long" | null } => {
  const key = value.trim();
  if (key.length > WAKE_KEY_MAX_LENGTH) return { ok: false, issue: "long" };
  return { ok: key.length > 0, issue: null };
};

/**
 * "URL KEY" pasted into the Wake link field → both values, else null
 * (one address + exactly the key left over; labels like "Key:" are dropped).
 */
export const splitPastedWakeUrlAndKey = (
  text: string,
): { readonly url: string; readonly key: string } | null => {
  const candidates = findWakeLinkCandidates(text);
  const key = findWakeKey(text);
  if (candidates.length !== 1 || key === undefined) return null;
  return { url: candidates[0], key };
};
