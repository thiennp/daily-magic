import {
  findWakeKey,
  findWakeLinkCandidate,
  wakeLinkHost,
} from "@/features/projects/access/utils/parseWakeConnectPaste";

export type WakeConnectDetect = {
  /** ok = https wake link found; check = an address was pasted but is rejected; missing = none yet. */
  readonly link: "ok" | "check" | "missing";
  readonly site: string | null;
  readonly keyFound: boolean;
};

/** DF-036 detection chips under the one-box paste (never reveals the key). */
export const detectWakeConnectPaste = (text: string): WakeConnectDetect => {
  const candidate = findWakeLinkCandidate(text);
  const keyFound = findWakeKey(text) !== undefined;
  if (candidate === "") return { link: "missing", site: null, keyFound };
  const site = wakeLinkHost(candidate);
  return site === null
    ? { link: "check", site: null, keyFound }
    : { link: "ok", site, keyFound };
};
