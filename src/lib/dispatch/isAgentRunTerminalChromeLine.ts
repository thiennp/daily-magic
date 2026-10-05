/** Shell or spawn lines that are not agent work. */
export const isAgentRunSpawnFailureLine = (trimmed: string): boolean =>
  /execvp\(\d+\) failed/i.test(trimmed) ||
  /no such file or directory/i.test(trimmed) ||
  /\bENOENT\b/.test(trimmed) ||
  /spawn\s+.+\s+ENOENT/i.test(trimmed) ||
  /\bcommand not found\b/i.test(trimmed) ||
  /-p took ".+" as its prompt/i.test(trimmed) ||
  /attach the prompt to the flag/i.test(trimmed);

export const isAgentRunBareShellPromptLine = (trimmed: string): boolean =>
  /^agent-witch@mac\s+~\s+%\s*$/.test(trimmed);

export const isAgentRunWriterCliInvocationLine = (trimmed: string): boolean =>
  /^(?:agent-witch@mac\s+~\s+%\s+)?(?:claude|codex|cursor|agy)\b/i.test(
    trimmed,
  );
