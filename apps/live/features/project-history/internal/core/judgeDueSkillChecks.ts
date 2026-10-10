import type { HarnessWriterAgentId } from "../../../../adapters/writerDispatch";
import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import {
  createAgentAutoSkillCompleter,
  probeSignedInAutoSkillAgent,
} from "./autoSkillAgent";
import { createHttpAutoSkillCloud } from "./autoSkillCloud";
import {
  createOllamaAutoSkillCompleter,
  probeAutoSkillOllamaModel,
} from "./autoSkillOllama";
import { selectAutoSkillJudge } from "./autoSkillSelectJudge";
import type { AutoSkillCompleter } from "./autoSkill.types";
import { extractOwnerLlmSkillMarkdown } from "./extractOwnerLlmSkillMarkdown";
import type { DueSkillCheck } from "./skillCheck.types";
import { fetchDueSkillChecks, postSkillCheckResult } from "./skillCheckCloud";
import {
  buildSkillCheckPrompt,
  buildSkillImprovePrompt,
  parseSkillCheckVerdict,
} from "./skillCheckPrompt";

const VERDICT_TIMEOUT_MS = 120_000;
const IMPROVE_TIMEOUT_MS = 180_000;
/** Rounds of "fetch due checks, judge them" per request, so one request cannot run forever. */
const MAX_ROUNDS = 5;

type CheckResult = Parameters<typeof postSkillCheckResult>[2];

/** Judge one check: a verdict, and for "improve" the full improved skill. Null when the judge failed. */
export const judgeSkillCheck = async (
  check: DueSkillCheck,
  completer: AutoSkillCompleter,
): Promise<CheckResult | null> => {
  const answered = await completer({
    prompt: buildSkillCheckPrompt(check),
    json: true,
    timeoutMs: VERDICT_TIMEOUT_MS,
  });
  const verdict = answered.ok ? parseSkillCheckVerdict(answered.text) : null;
  if (verdict === null) {
    return null;
  }
  if (verdict.verdict === "fine") {
    return { checkId: check.checkId, ...verdict };
  }
  const written = await completer({
    prompt: buildSkillImprovePrompt(check, verdict.note),
    json: false,
    timeoutMs: IMPROVE_TIMEOUT_MS,
  });
  const body = written.ok ? extractOwnerLlmSkillMarkdown(written.text) : null;
  return body === null
    ? null
    : { checkId: check.checkId, ...verdict, proposedBody: body };
};

/**
 * "A skill check is due": judge the project's due checks with this computer's
 * judge (same pick as auto skills) and send each result back. A check the
 * judge cannot answer stays due. Never throws.
 */
export const judgeDueSkillChecks = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly projectId: string;
  readonly folderPath?: string;
}): Promise<number> => {
  let judged = 0;
  try {
    const settings = await createHttpAutoSkillCloud(input.cloudApi).getSettings(
      input.projectId,
    );
    if (!settings.enabled) {
      return 0;
    }
    const ollamaModel = await probeAutoSkillOllamaModel();
    const agentWriter = await probeSignedInAutoSkillAgent(
      null,
      undefined,
      settings.judgeAgent ?? null,
    );
    const choice = selectAutoSkillJudge(settings.judgePref, {
      ollamaModel,
      agentWriter,
      botName: null,
    });
    if (!choice.ok) {
      return 0;
    }
    const completer: AutoSkillCompleter =
      choice.kind === "ollama" && ollamaModel !== null
        ? createOllamaAutoSkillCompleter(ollamaModel)
        : choice.kind === "agent" && agentWriter !== null
          ? createAgentAutoSkillCompleter(
              agentWriter as HarnessWriterAgentId,
              input.folderPath,
            )
          : async () => ({ ok: false, reason: "judge_unavailable" });
    for (let round = 0; round < MAX_ROUNDS; round += 1) {
      const due = await fetchDueSkillChecks(input.cloudApi, input.projectId);
      let progressed = false;
      for (const check of due) {
        const result = await judgeSkillCheck(check, completer);
        if (
          result !== null &&
          (await postSkillCheckResult(input.cloudApi, input.projectId, result))
        ) {
          judged += 1;
          progressed = true;
        }
      }
      if (!progressed) {
        break;
      }
    }
  } catch {
    // the checks stay due and are tried on the next request or scan
  }
  return judged;
};
