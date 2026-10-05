import { MARKER_BEGIN, MARKER_END } from "./tokenSaverMarkers.constants";

/**
 * Replace an existing marked block or append one. Leaves unmarked content.
 * begin/end default to # BEGIN/# END agent-witch-token-saver.
 */
export const mergeMarkedBlock = (input: {
  readonly existing: string;
  readonly blockBody: string;
  readonly begin?: string;
  readonly end?: string;
}): { readonly next: string; readonly changed: boolean } => {
  const begin = input.begin ?? MARKER_BEGIN;
  const end = input.end ?? MARKER_END;
  const block = `${begin}\n${input.blockBody.trimEnd()}\n${end}\n`;
  const start = input.existing.indexOf(begin);
  if (start < 0) {
    const prefix =
      input.existing.length === 0 || input.existing.endsWith("\n")
        ? input.existing
        : `${input.existing}\n`;
    const next = `${prefix}${block}`;
    return { next, changed: next !== input.existing };
  }
  const endIdx = input.existing.indexOf(end, start);
  if (endIdx < 0) {
    const next = `${input.existing.slice(0, start)}${block}`;
    return { next, changed: next !== input.existing };
  }
  const after = endIdx + end.length;
  const trailing = input.existing.slice(after).replace(/^\n/, "");
  const next = `${input.existing.slice(0, start)}${block}${trailing}`;
  return { next, changed: next !== input.existing };
};
