import { sanitizeAgentRunTextForDisplay } from "@/features/agent/utils/sanitizeAgentRunTextForDisplay";

const PROMPT_ECHO = /^agent-witch@(?:mac|linux)\s+~\s+[%$]/;
const PREPARING = /^Preparing \S.* for this session/i;
const MAX_LINES = 8;

/**
 * 73181622 (B1): the floater only said "Failed — This run failed on your
 * computer." The plain reason is the run's last output lines without the
 * command echo, CLI chrome, markers or ANSI. Null when nothing is left.
 */
export const resolveAgentLiveFailureDetails = (
  output: string,
): string | null => {
  const lines = sanitizeAgentRunTextForDisplay(output)
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 0 && !PROMPT_ECHO.test(line) && !PREPARING.test(line),
    )
    .filter((line, index, all) => index === 0 || line !== all[index - 1]);
  return lines.length === 0 ? null : lines.slice(-MAX_LINES).join("\n");
};
