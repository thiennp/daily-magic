const CLAUDE_CLI_AUTH_BLOCKER_PATTERNS: readonly RegExp[] = [
  /failed to authenticate/i,
  /oauth access token has expired/i,
  /re-authenticate(?:\s+to continue)?/i,
  /api error:\s*401/i,
  /\b401\b[^\n]{0,120}oauth/i,
  /oauth[^\n]{0,120}\b401\b/i,
];

export const isClaudeCliAuthBlockerInOutput = (output: string): boolean =>
  CLAUDE_CLI_AUTH_BLOCKER_PATTERNS.some((pattern) => pattern.test(output));
