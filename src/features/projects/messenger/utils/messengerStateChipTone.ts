import type { AwcMessengerMessageState } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type MessengerChipTone = "ok" | "info" | "warn" | "err" | "muted";

export const messengerStateChipTone = (
  state: AwcMessengerMessageState,
): MessengerChipTone => {
  if (state === "got_it" || state === "done") return "ok";
  if (state === "working" || state === "received") return "info";
  if (state === "waiting" || state === "checks_on_demand") return "warn";
  if (state === "blocked" || state === "no_answer") return "err";
  return "muted";
};
