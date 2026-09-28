import { pickMacOsFolderDialog } from "../../../projects/public-api/infrastructure";
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
import { readPromptSdlcFolderSkill } from "./readPromptSdlcFolderSkills";
import { readPromptSdlcChosenWritersReady } from "./probePromptSdlcWriterReady";
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
  const decision = decidePromptSdlcLocalPost({
    posted: input.posted,
    installedIds: input.installedIds,
    selection: input.selection,
    goal: input.goal,
    prompt: input.prompt,
    pickFolder: () =>
      pickMacOsFolderDialog("Choose the folder this prompt should run in"),
  });
  const writerBlock =
    decision.kind === "start"
      ? await readPromptSdlcChosenWritersReady(
          input.route.storePath,
          decision.judge,
          decision.improver,
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
    input.route.response.writeHead(303, {
      Location: `/prompt-sdlc?cycle=${encodeURIComponent(cycle.id)}`,
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
    folder: decision.folder,
    passScore: decision.passScore,
    maxRounds: decision.maxRounds,
    canRun: input.selection.canRun,
    errorMessage: decision.errorMessage,
    skillNotice: input.skillNotice,
    cycle,
    history: readPromptSdlcLocalCycles(input.route.storePath),
  });
};
