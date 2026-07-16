import { AGENT_LIVE_BASH_PROMPT } from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { AGENT_RUN_NEXT_ACTIONS_MARKER } from "@/lib/dispatch/agentRunNextActions.constant";

const MAX_NEXT_ACTIONS = 10;
const NEXT_ACTION_LINE_PATTERN = /^\s*(\d{1,2})[.)]\s+(.+)$/;

const partialMarkerSuffixLengths = Array.from(
  { length: AGENT_RUN_NEXT_ACTIONS_MARKER.length - 1 },
  (_, index) => AGENT_RUN_NEXT_ACTIONS_MARKER.length - 1 - index,
);

const stripPartialNextActionsMarker = (text: string): string => {
  const marker = AGENT_RUN_NEXT_ACTIONS_MARKER;
  const fullIndex = text.indexOf(marker);
  if (fullIndex >= 0) {
    return text.slice(0, fullIndex).trimEnd();
  }

  const matchedPartial = partialMarkerSuffixLengths.find((partialLength) =>
    text.endsWith(marker.slice(0, partialLength)),
  );

  if (matchedPartial !== undefined) {
    return text.slice(0, -matchedPartial).trimEnd();
  }

  return text;
};

const stripAllNextActionsBlocks = (text: string): string => {
  const markerIndex = text.indexOf(AGENT_RUN_NEXT_ACTIONS_MARKER);
  if (markerIndex < 0) {
    return stripPartialNextActionsMarker(text);
  }

  return stripAllNextActionsBlocks(text.slice(0, markerIndex).trimEnd());
};

const extractLatestResponseSegment = (output: string): string => {
  const lastPromptIndex = output.lastIndexOf(AGENT_LIVE_BASH_PROMPT);
  if (lastPromptIndex < 0) {
    return output;
  }

  return output.slice(lastPromptIndex + AGENT_LIVE_BASH_PROMPT.length);
};

const parseNextActionsFromBlock = (block: string): readonly string[] => {
  const actions: string[] = [];

  for (const line of block.split(/\r?\n/)) {
    const match = line.match(NEXT_ACTION_LINE_PATTERN);
    if (match === null) {
      continue;
    }

    const actionNumber = Number.parseInt(match[1] ?? "", 10);
    const label = (match[2] ?? "").trim();
    if (
      actionNumber < 1 ||
      actionNumber > MAX_NEXT_ACTIONS ||
      label.length === 0
    ) {
      continue;
    }

    actions.push(label);
    if (actions.length >= MAX_NEXT_ACTIONS) {
      break;
    }
  }

  return actions;
};

export const stripNextActionsFromTerminalOutput = (output: string): string =>
  stripAllNextActionsBlocks(output);

export const parseLatestAgentLiveTerminalNextActions = (
  output: string,
): readonly string[] => {
  const segment = extractLatestResponseSegment(output);
  const markerIndex = segment.indexOf(AGENT_RUN_NEXT_ACTIONS_MARKER);
  if (markerIndex < 0) {
    return [];
  }

  const block = segment
    .slice(markerIndex + AGENT_RUN_NEXT_ACTIONS_MARKER.length)
    .trimStart();

  return parseNextActionsFromBlock(block);
};
