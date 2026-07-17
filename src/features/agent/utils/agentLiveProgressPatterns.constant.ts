export const AGENT_LIVE_PROGRESS_CLI_COMMAND_LINE_PATTERN =
  /^(?:agent-witch@mac ~ % )?(?:claude|codex|cursor|agy)\b/i;

export const AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS: readonly {
  readonly id: string;
  readonly label: string;
  readonly pattern: RegExp;
}[] = [
  {
    id: "reading",
    label: "Reading files and requirements",
    pattern: /\b(read|reading|open(ed|ing)?|inspect)/i,
  },
  {
    id: "searching",
    label: "Searching your project",
    pattern: /\b(search|searching|grep|find|look(ing)? for)\b/i,
  },
  {
    id: "writing",
    label: "Writing changes",
    pattern: /\b(writ(e|ing)|edit(ing)?|creat(e|ing)|updat(e|ing)|save)\b/i,
  },
  {
    id: "checking",
    label: "Running checks",
    pattern: /\b(test|lint|typecheck|build|verify|check)\b/i,
  },
];
