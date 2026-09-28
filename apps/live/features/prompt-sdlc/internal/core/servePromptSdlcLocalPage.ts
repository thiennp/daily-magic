import { pickMacOsFolderDialog } from "../../../projects/public-api/infrastructure";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import { redirectAfterPromptSdlcHistoryDelete } from "./redirectAfterPromptSdlcHistoryDelete";
import { sendPromptSdlcLocalPage } from "./sendPromptSdlcLocalPage";
import {
  describePromptSdlcLocalModels,
  readPromptSdlcLocalExampleFields,
} from "./promptSdlcLocalForm";
import {
  readPromptSdlcLocalCycle,
  readPromptSdlcLocalCycles,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import { displayPromptSdlcLocalFolder } from "./promptSdlcLocalFolder";
import { readPromptSdlcChosenWritersReady } from "./probePromptSdlcWriterReady";
import {
  ensurePromptSdlcLocalCycleRunning,
  readPromptSdlcInstalledWriters,
} from "./runPromptSdlcLocalCycle";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const servePromptSdlcLocalPage = async (
  input: PromptSdlcLocalRouteInput,
): Promise<void> => {
  const url = new URL(input.requestUrl, "http://127.0.0.1");
  const installedIds = await readPromptSdlcInstalledWriters();
  const selection = describePromptSdlcLocalModels(installedIds);
  const posted =
    input.method === "POST"
      ? new URLSearchParams(await input.readBody(input.request))
      : null;
  const filled = readPromptSdlcLocalExampleFields(
    url.searchParams.get("example"),
  );
  const goal = posted?.get("goal") ?? filled.goal;
  const prompt = posted?.get("prompt") ?? filled.prompt;
  const deletedTo = redirectAfterPromptSdlcHistoryDelete({
    posted,
    storePath: input.storePath,
    openCycleId: url.searchParams.get("cycle"),
  });
  if (deletedTo !== null) {
    input.response.writeHead(303, { Location: deletedTo });
    input.response.end();
    return;
  }

  const decision = decidePromptSdlcLocalPost({
    posted,
    installedIds,
    selection,
    goal,
    prompt,
    pickFolder: () =>
      pickMacOsFolderDialog("Choose the folder this prompt should run in"),
  });
  const writerBlock =
    decision.kind === "start"
      ? await readPromptSdlcChosenWritersReady(
          input.storePath,
          decision.judge,
          decision.improver,
        )
      : null;
  if (decision.kind === "start" && writerBlock !== null) {
    await sendPromptSdlcLocalPage(input, {
      goal: decision.goal,
      prompt: decision.prompt,
      modelNote: selection.note,
      writers: selection.writers,
      judge: decision.judge,
      improver: decision.improver,
      folder: displayPromptSdlcLocalFolder(decision.workingDirectory),
      passScore: String(decision.passScore),
      canRun: true,
      errorMessage: writerBlock,
      cycle: null,
      history: readPromptSdlcLocalCycles(input.storePath),
    });
    return;
  }

  if (decision.kind === "start") {
    const cycle = createPromptSdlcLocalCycle({
      goal,
      sourcePrompt: prompt,
      judgeModel: decision.judge,
      improverModel: decision.improver,
      workingDirectory: decision.workingDirectory,
      passScore: decision.passScore,
    });
    savePromptSdlcLocalCycle(input.storePath, cycle);
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycle.id);
    input.response.writeHead(303, {
      Location: `/prompt-sdlc?cycle=${encodeURIComponent(cycle.id)}`,
    });
    input.response.end();
    return;
  }

  const cycleId = url.searchParams.get("cycle");
  const cycle =
    cycleId === null
      ? null
      : readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle !== null) {
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycle.id);
  }

  await sendPromptSdlcLocalPage(input, {
    goal: decision.goal,
    prompt: decision.prompt,
    modelNote: selection.note,
    writers: selection.writers,
    judge: decision.judge,
    improver: decision.improver,
    folder: decision.folder,
    passScore: decision.passScore,
    canRun: selection.canRun,
    errorMessage: decision.errorMessage,
    cycle,
    history: readPromptSdlcLocalCycles(input.storePath),
  });
};
