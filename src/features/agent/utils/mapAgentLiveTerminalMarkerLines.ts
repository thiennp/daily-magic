import { AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER } from "@/features/agent/utils/agentLiveProgressCheckpoint.constant";
import { AGENT_RUN_PROGRESS_MARKER } from "@/lib/dispatch/agentRunProgress.constant";
import { AGENT_RUN_INPUT_MARKER } from "@/lib/dispatch/agentRunInputGuardrails.constant";

interface MarkerLinesState {
  readonly out: readonly string[];
  readonly skip: number;
  readonly asked: ReadonlySet<string>;
}

const BARE_MARKER = /\[\[[A-Z_]+\]\]/g;

const readCheckpointAnswer = (
  lines: readonly string[],
  index: number,
): { readonly answer: string | null; readonly consumed: number } => {
  const hasQuestion = (lines[index + 1] ?? "").trim().startsWith("Q: ");
  const answerIndex = index + (hasQuestion ? 2 : 1);
  const answerLine = (lines[answerIndex] ?? "").trim();
  return answerLine.startsWith("A: ")
    ? {
        answer: answerLine.replace(/^A:\s*/, "Your answer: "),
        consumed: answerIndex - index,
      }
    : { answer: null, consumed: answerIndex - index - 1 };
};

const mapLine = (
  lines: readonly string[],
  index: number,
): { readonly emit: readonly string[]; readonly skip: number } => {
  const line = lines[index] ?? "";
  const trimmed = line.trim();
  if (trimmed === AGENT_RUN_PROGRESS_MARKER) {
    return { emit: [], skip: 0 };
  }
  if (trimmed === AGENT_RUN_INPUT_MARKER) {
    const question = lines[index + 1];
    return question === undefined
      ? { emit: [], skip: 0 }
      : { emit: [`Agent asks: ${question.trim()}`], skip: 1 };
  }
  if (trimmed === AGENT_LIVE_PROGRESS_CHECKPOINT_QA_MARKER) {
    const { answer, consumed } = readCheckpointAnswer(lines, index);
    return { emit: answer === null ? [] : [answer], skip: consumed };
  }
  const withoutMarkers = line.replace(BARE_MARKER, "");
  return trimmed.length > 0 && withoutMarkers.trim().length === 0
    ? { emit: [], skip: 0 }
    : { emit: [withoutMarkers], skip: 0 };
};

/**
 * 85e73e72 (Testi run 4 @298): turn progress / ask / checkpoint markers into
 * readable terminal lines ("Agent asks: …", "Your answer: …") and drop any
 * other raw [[MARKER]] token.
 */
export const mapAgentLiveTerminalMarkerLines = (
  lines: readonly string[],
): readonly string[] =>
  lines.reduce<MarkerLinesState>(
    (state, _line, index) => {
      if (state.skip > 0) {
        return { ...state, skip: state.skip - 1 };
      }
      const { emit, skip } = mapLine(lines, index);
      // A continuation re-prints the answered ask: show each question once.
      const fresh = emit.filter(
        (line) => !(line.startsWith("Agent asks: ") && state.asked.has(line)),
      );
      return {
        out: [...state.out, ...fresh],
        skip,
        asked: new Set([
          ...state.asked,
          ...fresh.filter((line) => line.startsWith("Agent asks: ")),
        ]),
      };
    },
    { out: [], skip: 0, asked: new Set<string>() },
  ).out;
