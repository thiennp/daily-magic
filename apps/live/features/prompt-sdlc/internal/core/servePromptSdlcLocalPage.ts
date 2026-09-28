import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  describePromptSdlcLocalModels,
  readPromptSdlcLocalExampleFields,
  readPromptSdlcLocalStartError,
} from "./promptSdlcLocalForm";
import {
  readPromptSdlcLocalCycle,
  readPromptSdlcLocalCycles,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import {
  ensurePromptSdlcLocalCycleRunning,
  readPromptSdlcInstalledWriters,
} from "./runPromptSdlcLocalCycle";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const servePromptSdlcLocalPage = async (
  input: PromptSdlcLocalRouteInput,
): Promise<void> => {
  const url = new URL(input.requestUrl, "http://127.0.0.1");
  const viewingCycle =
    input.method === "GET" && url.searchParams.get("cycle") !== null;
  const selection = viewingCycle
    ? { note: "", canRun: true, models: null }
    : describePromptSdlcLocalModels(await readPromptSdlcInstalledWriters());
  const posted =
    input.method === "POST"
      ? new URLSearchParams(await input.readBody(input.request))
      : null;
  const filled = readPromptSdlcLocalExampleFields(
    url.searchParams.get("example"),
  );
  const goal = posted?.get("goal") ?? filled.goal;
  const prompt = posted?.get("prompt") ?? filled.prompt;
  const startError =
    posted === null ? null : readPromptSdlcLocalStartError(goal, prompt);
  if (posted !== null && startError === null && selection.models !== null) {
    const cycle = createPromptSdlcLocalCycle({
      goal,
      sourcePrompt: prompt,
      judgeModel: selection.models.judge,
      improverModel: selection.models.improver,
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
    goal,
    prompt,
    modelNote: selection.note,
    canRun: selection.canRun,
    errorMessage:
      startError ??
      (posted !== null && selection.models === null ? selection.note : null),
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
