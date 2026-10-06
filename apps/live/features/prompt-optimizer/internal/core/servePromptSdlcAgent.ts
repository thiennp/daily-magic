import {
  confirmPromptSdlcCostBudget,
  createInitialPromptSdlcWizardState,
  estimatePromptSdlcSpendUsd,
  proposePromptSdlcRunCostBudget,
  seedPromptSdlcRunCostProposal,
} from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { buildPromptSdlcAgentCatalog } from "./buildPromptSdlcAgentCatalog";
import { buildPromptSdlcAgentSnapshot } from "./buildPromptSdlcAgentSnapshot";
import { describePromptSdlcLocalModels } from "./promptSdlcLocalForm";
import { parsePromptSdlcAgentBody } from "./parsePromptSdlcAgentBody";
import {
  applyPromptSdlcAgentBudgetConfirm,
  parsePromptSdlcAgentBudgetConfirmBody,
} from "./confirmPromptSdlcAgentBudget";
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

const parseEstimateBudgetBody = (
  raw: string,
):
  | {
      readonly kind: "estimate";
      readonly maxTrials?: number;
      readonly maxRounds?: number;
      readonly writerId?: string;
      readonly rateUsdPer1kTokens?: number;
      readonly previewModuleCount?: number;
    }
  | { readonly kind: "other" }
  | { readonly kind: "invalid"; readonly error: string } => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { kind: "invalid", error: "Send a JSON object." };
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("intent" in parsed) ||
    (parsed as { intent?: unknown }).intent !== "estimate_budget"
  ) {
    return { kind: "other" };
  }
  const body = parsed as {
    maxTrials?: unknown;
    maxRounds?: unknown;
    writerId?: unknown;
    judge?: unknown;
    rateUsdPer1kTokens?: unknown;
    previewModuleCount?: unknown;
  };
  const asOptNumber = (value: unknown): number | undefined =>
    typeof value === "number" && Number.isFinite(value) ? value : undefined;
  const asOptString = (value: unknown): string | undefined =>
    typeof value === "string" && value.trim().length > 0
      ? value.trim()
      : undefined;
  return {
    kind: "estimate",
    maxTrials: asOptNumber(body.maxTrials),
    maxRounds: asOptNumber(body.maxRounds),
    writerId: asOptString(body.writerId) ?? asOptString(body.judge),
    rateUsdPer1kTokens: asOptNumber(body.rateUsdPer1kTokens),
    previewModuleCount: asOptNumber(body.previewModuleCount),
  };
};

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
          body: { ok: false, error: "That run is not on this computer." },
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

  // Confirm Step 4 ceilings on an existing cycle (?cycle= + intent confirm_budget).
  if (cycleId !== null) {
    const confirmParsed = parsePromptSdlcAgentBudgetConfirmBody(input.rawBody);
    if (confirmParsed.kind === "other") {
      return {
        status: 400,
        body: {
          ok: false,
          error:
            "POST ?cycle= expects intent confirm_budget with confirmedTokenBudget.",
        },
      };
    }
    if (confirmParsed.kind === "invalid") {
      return { status: 400, body: { ok: false, error: confirmParsed.error } };
    }
    const existing = readPromptSdlcLocalCycle(input.storePath, cycleId);
    if (existing === null) {
      return {
        status: 404,
        body: { ok: false, error: "That run is not on this computer." },
      };
    }
    const applied = applyPromptSdlcAgentBudgetConfirm(
      existing,
      confirmParsed.body,
    );
    if (!applied.ok) {
      return { status: 400, body: { ok: false, error: applied.error } };
    }
    savePromptSdlcLocalCycle(input.storePath, applied.cycle);
    return { status: 200, body: buildPromptSdlcAgentSnapshot(applied.cycle) };
  }

  // Dry-run cost PREDICTION (no cycle started).
  const estimateParsed = parseEstimateBudgetBody(input.rawBody);
  if (estimateParsed.kind === "invalid") {
    return { status: 400, body: { ok: false, error: estimateParsed.error } };
  }
  if (estimateParsed.kind === "estimate") {
    const proposal = proposePromptSdlcRunCostBudget({
      maxRounds: estimateParsed.maxRounds,
      maxTrials: estimateParsed.maxTrials,
      writerId: estimateParsed.writerId,
      rateUsdPer1kTokens: estimateParsed.rateUsdPer1kTokens,
      previewModuleCount: estimateParsed.previewModuleCount,
    });
    return {
      status: 200,
      body: {
        ok: true,
        intent: "estimate_budget",
        targetTokenBudget: proposal.targetTokenBudget,
        proposedTokenBudget: proposal.targetTokenBudget,
        estimatedSpendUsd: proposal.estimatedSpendUsd,
        rateUsdPer1kTokens: proposal.rateUsdPer1kTokens ?? null,
        proposalStub: proposal.stub === true,
        confirmationRequired: true,
      },
    };
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

  let costControls = seedPromptSdlcRunCostProposal({
    existing: {
      ...plan.costControls,
      ...(parsed.body.rateUsdPer1kTokens == null
        ? {}
        : { rateUsdPer1kTokens: parsed.body.rateUsdPer1kTokens }),
    },
    maxRounds: plan.maxRounds,
    writerId: plan.judge === "manual" ? null : plan.judge,
  });
  if (
    parsed.body.rateUsdPer1kTokens != null &&
    costControls.targetTokenBudget !== null
  ) {
    costControls = {
      ...costControls,
      rateUsdPer1kTokens: parsed.body.rateUsdPer1kTokens,
      estimatedSpendUsd: estimatePromptSdlcSpendUsd({
        tokens: costControls.targetTokenBudget,
        rateUsdPer1kTokens: parsed.body.rateUsdPer1kTokens,
      }),
    };
  }

  if (parsed.body.confirmedTokenBudget != null) {
    const confirmed = confirmPromptSdlcCostBudget({
      existing: costControls,
      confirmedTokenBudget: parsed.body.confirmedTokenBudget,
      confirmedMaxSpendUsd: parsed.body.confirmedMaxSpendUsd,
      rateUsdPer1kTokens:
        parsed.body.rateUsdPer1kTokens ?? costControls.rateUsdPer1kTokens,
    });
    if (!confirmed.ok) {
      return { status: 400, body: { ok: false, error: confirmed.errorMessage } };
    }
    costControls = confirmed.costControls;
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
    costControls,
  });
  savePromptSdlcLocalCycle(input.storePath, cycle);
  input.handlers.startCycle(input.storePath, cycle.id);
  return { status: 200, body: buildPromptSdlcAgentSnapshot(cycle) };
};
