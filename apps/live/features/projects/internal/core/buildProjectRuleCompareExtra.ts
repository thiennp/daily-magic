import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";
import type { ListAgentWitchPitfallsResult } from "./pitfalls/agentWitchProjectPitfallsStore.type";
import {
  fetchProjectRuleUsageFromCloud,
  type RuleChangeFetchResult,
  type RuleUsageFetchResult,
} from "../../../prompt-optimizer/public-api/infrastructure";
import { buildRuleCompareHarnessExtra } from "../../../prompt-optimizer/public-api/presentation";

/**
 * Playbooks tab rule-compare HTML. Fetches usage + uses active rules only when
 * a prompt was submitted (chip or custom Compare).
 */
export const buildProjectRuleCompareExtra = async (input: {
  readonly projectId: string;
  readonly prompt: string | null;
  readonly cloudConfig: AgentWitchCloudApiConfig | null;
  readonly pitfalls: ListAgentWitchPitfallsResult | null | undefined;
  readonly dropFlash?: {
    readonly ruleId: string;
    readonly title: string;
  } | null;
  readonly changeError?: RuleChangeFetchResult | null;
  readonly changeAction?: "drop" | "restore";
}): Promise<string> => {
  if (input.prompt === null) {
    return buildRuleCompareHarnessExtra({
      projectId: input.projectId,
      prompt: null,
      activeRules: [],
      usage: null,
    });
  }

  const usage: RuleUsageFetchResult =
    input.cloudConfig === null
      ? { ok: false, reason: "not_connected" }
      : await fetchProjectRuleUsageFromCloud({
          appOrigin: input.cloudConfig.appOrigin,
          pairingToken: input.cloudConfig.pairingToken,
          projectId: input.projectId,
          pairingHeaderName: AGENT_WITCH_PAIRING_TOKEN_HEADER,
        });

  const pitfalls = input.pitfalls;
  const rulesUnavailable =
    pitfalls === undefined || pitfalls === null || !pitfalls.ok;
  const activeRules = rulesUnavailable
    ? null
    : pitfalls.items.filter((item) => item.source !== "retired");

  return buildRuleCompareHarnessExtra({
    projectId: input.projectId,
    prompt: input.prompt,
    activeRules,
    rulesUnavailable,
    usage,
    dropFlash: input.dropFlash,
    changeError: input.changeError,
    changeAction: input.changeAction,
  });
};
