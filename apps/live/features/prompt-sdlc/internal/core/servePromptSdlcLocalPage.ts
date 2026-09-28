import { pickMacOsFolderDialog } from "../../../projects/public-api/infrastructure";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
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
          decision.judge,
          decision.improver,
        )
      : null;
  if (decision.kind === "start" && writerBlock !== null) {
    await sendPage(input, {
      goal: decision.goal,
      prompt: decision.prompt,
      modelNote: selection.note,
      writers: selection.writers,
      judge: decision.judge,
      improver: decision.improver,
      folder: displayPromptSdlcLocalFolder(decision.workingDirectory),
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

  await sendPage(input, {
    goal: decision.goal,
    prompt: decision.prompt,
    modelNote: selection.note,
    writers: selection.writers,
    judge: decision.judge,
    improver: decision.improver,
    folder: decision.folder,
    canRun: selection.canRun,
    errorMessage: decision.errorMessage,
    cycle,
    history: readPromptSdlcLocalCycles(input.storePath),
  });
};

const sendPage = async (
  input: PromptSdlcLocalRouteInput,
  body: Parameters<typeof buildPromptSdlcLocalPageBody>[0],
): Promise<void> => {
  input.sendHtml(
    input.response,
    await input.renderShell({
      title: "Prompt SDLC",
      activePath: "/prompt-sdlc",
      body: buildPromptSdlcLocalPageBody(body),
    }),
  );
};
