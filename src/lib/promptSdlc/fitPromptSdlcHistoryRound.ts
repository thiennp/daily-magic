import type { PromptSdlcPriorRound } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";

const MINIMUM_HISTORY_SLICE = 24;

export interface PromptSdlcHistoryFit {
  readonly used: number;
  readonly compact: readonly string[];
  readonly prompts: readonly string[];
  readonly stop: boolean;
}

const fitHistoryText = (text: string, room: number): string | null => {
  if (room <= 0) {
    return null;
  }
  if (text.length <= room) {
    return text;
  }
  if (room < MINIMUM_HISTORY_SLICE) {
    return null;
  }
  return `${text.slice(0, room - 1)}…`;
};

export const fitPromptSdlcHistoryRound = (
  state: PromptSdlcHistoryFit,
  round: PromptSdlcPriorRound,
  budget: number,
  includePrompts: boolean,
): PromptSdlcHistoryFit => {
  if (state.stop) {
    return state;
  }

  const line = `Round ${round.roundNumber} scored ${round.score}. ${round.reasons}`;
  const fittedLine = fitHistoryText(line, budget - state.used);
  if (fittedLine === null) {
    return { ...state, stop: true };
  }

  const withLine: PromptSdlcHistoryFit = {
    used: state.used + fittedLine.length + 1,
    compact: [...state.compact, fittedLine],
    prompts: state.prompts,
    stop: fittedLine.length < line.length,
  };
  if (withLine.stop || !includePrompts) {
    return withLine;
  }

  const block = `Round ${round.roundNumber} prompt:\n${round.promptText.trim()}`;
  const fittedBlock = fitHistoryText(block, budget - withLine.used);
  if (fittedBlock === null) {
    return withLine;
  }

  return {
    used: withLine.used + fittedBlock.length + 1,
    compact: withLine.compact,
    prompts: [...withLine.prompts, fittedBlock],
    stop: fittedBlock.length < block.length,
  };
};
