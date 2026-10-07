import type { AwcMessengerTimelineEntry } from "@/features/projects/messenger/types/awcProjectMessenger.type";

/** True when History/Dispatch marks an AI-session row (or legacy kind subtype). */
export const isMessengerAiSessionEntry = (
  entry: AwcMessengerTimelineEntry,
): boolean =>
  entry.entryKind === "session" || entry.kind === "ai.session";
