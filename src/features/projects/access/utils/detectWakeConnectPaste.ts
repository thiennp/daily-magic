import {
  WAKE_KEY_MAX_LENGTH,
  findWakeKey,
  findWakeLinkCandidates,
  wakeLinkHost,
} from "@/features/projects/access/utils/parseWakeConnectPaste";

/** Why Connect is not ready yet; null = ready or nothing pasted. */
export type WakeConnectIssue = "two" | "https" | "bad" | "long" | "need_key" | "need_link" | null;

export type WakeConnectDetect = {
  /** ok = https public wake link found; check = an address was pasted but is rejected; missing = none yet. */
  readonly link: "ok" | "check" | "missing";
  readonly site: string | null;
  readonly keyFound: boolean;
  readonly issue: WakeConnectIssue;
  /** Connect may be pressed (DF-036 F7: both parts detected). */
  readonly ready: boolean;
};

const linkIssue = (candidates: readonly string[]): WakeConnectIssue => {
  if (candidates.length > 1) return "two";
  if (!/^https:\/\//i.test(candidates[0])) return "https";
  return "bad";
};

/** DF-036 detection chips + inline guidance under the one-box paste (never reveals the key). */
export const detectWakeConnectPaste = (text: string): WakeConnectDetect => {
  const candidates = findWakeLinkCandidates(text);
  const key = findWakeKey(text);
  const keyTooLong = key !== undefined && key.length > WAKE_KEY_MAX_LENGTH;
  const keyFound = key !== undefined && !keyTooLong;
  const site = candidates.length === 1 ? wakeLinkHost(candidates[0]) : null;
  const link = candidates.length === 0 ? "missing" : site === null ? "check" : "ok";
  const issue: WakeConnectIssue =
    link === "check"
      ? linkIssue(candidates)
      : keyTooLong
        ? "long"
        : link === "ok" && !keyFound
          ? "need_key"
          : link === "missing" && keyFound
            ? "need_link"
            : null;
  return { link, site, keyFound, issue, ready: link === "ok" && keyFound };
};
