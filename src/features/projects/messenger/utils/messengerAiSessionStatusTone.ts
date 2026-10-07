import type { MessengerChipTone } from "@/features/projects/messenger/utils/messengerStateChipTone";

/** Map free-form session status strings to existing messenger chip tones. */
export const messengerAiSessionStatusTone = (status: string): MessengerChipTone => {
  const normalized = status.trim().toLowerCase();
  if (
    normalized === "completed" ||
    normalized === "done" ||
    normalized === "succeeded" ||
    normalized === "success"
  ) {
    return "ok";
  }
  if (
    normalized === "failed" ||
    normalized === "error" ||
    normalized === "blocked" ||
    normalized === "denied"
  ) {
    return "err";
  }
  if (
    normalized === "working" ||
    normalized === "running" ||
    normalized === "in_progress" ||
    normalized === "started"
  ) {
    return "info";
  }
  if (normalized === "waiting" || normalized === "queued") {
    return "warn";
  }
  return "muted";
};
