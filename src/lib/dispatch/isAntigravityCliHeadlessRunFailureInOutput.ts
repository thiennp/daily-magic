const AUTO_DENIED_PATTERN = /\bauto-?denied\b/i;
const NO_OUTPUT_PRODUCED_PATTERN = /\bno output produced\b/i;
const HEADLESS_COMMAND_PERMISSION_PATTERN =
  /headless mode cannot prompt for.*\bcommand\b.*permission/i;
const PERMISSIONS_ALLOW_HINT_PATTERN = /\bpermissions\.allow\b/i;
const JETSKI_NO_OUTPUT_PATTERN = /\bjetski:\s*no output produced\b/i;

export const isAntigravityCliHeadlessPermissionDeniedInOutput = (
  output: string,
): boolean => {
  const normalized = output.trim();
  if (normalized.length === 0) {
    return false;
  }

  return (
    JETSKI_NO_OUTPUT_PATTERN.test(normalized) ||
    (NO_OUTPUT_PRODUCED_PATTERN.test(normalized) &&
      (AUTO_DENIED_PATTERN.test(normalized) ||
        HEADLESS_COMMAND_PERMISSION_PATTERN.test(normalized) ||
        PERMISSIONS_ALLOW_HINT_PATTERN.test(normalized)))
  );
};

export const resolveAntigravityCliHeadlessRunFailureReason = (
  output: string,
): string | null => {
  if (isAntigravityCliHeadlessPermissionDeniedInOutput(output)) {
    const line =
      output
        .split(/\r?\n/)
        .map((entry) => entry.trim())
        .find(
          (entry) =>
            entry.length > 0 &&
            (JETSKI_NO_OUTPUT_PATTERN.test(entry) ||
              NO_OUTPUT_PRODUCED_PATTERN.test(entry)),
        ) ?? output.trim();
    return line.length > 0
      ? line
      : "Antigravity headless run auto-denied a tool that needs command permission.";
  }

  return null;
};
