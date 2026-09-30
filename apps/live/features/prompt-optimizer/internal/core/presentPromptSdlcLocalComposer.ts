import { pickMacOsFolderDialog } from "../../../projects/public-api/infrastructure";
import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";

import { buildPromptSdlcLiveRunFragmentHtml } from "./buildPromptSdlcLiveRunFragmentHtml";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import { sendPromptSdlcLocalPage } from "./sendPromptSdlcLocalPage";
import type { PromptSdlcLocalModelSelection } from "./promptSdlcLocalForm";
import {
  readPromptSdlcLocalCycle,
  readPromptSdlcLocalCycles,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import { displayPromptSdlcLocalFolder } from "./promptSdlcLocalFolder";
import {
  freshPromptSdlcLocalComposerDefaults,
  rememberPromptSdlcLocalPostedSelection,
} from "./promptSdlcLocalPreferences";
import { readPromptSdlcFolderSkill } from "./readPromptSdlcFolderSkills";
import { readPromptSdlcChosenWritersReady } from "./probePromptSdlcWriterReady";
import { findResumablePromptSdlcWizardCycle } from "./findResumablePromptSdlcWizardCycle";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const presentPromptSdlcLocalComposer = async (input: {
  readonly route: PromptSdlcLocalRouteInput;
  readonly posted: URLSearchParams | null;
  readonly installedIds: readonly string[];
  readonly selection: PromptSdlcLocalModelSelection;
  readonly goal: string;
  readonly prompt: string;
  readonly skillNotice: string | null;
  readonly cycleId: string | null;
}): Promise<void> => {
  const fresh =
    input.posted === null
      ? freshPromptSdlcLocalComposerDefaults({
          storePath: input.route.storePath,
          installedIds: input.installedIds,
          selection: input.selection,
        })
      : null;
  const decision = decidePromptSdlcLocalPost({
    posted: input.posted,
    installedIds: input.installedIds,
    selection: fresh?.selection ?? input.selection,
    goal: input.goal,
    prompt: input.prompt,
    pickFolder: () =>
      pickMacOsFolderDialog("Choose the folder this prompt should run in"),
    ...(fresh === null ? {} : { defaultFolder: fresh.defaultFolder }),
  });

  if (input.posted !== null) {
    rememberPromptSdlcLocalPostedSelection({
      storePath: input.route.storePath,
      installedIds: input.installedIds,
      posted: input.posted,
      folder:
        decision.kind === "start"
          ? displayPromptSdlcLocalFolder(decision.workingDirectory)
          : decision.folder,
    });
    if (input.posted.get("intent") === "remember") {
      input.route.response.writeHead(204);
      input.route.response.end();
      return;
    }
  }
  const writerBlock =
    decision.kind === "start"
      ? await readPromptSdlcChosenWritersReady(
          input.route.storePath,
          decision.judge,
          decision.improver,
          decision.useWizard ? decision.runner : undefined,
        )
      : null;
  if (decision.kind === "start" && writerBlock !== null) {
    await sendPromptSdlcLocalPage(input.route, {
      goal: decision.goal,
      prompt: decision.prompt,
      modelNote: input.selection.note,
      writers: input.selection.writers,
      judge: decision.judge,
      improver: decision.improver,
      judgeInstructions: decision.judgeInstructions,
      improverInstructions: decision.improverInstructions,
      folder: displayPromptSdlcLocalFolder(decision.workingDirectory),
      passScore: String(decision.passScore),
      maxRounds: String(decision.maxRounds),
      canRun: true,
      errorMessage: writerBlock,
      skillNotice: input.skillNotice,
      cycle: null,
      history: readPromptSdlcLocalCycles(input.route.storePath),
      resumableWizardCycle: findResumablePromptSdlcWizardCycle(
        readPromptSdlcLocalCycles(input.route.storePath),
        null,
      ),
    });
    return;
  }

  if (decision.kind === "start") {
    const sourceSkill = readPromptSdlcFolderSkill(
      decision.workingDirectory,
      decision.sourceSkillFile,
    );
    const cycle = createPromptSdlcLocalCycle({
      goal: decision.goal,
      sourcePrompt: decision.prompt,
      judgeModel: decision.judge,
      improverModel: decision.improver,
      workingDirectory: decision.workingDirectory,
      passScore: decision.passScore,
      maxRounds: decision.maxRounds,
      ...(decision.useWizard
        ? {
            wizard: {
              ...createInitialPromptSdlcWizardState(decision.prompt),
              runnerInstructions: decision.runnerInstructions,
            },
            runnerModel: decision.runner,
          }
        : {}),
      ...(decision.judgeInstructions.length === 0
        ? {}
        : { judgeInstructions: decision.judgeInstructions }),
      ...(decision.improverInstructions.length === 0
        ? {}
        : { improverInstructions: decision.improverInstructions }),
      ...(sourceSkill === null
        ? {}
        : {
            sourceSkill: {
              fileName: sourceSkill.fileName,
              name: sourceSkill.name,
              description: sourceSkill.description,
            },
          }),
    });
    savePromptSdlcLocalCycle(input.route.storePath, cycle);
    ensurePromptSdlcLocalCycleRunning(input.route.storePath, cycle.id);
    const liveFragment =
      input.posted !== null && input.posted.get("liveFragment") === "1";
    if (liveFragment && decision.useWizard) {
      input.route.response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Prompt-Sdlc-Cycle-Id": cycle.id,
      });
      input.route.response.end(
        buildPromptSdlcLiveRunFragmentHtml(input.route.storePath, cycle),
      );
      return;
    }
    input.route.response.writeHead(303, {
      Location: `/prompt-optimizer?cycle=${encodeURIComponent(cycle.id)}`,
    });
    input.route.response.end();
    return;
  }

  const cycle =
    input.cycleId === null
      ? null
      : readPromptSdlcLocalCycle(input.route.storePath, input.cycleId);
  if (cycle !== null) {
    ensurePromptSdlcLocalCycleRunning(input.route.storePath, cycle.id);
  }

  await sendPromptSdlcLocalPage(input.route, {
    goal: decision.goal,
    prompt: decision.prompt,
    modelNote: input.selection.note,
    writers: input.selection.writers,
    judge: decision.judge,
    improver: decision.improver,
    judgeInstructions: decision.judgeInstructions,
    improverInstructions: decision.improverInstructions,
    runner: decision.runner,
    runnerInstructions: decision.runnerInstructions,
    folder: decision.folder,
    passScore: decision.passScore,
    maxRounds: decision.maxRounds,
    canRun: input.selection.canRun,
    errorMessage: decision.errorMessage,
    skillNotice: input.skillNotice,
    cycle,
    history: readPromptSdlcLocalCycles(input.route.storePath),
    resumableWizardCycle: findResumablePromptSdlcWizardCycle(
      readPromptSdlcLocalCycles(input.route.storePath),
      cycle?.id ?? null,
    ),
  });
};
