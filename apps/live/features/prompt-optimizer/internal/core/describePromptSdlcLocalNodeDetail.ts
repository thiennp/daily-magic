import {
  readPromptSdlcEndStepFailureMessage,
  selectPromptSdlcBestPrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcStep } from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcLocalUnusableReplyPreview } from "./readPromptSdlcLocalUnusableReplyPreview";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";
import { renderPromptSdlcWizardStepModalBody } from "./renderPromptSdlcWizardStepModalBody";

export interface PromptSdlcLocalNodeDetail {
  readonly title: string;
  readonly goal: string | null;
  readonly scoreLabel: string | null;
  readonly feedback: string | null;
  readonly promptText: string | null;
  readonly promptNote: string | null;
  readonly bodyHtml: string | null;
}

const roundFromStepId = (id: string): number | null => {
  const match = /^(?:round|score)-(\d+)$/.exec(id);
  if (match === null) {
    return null;
  }
  const round = Number(match[1]);
  return Number.isInteger(round) ? round : null;
};

const readCycleGoal = (cycle: PromptSdlcLocalCycle): string | null => {
  const trimmed = cycle.goal.trim();
  return trimmed.length === 0 ? null : trimmed;
};

const detailForPrompt = (
  title: string,
  promptText: string,
  score: number | null,
  feedback: string | null,
  goal: string | null,
): PromptSdlcLocalNodeDetail => {
  const promptNote = describePromptSdlcWriterTerminalFailure(promptText);
  return {
    title,
    goal,
    scoreLabel: score === null ? null : `Score ${score} / 100`,
    feedback,
    promptText: promptNote === null ? promptText : null,
    promptNote,
    bodyHtml: null,
  };
};

export const describePromptSdlcLocalNodeDetail = (
  cycle: PromptSdlcLocalCycle,
  step: PromptSdlcStep,
): PromptSdlcLocalNodeDetail => {
  const goal = readCycleGoal(cycle);
  if (step.id.startsWith("wizard-")) {
    const bodyHtml = renderPromptSdlcWizardStepModalBody(cycle, step.id);
    return {
      title: step.label,
      goal,
      scoreLabel: null,
      feedback: step.detail,
      promptText: null,
      promptNote: null,
      bodyHtml: bodyHtml.trim().length === 0 ? null : bodyHtml,
    };
  }
  if (step.id === "end") {
    const failureMessage = readPromptSdlcEndStepFailureMessage(cycle, step);
    if (failureMessage !== null) {
      const replyPreview = readPromptSdlcLocalUnusableReplyPreview(cycle);
      return {
        title: step.label,
        goal,
        scoreLabel: null,
        feedback: failureMessage,
        promptText: replyPreview,
        promptNote: null,
        bodyHtml: null,
      };
    }
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
        goal,
        scoreLabel: null,
        feedback: cycle.errorMessage,
        promptText: null,
        promptNote: null,
        bodyHtml: null,
      };
    }
    return detailForPrompt(
      step.label,
      best.promptText,
      best.score,
      best.reasons,
      goal,
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
      goal,
      scoreLabel: null,
      feedback: step.detail,
      promptText: null,
      promptNote: null,
      bodyHtml: null,
    };
  }

  return detailForPrompt(
    step.label,
    revision.promptText,
    revision.judgement?.score ?? null,
    revision.judgement?.reasons ?? step.detail,
    goal,
  );
};
