import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";

const WRITER_LABELS: Readonly<Record<string, string>> = {
  "claude-cli": "Claude Code",
  codex: "Codex",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

/**
 * 5ca01f06: the form said "Computer ready" and Start was enabled while the
 * computer's heartbeat reported the picked coding tool as not set up. Warn
 * before Start and point to sign-in or another tool. Null when the computer
 * never reported tools (older host) or the tool is fine.
 */
export const resolveWriterNotReadyNotice = (input: {
  readonly writerAgent: string;
  readonly writers: readonly AgentWitchDeviceWriter[] | undefined;
  readonly computerName: string;
}): string | null => {
  const writer = input.writers?.find(
    (entry) => entry.writerAgent === input.writerAgent,
  );
  const label = WRITER_LABELS[input.writerAgent];
  if (writer === undefined || label === undefined) {
    return null;
  }
  if (writer.loggedIn === false) {
    return input.writerAgent === "codex"
      ? `Codex isn't signed in on ${input.computerName}. Run codex login in a terminal there, or pick another coding tool.`
      : `${label} isn't signed in on ${input.computerName}. Sign in there, or pick another coding tool.`;
  }
  if (!writer.ready) {
    return `${label} isn't set up on ${input.computerName}. Install and sign in to it there, or pick another coding tool.`;
  }
  return null;
};
