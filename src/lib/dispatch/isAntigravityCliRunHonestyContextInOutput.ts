const ANTIGRAVITY_ARGV_PARSE_ERROR_SNIPPET =
  '-p took "--dangerously-skip-permissions"';

/** True when terminal output is from an Antigravity (agy) CLI run, not Anthropic Writer API fallback. */
export const isAntigravityCliRunHonestyContextInOutput = (
  output: string,
): boolean => {
  const normalized = output.toLowerCase();
  if (normalized.includes("preparing antigravity")) {
    return true;
  }
  if (normalized.includes("running antigravity")) {
    return true;
  }
  if (output.includes(ANTIGRAVITY_ARGV_PARSE_ERROR_SNIPPET)) {
    return true;
  }
  if (
    /\bagy\b/.test(output) &&
    output.includes("--dangerously-skip-permissions")
  ) {
    return true;
  }
  return false;
};
