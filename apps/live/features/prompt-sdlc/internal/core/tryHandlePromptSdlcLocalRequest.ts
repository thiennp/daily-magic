import type http from "node:http";

import { buildPromptSdlcLocalGuidePageBody } from "./buildPromptSdlcLocalGuidePage";
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

export interface PromptSdlcLocalRouteInput {
  readonly method: string;
  readonly pathname: string;
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly requestUrl: string;
  readonly storePath: string;
  readonly readBody: (request: http.IncomingMessage) => Promise<string>;
  readonly sendHtml: (response: http.ServerResponse, html: string) => void;
  readonly renderShell: (shell: {
    readonly title: string;
    readonly activePath: "/prompt-sdlc";
    readonly body: string;
  }) => Promise<string>;
}

export const tryHandlePromptSdlcLocalRequest = async (
  input: PromptSdlcLocalRouteInput,
): Promise<boolean> => {
  if (
    input.pathname !== "/prompt-sdlc" &&
    input.pathname !== "/prompt-sdlc/guide"
  ) {
    return false;
  }

  if (input.method !== "GET" && input.method !== "POST") {
    input.response.writeHead(405);
    input.response.end();
    return true;
  }

  if (input.pathname === "/prompt-sdlc/guide") {
    input.sendHtml(
      input.response,
      await input.renderShell({
        title: "Prompt SDLC",
        activePath: "/prompt-sdlc",
        body: buildPromptSdlcLocalGuidePageBody(),
      }),
    );
    return true;
  }

  const selection = describePromptSdlcLocalModels(
    await readPromptSdlcInstalledWriters(),
  );
  const url = new URL(input.requestUrl, "http://127.0.0.1");
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
    return true;
  }

  const cycleId = url.searchParams.get("cycle");
  const cycle =
    cycleId === null
      ? null
      : readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle !== null) {
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycle.id);
  }

  input.sendHtml(
    input.response,
    await input.renderShell({
      title: "Prompt SDLC",
      activePath: "/prompt-sdlc",
      body: buildPromptSdlcLocalPageBody({
        goal,
        prompt,
        modelNote: selection.note,
        canRun: selection.canRun,
        errorMessage:
          startError ??
          (posted !== null && selection.models === null
            ? selection.note
            : null),
        cycle,
        history: readPromptSdlcLocalCycles(input.storePath),
      }),
    }),
  );
  return true;
};
