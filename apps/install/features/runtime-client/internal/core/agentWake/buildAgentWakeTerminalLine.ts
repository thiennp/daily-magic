export const AGENT_WAKE_LINE_SUMMARY_MAX = 200;
export const AGENT_WAKE_LINE_KIND_MAX = 40;

// C0/C1 controls (incl. ESC, CR, LF, DEL) and Unicode line/paragraph separators.
const isControlCode = (code: number): boolean =>
  code <= 0x1f ||
  (code >= 0x7f && code <= 0x9f) ||
  code === 0x2028 ||
  code === 0x2029;

const replaceControls = (value: string): string =>
  Array.from(value)
    .map((char) => (isControlCode(char.charCodeAt(0)) ? " " : char))
    .join("");

const cleanSummary = (value: string): string =>
  replaceControls(value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, AGENT_WAKE_LINE_SUMMARY_MAX);

const cleanKind = (value: string): string =>
  value.replace(/[^A-Za-z0-9._-]/g, "").slice(0, AGENT_WAKE_LINE_KIND_MAX);

/**
 * The single line typed into the agent's terminal (no trailing Enter). Built
 * only from the server's kind/summary: control characters and newlines are
 * stripped so the text can never carry escape sequences or a second command.
 */
export const buildAgentWakeTerminalLine = (input: {
  readonly kind: string;
  readonly summary: string;
}): string => {
  const kind = cleanKind(input.kind) || "message";
  const summary = cleanSummary(input.summary);
  const body = summary === "" ? kind : `${kind}: ${summary}`;
  return `[AgentWitch] ${body} — check your AgentWitch inbox`;
};
