import { selectPromptSdlcBestPrompt } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcStep } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";

export interface PromptSdlcLocalNodeDetail {
  readonly title: string;
  readonly scoreLabel: string | null;
  readonly feedback: string | null;
  readonly promptText: string | null;
  readonly promptNote: string | null;
}

const roundFromStepId = (id: string): number | null => {
  const match = /^(?:round|score)-(\d+)$/.exec(id);
  if (match === null) {
    return null;
  }
  const round = Number(match[1]);
  return Number.isInteger(round) ? round : null;
};

const detailForPrompt = (
  title: string,
  promptText: string,
  score: number | null,
  feedback: string | null,
): PromptSdlcLocalNodeDetail => {
  const promptNote = describePromptSdlcWriterTerminalFailure(promptText);
  return {
    title,
    scoreLabel: score === null ? null : `Score ${score} / 100`,
    feedback,
    promptText: promptNote === null ? promptText : null,
    promptNote,
  };
};

export const describePromptSdlcLocalNodeDetail = (
  cycle: PromptSdlcLocalCycle,
  step: PromptSdlcStep,
): PromptSdlcLocalNodeDetail => {
  if (step.id.startsWith("wizard-")) {
    return {
      title: step.label,
      scoreLabel: null,
      feedback: step.detail,
      promptText: null,
      promptNote: null,
    };
  }
  if (step.id === "end") {
    const best = selectPromptSdlcBestPrompt(
      cycle.revisions.map((revision) => ({
        roundNumber: revision.roundNumber,
        promptText: revision.promptText,
        score: revision.judgement?.score ?? null,
        reasons: revision.judgement?.reasons ?? null,
      })),
    );
    if (best === null) {
      return {
        title: step.label,
        scoreLabel: null,
        feedback: cycle.errorMessage,
        promptText: null,
        promptNote: null,
      };
    }
    return detailForPrompt(
      step.label,
      best.promptText,
      best.score,
      best.reasons,
    );
  }

  const roundNumber =
    step.id === "rewrite" ? cycle.currentRound : roundFromStepId(step.id);
  const revision =
    roundNumber === null
      ? undefined
      : cycle.revisions.find((item) => item.roundNumber === roundNumber);
  if (revision === undefined) {
    return {
      title: step.label,
      scoreLabel: null,
      feedback: step.detail,
      promptText: null,
      promptNote: null,
    };
  }

  return detailForPrompt(
    step.label,
    revision.promptText,
    revision.judgement?.score ?? null,
    revision.judgement?.reasons ?? step.detail,
  );
};
