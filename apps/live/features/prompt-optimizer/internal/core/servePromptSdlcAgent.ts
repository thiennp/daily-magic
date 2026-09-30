import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { buildPromptSdlcAgentCatalog } from "./buildPromptSdlcAgentCatalog";
import { buildPromptSdlcAgentSnapshot } from "./buildPromptSdlcAgentSnapshot";
import { describePromptSdlcLocalModels } from "./promptSdlcLocalForm";
import { parsePromptSdlcAgentBody } from "./parsePromptSdlcAgentBody";
import { planPromptSdlcAgentStart } from "./planPromptSdlcAgentStart";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

export interface PromptSdlcAgentHandlers {
  readonly readInstalledIds: () => Promise<readonly string[]>;
  readonly readWritersReady: (
    storePath: string,
    judge: string,
    improver: string,
    runner?: string,
  ) => Promise<string | null>;
  readonly startCycle: (storePath: string, cycleId: string) => void;
}

export const servePromptSdlcAgent = async (input: {
  readonly method: string;
  readonly requestUrl: string;
  readonly rawBody: string;
  readonly storePath: string;
  readonly handlers: PromptSdlcAgentHandlers;
}): Promise<{ readonly status: number; readonly body: unknown }> => {
  const cycleId = new URL(
    input.requestUrl,
    "http://127.0.0.1",
  ).searchParams.get("cycle");
  if (input.method === "GET" && cycleId !== null) {
    const cycle = readPromptSdlcLocalCycle(input.storePath, cycleId);
    return cycle === null
      ? {
          status: 404,
          body: { ok: false, error: "That run is not on this Mac." },
        }
      : { status: 200, body: buildPromptSdlcAgentSnapshot(cycle) };
  }

  const installedIds = await input.handlers.readInstalledIds();
  const selection = describePromptSdlcLocalModels(installedIds);
  if (input.method === "GET") {
    return {
      status: 200,
      body: buildPromptSdlcAgentCatalog(selection.writers),
    };
  }
  if (input.method !== "POST") {
    return { status: 405, body: { ok: false, error: "Use GET or POST." } };
  }

  const parsed = parsePromptSdlcAgentBody(input.rawBody);
  if (!parsed.ok) {
    return {
      status: 400,
      body: {
        ok: false,
        error: parsed.error,
        installedWriters: selection.writers,
      },
    };
  }

  const plan = planPromptSdlcAgentStart({
    body: parsed.body,
    installedIds,
  });
  if (!plan.ok) {
    return {
      status: 400,
      body: {
        ok: false,
        error: plan.error,
        installedWriters: plan.installedWriters,
      },
    };
  }

  const writerBlock = await input.handlers.readWritersReady(
    input.storePath,
    plan.judge,
    plan.improver,
    plan.runner,
  );
  if (writerBlock !== null) {
    return {
      status: 400,
      body: {
        ok: false,
        error: writerBlock,
        installedWriters: selection.writers,
      },
    };
  }

  const cycle = createPromptSdlcLocalCycle({
    goal: plan.goal,
    sourcePrompt: plan.prompt,
    judgeModel: plan.judge,
    improverModel: plan.improver,
    workingDirectory: plan.workingDirectory,
    passScore: plan.passScore,
    maxRounds: plan.maxRounds,
    wizard: createInitialPromptSdlcWizardState(plan.prompt),
    runnerModel: plan.runner,
  });
  savePromptSdlcLocalCycle(input.storePath, cycle);
  input.handlers.startCycle(input.storePath, cycle.id);
  return { status: 200, body: buildPromptSdlcAgentSnapshot(cycle) };
};
