import {
  buildPromptSdlcWizardStepIndex,
  isPromptSdlcTerminalStatus,
  summarizePromptSdlcWizardCompletion,
  readPromptSdlcWizardModulePassScore,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  labelPromptSdlcLocalModel,
  PROMPT_SDLC_MANUAL_ACTOR,
} from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { describeUnusableJudgeReplyCause } from "./describeUnusableJudgeReplyCause";
import { readPromptSdlcLocalUnusableReplyPreview } from "./readPromptSdlcLocalUnusableReplyPreview";
import { describePromptSdlcWriterTerminalFailure } from "./readPromptSdlcWriterOutput";
import { labelPromptSdlcErrorKind } from "./labelPromptSdlcErrorKind";

export type PromptSdlcLocalActivityDescription = {
  readonly title: string;
  readonly detail: string;
  readonly replyPreview: string | null;
};

const WIZARD_STEP_SHORT_LABELS = [
  "Generalize",
  "Evaluate",
  "Separate",
  "Optimize modules",
] as const;

const wizardFailedActivityTitle = (
  wizard: NonNullable<PromptSdlcLocalCycle["wizard"]>,
): string => {
  const index = buildPromptSdlcWizardStepIndex(wizard);
  const short =
    index >= 0 && index < WIZARD_STEP_SHORT_LABELS.length
      ? WIZARD_STEP_SHORT_LABELS[index]
      : null;
  return short === null
    ? "Wizard failed."
    : `Step ${index + 1} — ${short} failed`;
};

const unusableReplyActivity = (
  cycle: PromptSdlcLocalCycle,
  input: {
    readonly title: string;
    readonly detail: string;
  },
): PromptSdlcLocalActivityDescription => {
  const replyPreview = readPromptSdlcLocalUnusableReplyPreview(cycle);
  const cause =
    replyPreview === null
      ? null
      : describeUnusableJudgeReplyCause(replyPreview);
  const detail =
    cause === null
      ? input.detail
      : input.detail.length === 0
        ? cause
        : `${input.detail} ${cause}`;
  return {
    title: input.title,
    detail,
    replyPreview,
  };
};

const liveActivity = (
  title: string,
  detail: string,
): PromptSdlcLocalActivityDescription => ({
  title,
  detail,
  replyPreview: null,
});

export const describePromptSdlcLocalActivity = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalActivityDescription => {
  if (cycle.status === "wizard_paused") {
    const message = cycle.errorMessage?.trim() ?? "";
    return {
      title: "Wizard paused.",
      detail:
        message.length > 0
          ? message
          : "Review the step above, then Continue or rerun with feedback.",
      replyPreview: null,
    };
  }
  if (
    cycle.wizard !== undefined &&
    cycle.wizard.gate === null &&
    cycle.wizard.phase === "separate" &&
    cycle.wizard.splitOptions.length === 0 &&
    !isPromptSdlcTerminalStatus(cycle.status)
  ) {
    const writer = cycle.judgeModel;
    return liveActivity(
      `${labelPromptSdlcLocalModel(writer)} is suggesting module splits.`,
      "This panel keeps updating while the writer works on this Mac.",
    );
  }
  if (
    cycle.wizard !== undefined &&
    cycle.wizard.gate === null &&
    cycle.wizard.phase === "generalize" &&
    !isPromptSdlcTerminalStatus(cycle.status)
  ) {
    const writer = cycle.judgeModel;
    return liveActivity(
      `${labelPromptSdlcLocalModel(writer)} is generalizing your prompt.`,
      "This panel keeps updating while the writer works on this Mac.",
    );
  }
  if (cycle.status === "judging" && cycle.judgePromptTextOnly === true) {
    if (cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR) {
      return liveActivity(
        `Score the prompt text for round ${cycle.currentRound + 1}.`,
        "Wizard step 2 scores the prompt wording only. The runner executes modules in step 4.",
      );
    }
    if (cycle.judgePhase === "scoring") {
      return liveActivity(
        `${labelPromptSdlcLocalModel(cycle.judgeModel)} is scoring the prompt text for round ${cycle.currentRound + 1}.`,
        "No folder run in step 2. This panel keeps updating, so the page is not stuck.",
      );
    }
    return liveActivity(
      `${labelPromptSdlcLocalModel(cycle.judgeModel)} is scoring the prompt text for round ${cycle.currentRound + 1}.`,
      "Wizard evaluate revises prompt wording before the runner executes in step 4.",
    );
  }
  if (
    cycle.status === "judging" &&
    cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR
  ) {
    const ran = cycle.revisions.some(
      (revision) =>
        revision.roundNumber === cycle.currentRound &&
        revision.run !== undefined,
    );
    if (!ran && cycle.improverModel !== PROMPT_SDLC_MANUAL_ACTOR) {
      return liveActivity(
        `${labelPromptSdlcLocalModel(cycle.improverModel)} is running the prompt for round ${cycle.currentRound + 1}.`,
        "You score the changes after this run.",
      );
    }
    return liveActivity(
      `Score the changes from round ${cycle.currentRound + 1}.`,
      ran
        ? "Score the changes below. Weigh the tokens and the delay."
        : "Choose a writer as the judge so this Mac can run the prompt.",
    );
  }
  if (cycle.status === "judging" && cycle.judgePhase === "reviewing") {
    return liveActivity(
      `${labelPromptSdlcLocalModel(cycle.judgeModel)} is checking the tokens for round ${cycle.currentRound + 1}.`,
      "A separate pass reads the token spend and suggests what to cut before the improver runs. This panel keeps updating, so the page is not stuck.",
    );
  }
  if (cycle.status === "judging" && cycle.judgePhase === "scoring") {
    const wizard = cycle.wizard;
    if (
      wizard !== undefined &&
      (wizard.gate === "optimize_modules" ||
        wizard.phase === "optimize_modules")
    ) {
      const runner = cycle.runnerModel ?? cycle.judgeModel;
      const moduleIndex = wizard.currentModuleIndex + 1;
      const moduleTotal = wizard.modules.length;
      const modulePassScore = readPromptSdlcWizardModulePassScore(wizard);
      return liveActivity(
        `${labelPromptSdlcLocalModel(runner)} is scoring module ${moduleIndex} of ${moduleTotal}.`,
        `Step 4 runs one trial per module (pass ≥ ${modulePassScore}). This panel keeps updating.`,
      );
    }
    return liveActivity(
      `${labelPromptSdlcLocalModel(cycle.judgeModel)} is scoring the changes from round ${cycle.currentRound + 1}.`,
      "The score uses the git changes or the files the prompt names. This panel keeps updating, so the page is not stuck.",
    );
  }
  if (cycle.status === "judging") {
    const wizard = cycle.wizard;
    if (
      wizard !== undefined &&
      (wizard.gate === "optimize_modules" ||
        wizard.phase === "optimize_modules")
    ) {
      const runner = cycle.runnerModel ?? cycle.judgeModel;
      const moduleIndex = wizard.currentModuleIndex + 1;
      const moduleTotal = wizard.modules.length;
      const modulePassScore = readPromptSdlcWizardModulePassScore(wizard);
      return liveActivity(
        `${labelPromptSdlcLocalModel(runner)} is running module ${moduleIndex} of ${moduleTotal}.`,
        `The runner executes the module prompt; the judge scores output (pass ≥ ${modulePassScore}). This panel keeps updating.`,
      );
    }
    return liveActivity(
      `${labelPromptSdlcLocalModel(cycle.judgeModel)} is running the prompt for round ${cycle.currentRound + 1}.`,
      "The judge runs the prompt, then reads the changes, then checks the tokens. This panel keeps updating, so the page is not stuck.",
    );
  }
  if (
    cycle.status === "improving" &&
    cycle.improverModel === PROMPT_SDLC_MANUAL_ACTOR
  ) {
    const judgement = cycle.revisions.find(
      (revision) => revision.roundNumber === cycle.currentRound,
    )?.judgement;
    const reason = judgement?.reasons?.trim() ?? "";
    return liveActivity(
      "Rewrite the prompt.",
      judgement?.score === null ||
        judgement?.score === undefined ||
        reason.length === 0
        ? "Write the next prompt yourself."
        : `Score ${judgement.score} / 100. ${reason}`,
    );
  }
  if (cycle.status === "improving") {
    return liveActivity(
      `${labelPromptSdlcLocalModel(cycle.improverModel)} is rewriting the prompt.`,
      "That writer is working on this Mac. This panel keeps updating, so the page is not stuck.",
    );
  }
  if (cycle.status === "passed") {
    return { title: "This prompt passed.", detail: "", replyPreview: null };
  }
  if (cycle.status === "stopped") {
    const writerFailed = cycle.revisions.some(
      (revision) =>
        describePromptSdlcWriterTerminalFailure(revision.promptText) !== null,
    );
    const message = cycle.errorMessage?.trim() ?? "";
    if (cycle.wizard !== undefined) {
      const summary = summarizePromptSdlcWizardCompletion(cycle.wizard);
      const modulesDone =
        summary.totalModules > 0 &&
        (cycle.wizard.phase === "complete" ||
          summary.passedModuleCount > 0 ||
          isPromptSdlcTerminalStatus(cycle.status));
      const skillPending =
        cycle.wizard.additionalSkillSuggestionsStatus === "pending";
      const title =
        modulesDone && summary.totalModules > 0
          ? `Wizard finished — ${summary.passedModuleCount}/${summary.totalModules} modules passed`
          : "Wizard stopped before all steps finished";
      const skillDetail = skillPending
        ? "The judge is reading the run summary and suggesting additional skills."
        : "";
      return {
        title,
        detail:
          message.length > 0
            ? message
            : skillDetail.length > 0
              ? skillDetail
              : modulesDone
                ? ""
                : "Progress from finished steps is kept.",
        replyPreview: null,
      };
    }
    const finished = (cycle.errorMessage ?? "").startsWith("Finished");
    const stoppedDetail =
      message.length > 0
        ? message
        : writerFailed
          ? "The improver returned a terminal error instead of a prompt, so the later scores are 0. This run is listed in History."
          : "The best prompt is kept.";
    return writerFailed
      ? unusableReplyActivity(cycle, {
          title: finished ? "Finished." : "Stopped.",
          detail: stoppedDetail,
        })
      : {
          title: finished ? "Finished." : "Stopped.",
          detail: stoppedDetail,
          replyPreview: null,
        };
  }
  if (cycle.status === "failed") {
    const message = cycle.errorMessage?.trim() ?? "";
    const wizard = cycle.wizard;
    const kindLabel = labelPromptSdlcErrorKind(cycle.errorKind);
    const fallbackDetail =
      "A writer or judge reply could not be used. Start a new run after fixing the issue.";
    const kindSuffix =
      kindLabel === null ? "" : ` (${kindLabel} — not success)`;
    if (wizard !== undefined) {
      return unusableReplyActivity(cycle, {
        title: `${wizardFailedActivityTitle(wizard)}${kindSuffix}`,
        detail: message.length > 0 ? message : fallbackDetail,
      });
    }
    return unusableReplyActivity(cycle, {
      title:
        kindLabel !== null
          ? `This run failed — ${kindLabel}.`
          : "This run failed.",
      detail:
        message.length > 0
          ? message
          : "A writer or judge reply could not be used.",
    });
  }
  if (isPromptSdlcTerminalStatus(cycle.status)) {
    const message = cycle.errorMessage?.trim() ?? "";
    return unusableReplyActivity(cycle, {
      title: "This run stopped because a reply could not be used.",
      detail:
        message.length > 0
          ? message
          : "A writer or judge reply could not be used.",
    });
  }
  return {
    title: "Working on this Mac.",
    detail: "This panel keeps updating.",
    replyPreview: null,
  };
};
