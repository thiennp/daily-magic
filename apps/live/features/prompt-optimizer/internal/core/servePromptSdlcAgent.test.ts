import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_AGENT_MANUAL_ERROR } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { savePromptSdlcLocalCycle } from "./promptSdlcLocalStore";
import {
  servePromptSdlcAgent,
  type PromptSdlcAgentHandlers,
} from "./servePromptSdlcAgent";

const handlersFor = (
  installedIds: readonly string[],
  writerError: string | null = null,
): PromptSdlcAgentHandlers & { readonly started: string[] } => {
  const started: string[] = [];
  return {
    started,
    readInstalledIds: async () => installedIds,
    readWritersReady: async () => writerError,
    startCycle: (_storePath, cycleId) => {
      started.push(cycleId);
    },
  };
};

const storePath = (): string =>
  path.join(os.tmpdir(), `prompt-sdlc-agent-${crypto.randomUUID()}.json`);

describe("servePromptSdlcAgent", () => {
  it("lists installed writers and how a bot starts a run", async () => {
    const result = await servePromptSdlcAgent({
      method: "GET",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: "",
      storePath: storePath(),
      handlers: handlersFor(["claude-cli", "codex"]),
    });

    const sole = await servePromptSdlcAgent({
      method: "GET",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: "",
      storePath: storePath(),
      handlers: handlersFor(["codex"]),
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      ok: true,
      installedWriters: [
        { id: "claude-cli", label: "Claude" },
        { id: "codex", label: "Codex" },
      ],
    });
    expect(JSON.stringify(result.body)).toContain("project folder");
    expect(JSON.stringify(sole.body)).toContain("Only codex is installed");
  });

  it("starts a run in the project folder when one writer is installed", async () => {
    const handlers = handlersFor(["codex"]);
    const pathToStore = storePath();
    const result = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: JSON.stringify({
        goal: "Stay inside the repo",
        prompt: "Fix the failing test",
        workingDirectory: os.homedir(),
      }),
      storePath: pathToStore,
      handlers,
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      ok: true,
      status: "judging",
      done: false,
      useThisPrompt: false,
      judge: "codex",
      improver: "codex",
      workingDirectory: os.homedir(),
    });
    expect(handlers.started).toHaveLength(1);
    expect(fs.existsSync(pathToStore)).toBe(true);
  });

  it("returns the saved run when the bot polls", async () => {
    const pathToStore = storePath();
    const cycle = createPromptSdlcLocalCycle({
      goal: "Stay inside the repo",
      sourcePrompt: "Use the harness",
      judgeModel: "codex",
      improverModel: "codex",
      workingDirectory: os.homedir(),
    });
    savePromptSdlcLocalCycle(pathToStore, cycle);

    const found = await servePromptSdlcAgent({
      method: "GET",
      requestUrl: `/prompt-optimizer/agent?cycle=${cycle.id}`,
      rawBody: "",
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });
    const missing = await servePromptSdlcAgent({
      method: "GET",
      requestUrl: "/prompt-optimizer/agent?cycle=missing",
      rawBody: "",
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });

    const passed = {
      ...cycle,
      id: `${cycle.id}-passed`,
      status: "passed" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "Use the harness and the code",
          judgement: {
            score: 94,
            passed: true,
            reasons: "It names the folder.",
            rawReply: "94",
          },
        },
      ],
    };
    savePromptSdlcLocalCycle(pathToStore, passed);
    const empty = {
      ...cycle,
      id: `${cycle.id}-empty`,
      revisions: [],
      workingDirectory: undefined,
    };
    savePromptSdlcLocalCycle(pathToStore, empty);

    const passedResult = await servePromptSdlcAgent({
      method: "GET",
      requestUrl: `/prompt-optimizer/agent?cycle=${passed.id}`,
      rawBody: "",
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });
    const emptyResult = await servePromptSdlcAgent({
      method: "GET",
      requestUrl: `/prompt-optimizer/agent?cycle=${empty.id}`,
      rawBody: "",
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });

    expect(found.status).toBe(200);
    expect(found.body).toMatchObject({
      cycleId: cycle.id,
      prompt: "Use the harness",
      useThisPrompt: false,
      score: null,
    });
    expect(passedResult.body).toMatchObject({
      done: true,
      useThisPrompt: true,
      prompt: "Use the harness and the code",
      score: 94,
      passed: true,
    });
    expect(emptyResult.body).toMatchObject({
      prompt: "",
      workingDirectory: null,
    });
    expect(missing.status).toBe(404);
  });

  it("refuses a start that is not ready to run writers in the folder", async () => {
    const pathToStore = storePath();
    const manual = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: JSON.stringify({
        goal: "Stay inside the repo",
        prompt: "Fix the failing test",
        workingDirectory: os.homedir(),
        judge: "manual",
        improver: "codex",
      }),
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });
    const missingChoice = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: JSON.stringify({
        goal: "Stay inside the repo",
        prompt: "Fix the failing test",
        workingDirectory: os.homedir(),
      }),
      storePath: pathToStore,
      handlers: handlersFor(["claude-cli", "codex"]),
    });
    const blocked = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: JSON.stringify({
        goal: "Stay inside the repo",
        prompt: "Fix the failing test",
        workingDirectory: os.homedir(),
        judge: "codex",
        improver: "codex",
      }),
      storePath: pathToStore,
      handlers: handlersFor(["codex"], "Codex needs a login."),
    });
    const noWriter = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: JSON.stringify({
        goal: "Stay inside the repo",
        prompt: "Fix the failing test",
        workingDirectory: os.homedir(),
      }),
      storePath: pathToStore,
      handlers: handlersFor([]),
    });
    const missingFolder = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: JSON.stringify({
        goal: "Stay inside the repo",
        prompt: "Fix the failing test",
        workingDirectory: "/no/such/prompt-optimizer-folder",
        judge: "codex",
        improver: "codex",
        passScore: 0,
      }),
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });
    const otherMethod = await servePromptSdlcAgent({
      method: "PUT",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: "",
      storePath: pathToStore,
      handlers: handlersFor(["codex"]),
    });

    expect(manual).toMatchObject({
      status: 400,
      body: { ok: false, error: PROMPT_SDLC_AGENT_MANUAL_ERROR },
    });
    expect(missingChoice.status).toBe(400);
    expect(JSON.stringify(missingChoice.body)).toContain("claude-cli");
    expect(noWriter).toMatchObject({
      status: 400,
      body: {
        ok: false,
        error: "No reasoning writer is installed on this Mac.",
      },
    });
    expect(missingFolder.status).toBe(400);
    expect(blocked).toMatchObject({
      status: 400,
      body: { ok: false, error: "Codex needs a login." },
    });
    expect(otherMethod.status).toBe(405);
    expect(fs.existsSync(pathToStore)).toBe(false);
  });

  it("rejects a post that is not the JSON contract", async () => {
    const result = await servePromptSdlcAgent({
      method: "POST",
      requestUrl: "/prompt-optimizer/agent",
      rawBody: "{",
      storePath: storePath(),
      handlers: handlersFor([]),
    });

    expect(result.status).toBe(400);
    expect(result.body).toMatchObject({
      ok: false,
      error: "Send a JSON object.",
    });
  });
});
