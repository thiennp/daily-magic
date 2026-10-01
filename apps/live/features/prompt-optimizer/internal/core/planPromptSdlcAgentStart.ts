import {
  PROMPT_SDLC_AGENT_MANUAL_ERROR,
  type PromptSdlcCostControls,
} from "../../../../adapters/promptSdlcAwcCore";
import {
  PROMPT_SDLC_MANUAL_ACTOR,
  type PromptSdlcLocalActor,
} from "./choosePromptSdlcLocalModels";
import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import {
  describePromptSdlcLocalModels,
  type PromptSdlcLocalWriterChoice,
} from "./promptSdlcLocalForm";
import type { PromptSdlcAgentBody } from "./parsePromptSdlcAgentBody";

const writerIds = (writers: readonly PromptSdlcLocalWriterChoice[]): string =>
  writers.map((writer) => writer.id).join(", ");

export const planPromptSdlcAgentStart = (input: {
  readonly body: PromptSdlcAgentBody;
  readonly installedIds: readonly string[];
}):
  | {
      readonly ok: true;
      readonly goal: string;
      readonly prompt: string;
      readonly judge: PromptSdlcLocalActor;
      readonly improver: PromptSdlcLocalActor;
      readonly runner: PromptSdlcLocalActor;
      readonly workingDirectory: string;
      readonly passScore: number;
      readonly maxRounds: number;
      readonly costControls: PromptSdlcCostControls;
    }
  | {
      readonly ok: false;
      readonly error: string;
      readonly installedWriters: readonly PromptSdlcLocalWriterChoice[];
    } => {
  const selection = describePromptSdlcLocalModels(input.installedIds);
  const soleWriter =
    selection.writers.length === 1 ? selection.writers[0].id : null;
  const judge = input.body.judge ?? soleWriter;
  const improver = input.body.improver ?? soleWriter;
  if (
    judge === PROMPT_SDLC_MANUAL_ACTOR ||
    improver === PROMPT_SDLC_MANUAL_ACTOR
  ) {
    return {
      ok: false,
      error: PROMPT_SDLC_AGENT_MANUAL_ERROR,
      installedWriters: selection.writers,
    };
  }
  if (judge === null || improver === null) {
    const installed = writerIds(selection.writers);
    return {
      ok: false,
      error:
        installed.length === 0
          ? "No reasoning writer is installed on this Mac."
          : `Set judge and improver to installed writer ids: ${installed}.`,
      installedWriters: selection.writers,
    };
  }

  const posted = new URLSearchParams({
    intent: "run",
    goal: input.body.goal,
    prompt: input.body.prompt,
    folder: input.body.workingDirectory,
    judge,
    improver,
    runner: judge,
  });
  if (input.body.maxTrials != null) {
    posted.set("maxTrials", String(input.body.maxTrials));
  }
  if (input.body.maxSpendUsd != null) {
    posted.set("maxSpendUsd", String(input.body.maxSpendUsd));
  }
  // Default early-stop ON for agents (compose checkbox default). Explicit false omits the flag.
  if (input.body.earlyStop !== false) {
    posted.set("earlyStop", "on");
  }
  if (input.body.earlyStopFlatRounds != null) {
    posted.set("earlyStopFlatRounds", String(input.body.earlyStopFlatRounds));
  }

  const decision = decidePromptSdlcLocalPost({
    posted,
    installedIds: input.installedIds,
    selection,
    goal: input.body.goal,
    prompt: input.body.prompt,
    pickFolder: () => null,
  });
  if (decision.kind === "form") {
    return {
      ok: false,
      error: decision.errorMessage ?? selection.note,
      installedWriters: selection.writers,
    };
  }

  return {
    ok: true,
    goal: decision.goal,
    prompt: decision.prompt,
    judge: decision.judge,
    improver: decision.improver,
    runner: decision.runner as PromptSdlcLocalActor,
    workingDirectory: decision.workingDirectory,
    passScore: decision.passScore,
    maxRounds: decision.maxRounds,
    costControls: decision.costControls,
  };
};
