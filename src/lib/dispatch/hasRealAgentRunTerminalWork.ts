import { AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER } from "@agent-witch/shared/dispatch";

import { isStoppedByUserOutput } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { AGENT_RUN_WORKING_ESTIMATE_MARKER } from "@/lib/dispatch/agentRunWorkingEstimate.constant";
import { isClaudeCliAuthBlockerInOutput } from "@/lib/dispatch/isClaudeCliAuthBlockerInOutput";
import { isClaudeCliNonWorkErrorJsonLine } from "@/lib/dispatch/isClaudeCliNonWorkErrorJsonLine";
import {
  isAgentRunBareShellPromptLine,
  isAgentRunSpawnFailureLine,
  isAgentRunWriterCliInvocationLine,
} from "@/lib/dispatch/isAgentRunTerminalChromeLine";
import {
  MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_EMPTY_CATALOG,
  MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_MISSING_KEY,
} from "@/lib/marketplace/runRecipe/marketplacePlanEstimateReasonCode.constant";

const MARKETPLACE_PLAN_ESTIMATE_MARKER = "[[MARKETPLACE_PLAN_ESTIMATE]]";

const stripWorkingEstimateBlock = (output: string): string => {
  if (!output.includes(AGENT_RUN_WORKING_ESTIMATE_MARKER)) {
    return output;
  }
  const markerIndex = output.indexOf(AGENT_RUN_WORKING_ESTIMATE_MARKER);
  const afterMarker = output.slice(
    markerIndex + AGENT_RUN_WORKING_ESTIMATE_MARKER.length,
  );
  const nextNewline = afterMarker.indexOf("\n");
  const afterSeconds =
    nextNewline >= 0 ? afterMarker.slice(nextNewline + 1) : "";
  return `${output.slice(0, markerIndex)}${afterSeconds}`;
};

const stripSingleHonestyDiagnosticBlock = (
  output: string,
  marker: string,
): string => {
  const markerIndex = output.indexOf(marker);
  if (markerIndex < 0) {
    return output;
  }
  const afterMarker = output.slice(markerIndex + marker.length);
  const lines = afterMarker.split("\n");
  const skipLines = lines.findIndex((line) => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !/^[a-zA-Z]+=/.test(trimmed);
  });
  const consumedLines = skipLines < 0 ? lines.length : Math.max(skipLines, 0);
  const blockEnd =
    markerIndex +
    marker.length +
    lines.slice(0, consumedLines).join("\n").length;
  return `${output.slice(0, markerIndex)}${output.slice(blockEnd)}`;
};

const stripHonestyDiagnosticBlocks = (output: string): string =>
  [
    MARKETPLACE_PLAN_ESTIMATE_MARKER,
    AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
  ].reduce(
    (remaining, marker) => stripSingleHonestyDiagnosticBlock(remaining, marker),
    output,
  );

const stripAuthAndFallbackLogNoise = (output: string): string => {
  const lines = output.split("\n");
  const spawnFailed = lines.some((line) =>
    isAgentRunSpawnFailureLine(line.trim()),
  );

  return lines
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.length === 0) {
        return false;
      }
      if (isClaudeCliAuthBlockerInOutput(trimmed)) {
        return false;
      }
      if (isClaudeCliNonWorkErrorJsonLine(trimmed)) {
        return false;
      }
      if (
        trimmed === MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_MISSING_KEY ||
        trimmed === MARKETPLACE_PLAN_ESTIMATE_LOG_CLI_FALLBACK_EMPTY_CATALOG
      ) {
        return false;
      }
      if (trimmed.startsWith("[agent-witch] marketplace plan/estimate")) {
        return false;
      }
      if (isAgentRunBareShellPromptLine(trimmed)) {
        return false;
      }
      if (isAgentRunSpawnFailureLine(trimmed)) {
        return false;
      }
      if (spawnFailed && isAgentRunWriterCliInvocationLine(trimmed)) {
        return false;
      }
      return true;
    })
    .join("\n");
};

export const hasRealAgentRunTerminalWork = (output: string): boolean => {
  const withoutDiagnostics = stripHonestyDiagnosticBlocks(output);
  const withoutEstimate = stripWorkingEstimateBlock(withoutDiagnostics);
  const withoutStopped = isStoppedByUserOutput(withoutEstimate)
    ? withoutEstimate.replace(/Stopped by user\.?/gi, "")
    : withoutEstimate;
  const withoutAuthNoise = stripAuthAndFallbackLogNoise(withoutStopped);
  return withoutAuthNoise.trim().length > 0;
};
