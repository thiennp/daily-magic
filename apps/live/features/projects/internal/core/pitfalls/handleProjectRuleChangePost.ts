import type { AgentWitchCloudApiConfig } from "../agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../agentWitchDeviceAuth.constant";
import {
  postProjectRuleActiveChangeFromCloud,
  type RuleChangeFetchResult,
} from "../../../../prompt-optimizer/public-api/infrastructure";

export type ProjectRuleChangeAction = "drop" | "restore";

export type HandleProjectRuleChangePostResult =
  | {
      readonly kind: "redirect";
      readonly location: string;
    }
  | { readonly kind: "not_found" };

const readField = (
  params: URLSearchParams,
  key: string,
): string => params.get(key)?.trim() ?? "";

/**
 * AWL proxy for cloud rule drop/restore. Redirects back to Playbooks with
 * flash query params; pairing token auth matches usage fetch.
 */
export const handleProjectRuleChangePost = async (input: {
  readonly action: ProjectRuleChangeAction;
  readonly rawBody: string;
  readonly cloudConfig: AgentWitchCloudApiConfig | null;
}): Promise<HandleProjectRuleChangePostResult> => {
  const params = new URLSearchParams(input.rawBody);
  const projectId = readField(params, "projectId");
  const ruleId = readField(params, "ruleId");
  const rulePrompt = readField(params, "rulePrompt");
  if (projectId.length === 0 || ruleId.length === 0) {
    return { kind: "not_found" };
  }
  const promptQuery =
    rulePrompt.length > 0
      ? `&rulePrompt=${encodeURIComponent(rulePrompt)}`
      : "";
  const base = `/project?id=${encodeURIComponent(projectId)}&tab=harness${promptQuery}`;
  if (input.cloudConfig === null) {
    return {
      kind: "redirect",
      location: `${base}&ruleChangeError=${encodeURIComponent("unavailable")}`,
    };
  }
  const result: RuleChangeFetchResult =
    await postProjectRuleActiveChangeFromCloud({
      appOrigin: input.cloudConfig.appOrigin,
      pairingToken: input.cloudConfig.pairingToken,
      projectId,
      ruleId,
      action: input.action,
      pairingHeaderName: AGENT_WITCH_PAIRING_TOKEN_HEADER,
    });
  if (!result.ok) {
    return {
      kind: "redirect",
      location: `${base}&ruleChangeError=${encodeURIComponent(result.reason)}&ruleChangeAction=${input.action}`,
    };
  }
  if (input.action === "drop" && result.data.changed) {
    const q = new URLSearchParams({
      id: projectId,
      tab: "harness",
      ruleDropped: result.data.rule.ruleId,
      ruleDroppedTitle: result.data.rule.title,
    });
    if (rulePrompt.length > 0) {
      q.set("rulePrompt", rulePrompt);
    }
    return { kind: "redirect", location: `/project?${q.toString()}` };
  }
  return { kind: "redirect", location: base };
};
