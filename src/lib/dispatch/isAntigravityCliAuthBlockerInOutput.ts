const ANTIGRAVITY_CLI_AUTH_BLOCKER_PATTERNS: readonly RegExp[] = [
  /not authenticated/i,
  /authentication required/i,
  /sign[- ]?in required/i,
  /login required/i,
  /oauth token.*(?:missing|expired|invalid)/i,
  /run\s+agy\b[^\n]{0,80}sign[- ]?in/i,
];

export const isAntigravityCliAuthBlockerInOutput = (output: string): boolean =>
  ANTIGRAVITY_CLI_AUTH_BLOCKER_PATTERNS.some((pattern) => pattern.test(output));
