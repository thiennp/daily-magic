import os from "node:os";

const signalName = (signal: NodeJS.Signals | number): string => {
  if (typeof signal === "string") {
    return signal;
  }
  const match = Object.entries(os.constants.signals).find(
    ([, value]) => value === signal,
  );
  return match?.[0] ?? `signal ${String(signal)}`;
};

export const AGENT_PROCESS_KILLED_PREFIX =
  "The agent process was stopped unexpectedly";

/**
 * c1731750 (Testi recheck @301, seeded `kill -9`): a run whose CLI died on a
 * signal reported "Failed on your computer (exit -1). No agent output was
 * captured." This is the plain reason; null when there was no signal.
 */
export const formatAgentProcessKilledNote = (
  signal: NodeJS.Signals | number | null | undefined,
): string | null =>
  signal === null || signal === undefined || signal === 0
    ? null
    : `${AGENT_PROCESS_KILLED_PREFIX} (killed by ${signalName(signal)}).`;

/** Appends the killed note as the last line (the report's failure line). */
export const appendAgentProcessKilledNote = (
  output: string,
  signal: NodeJS.Signals | number | null | undefined,
): string => {
  const note = formatAgentProcessKilledNote(signal);
  if (note === null) {
    return output;
  }
  const trimmed = output.trim();
  return trimmed.length > 0 ? `${trimmed}\n${note}` : note;
};
