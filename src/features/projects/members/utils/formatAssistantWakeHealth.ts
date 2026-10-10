import { ASSISTANT_WAKE_HEALTH_COPY as C } from "@/features/projects/members/assistantWakeHealthCopy.constant";
import { formatOverviewWhen } from "@/features/projects/overview/public-api/types";

export type AssistantWakeHealth = {
  readonly failed: boolean;
  /** One plain line for the assistant row (never the raw failure code). */
  readonly line: string;
  /** Show "Paste a new wake link" (opens the one-box connect). */
  readonly offerPaste: boolean;
};

const REASONS: Readonly<
  Record<string, { readonly text: string; readonly offerPaste: boolean }>
> = {
  "HTTP 429": { text: C.busy, offerPaste: false },
  "HTTP 401": { text: C.keyRejected, offerPaste: true },
  "HTTP 403": { text: C.keyRejected, offerPaste: true },
  "Fetch failed (timeout, DNS or refused)": {
    text: C.unreachable,
    offerPaste: false,
  },
  "No wake link was saved when this message was sent.": {
    text: C.notPostable,
    offerPaste: true,
  },
};

const SERVER_ERROR = /^HTTP 5\d\d$/;

/** Stored failure meta ("HTTP 429", "HTTP 503", "Not postable", …) → plain reason; any HTTP 5nn → server error. */
export const mapWakeFailureReason = (reason: string) => {
  const key = reason.trim();
  if (SERVER_ERROR.test(key)) return { text: C.serverError, offerPaste: false };
  return REASONS[key] ?? { text: C.other, offerPaste: true };
};

const MINUTE_MS = 60_000;

/** "just now" / "5 min ago" / "3 h ago" / "2 d ago". */
export const formatWakeAgo = (iso: string, nowMs: number): string => {
  const minutes = Math.floor(
    Math.max(0, nowMs - new Date(iso).getTime()) / MINUTE_MS,
  );
  if (Number.isNaN(minutes) || minutes < 1) return C.justNow;
  if (minutes < 60) return C.minutesAgo.replace("{n}", String(minutes));
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return C.hoursAgo.replace("{n}", String(hours));
  return C.daysAgo.replace("{n}", String(Math.floor(hours / 24)));
};

/**
 * GET grok-webhook `lastWakeAt` + `lastFailureReason` → the row's health line.
 * null reason: "Registered ✓ · Last wake {ago}" or "No wakes yet".
 */
export const formatAssistantWakeHealth = (input: {
  readonly lastWakeAt: string | null;
  readonly lastFailureReason: string | null;
  readonly nowMs?: number;
}): AssistantWakeHealth => {
  const nowMs = input.nowMs ?? Date.now();
  const { lastWakeAt, lastFailureReason } = input;
  if (lastFailureReason !== null && lastFailureReason.trim() !== "") {
    const mapped = mapWakeFailureReason(lastFailureReason);
    const time = formatOverviewWhen(lastWakeAt, { nowMs }) ?? "";
    const line = C.failedLine
      .replace("{time}", time)
      .replace("{reason}", mapped.text);
    return {
      failed: true,
      line: line.replace("failed :", "failed:"),
      offerPaste: mapped.offerPaste,
    };
  }
  if (lastWakeAt === null)
    return { failed: false, line: C.noWakes, offerPaste: false };
  const line = C.okLine.replace("{ago}", formatWakeAgo(lastWakeAt, nowMs));
  return { failed: false, line, offerPaste: false };
};
