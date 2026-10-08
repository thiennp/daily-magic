import { formatAwcGrokWakeCopy } from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_WAKE_CONNECT_PASTE_COPY as C } from "@/features/projects/access/awcWakeConnectPasteCopy.constant";
import type { WakeConnectIssue } from "@/features/projects/access/utils/wakeConnectFields";

export type WakeConnectPasteHint = {
  readonly text: string;
  readonly bad: boolean;
};

const HINTS: Readonly<
  Record<Exclude<WakeConnectIssue, null>, WakeConnectPasteHint>
> = {
  two: { text: C.twoLinks, bad: true },
  https: { text: C.httpsOnly, bad: true },
  bad: { text: C.badLink, bad: true },
  long: { text: C.keyTooLong, bad: true },
};

/** DF-036 F9: the inline line under the paste box (brief strings); null = nothing to say. */
export const formatWakeConnectPasteHint = (
  issue: WakeConnectIssue,
  memberName: string | null,
): WakeConnectPasteHint | null => {
  if (memberName === null || memberName.trim() === "") {
    return {
      text: formatAwcGrokWakeCopy(C.needNickname, memberName),
      bad: true,
    };
  }
  if (issue === null) return null;
  const hint = HINTS[issue];
  return { text: formatAwcGrokWakeCopy(hint.text, memberName), bad: hint.bad };
};
