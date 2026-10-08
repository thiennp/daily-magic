import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";

export type WriterPickerStatus = {
  readonly label: "Ready" | "Not signed in" | "Not set up";
  readonly tone: "ok" | "warn";
};

/**
 * 77e29f7a: "Choose an AI on your computer" showed no state, so a signed-out
 * Codex looked as good as a ready Antigravity. Null when the computer never
 * reported the tool (older host, or Cursor Cloud, which does not run locally).
 */
export const resolveWriterPickerStatus = (
  writerAgent: string,
  writers: readonly AgentWitchDeviceWriter[] | undefined,
): WriterPickerStatus | null => {
  const writer = writers?.find((entry) => entry.writerAgent === writerAgent);
  if (writer === undefined) {
    return null;
  }
  if (writer.loggedIn === false) {
    return { label: "Not signed in", tone: "warn" };
  }
  return writer.ready
    ? { label: "Ready", tone: "ok" }
    : { label: "Not set up", tone: "warn" };
};
