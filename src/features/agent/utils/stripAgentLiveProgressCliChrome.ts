import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { AGENT_LIVE_PROGRESS_CLI_COMMAND_LINE_PATTERN } from "@/features/agent/utils/agentLiveProgressPatterns.constant";
import { stripAgentLiveProgressCheckpointFromOutput } from "@/features/agent/utils/stripAgentLiveProgressCheckpointFromOutput";
import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";
import { stripAgentRunWorkingEstimateFromOutput } from "@/features/agent/utils/stripAgentRunWorkingEstimateFromOutput";
import { stripNextActionsFromTerminalOutput } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

export const stripAgentLiveProgressCliChrome = (output: string): string =>
  stripAgentLiveProgressCheckpointFromOutput(
    stripAgentRunWorkingEstimateFromOutput(
      stripAgentRunProgressFromOutput(
        stripNextActionsFromTerminalOutput(output),
      ),
    ),
  )
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.length === 0) {
        return false;
      }
      if (trimmed === AGENT_LIVE_BASH_PROMPT.trim()) {
        return false;
      }
      if (AGENT_LIVE_PROGRESS_CLI_COMMAND_LINE_PATTERN.test(trimmed)) {
        return false;
      }
      if (/^Preparing .+ CLI on your Mac/i.test(trimmed)) {
        return false;
      }
      if (/ is ready on your Mac\.?$/i.test(trimmed)) {
        return false;
      }
      if (/^Send a task from the box below/i.test(trimmed)) {
        return false;
      }
      if (/^\d+\.\d+\.\d+\s*\(Claude Code\)/i.test(trimmed)) {
        return false;
      }
      return true;
    })
    .join("\n")
    .trim();
