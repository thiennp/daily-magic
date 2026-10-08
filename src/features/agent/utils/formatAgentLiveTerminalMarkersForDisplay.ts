import { cleanAgentOutputForUser } from "@/features/agent/utils/cleanAgentOutputForUser";
import { dropRepeatedAgentLiveTerminalParagraphs } from "@/features/agent/utils/dropRepeatedAgentLiveTerminalParagraphs";
import { mapAgentLiveTerminalMarkerLines } from "@/features/agent/utils/mapAgentLiveTerminalMarkerLines";
import { replaceAgentLiveTerminalInterruptedLines } from "@/features/agent/utils/replaceAgentLiveTerminalInterruptedLines";
import { stripAgentRunWavePlanFromOutput } from "@/features/agent/utils/stripAgentRunWavePlanFromOutput";
import { stripAgentRunWorkingEstimateFromOutput } from "@/features/agent/utils/stripAgentRunWorkingEstimateFromOutput";

/**
 * 85e73e72 (Testi run 4 @298): the terminal mirror showed raw wave /
 * progress / ask / checkpoint markers, the checkpoint block twice and raw
 * "error: interrupted". Display only; the stored transcript is unchanged.
 */
export const formatAgentLiveTerminalMarkersForDisplay = (
  output: string,
): string => {
  // Keep the trailing prompt space ("agent-witch@mac ~ % ") the strips trim.
  const trailing = /\s*$/.exec(output)?.[0] ?? "";
  const formatted = replaceAgentLiveTerminalInterruptedLines(
    dropRepeatedAgentLiveTerminalParagraphs(
      mapAgentLiveTerminalMarkerLines(
        stripAgentRunWorkingEstimateFromOutput(
          stripAgentRunWavePlanFromOutput(
            cleanAgentOutputForUser(output, {
              keepMarkers: true,
              keepCliPreamble: true,
            }),
          ),
        ).split(/\r?\n/),
      ),
    ),
  ).join("\n");
  return `${formatted.trimEnd()}${trailing}`;
};
