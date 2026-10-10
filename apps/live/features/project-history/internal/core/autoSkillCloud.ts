import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../../../projects/internal/core/agentWitchDeviceAuth.constant";

import type { AutoSkillJudgePref } from "./autoSkill.types";

export type AutoSkillCloudSettings = {
  readonly enabled: boolean;
  readonly judgePref: AutoSkillJudgePref;
  /** Coding agent the owner picked to judge; null/absent = any signed-in one. */
  readonly judgeAgent?: string | null;
  readonly publishMode: "draft" | "publish";
  readonly neverClusterIds: readonly string[];
  readonly savedClusterIds: readonly string[];
  /** Clusters whose question is still waiting for the owner. */
  readonly pendingClusterIds: readonly string[];
};

export type AutoSkillStatusReport = {
  readonly judgeKind: string | null;
  readonly judgeLabel: string | null;
  readonly pausedReason: string | null;
  readonly note: string | null;
  /** Commits on the folder's main branch (null: no git); lets the app offer a deeper scan. */
  readonly gitCommits?: number | null;
  /** Newest commits the last scan fed in. */
  readonly gitScanned?: number | null;
};

export type AutoSkillSuggestionPayload = {
  readonly clusterId: string;
  readonly title: string;
  readonly prompt: string;
  readonly occurrences: number;
  /** Canonical text of the repeated step (module-level questions). */
  readonly moduleLabel?: string;
  /** Distinct prompts the step appeared in. */
  readonly distinctPrompts?: number;
  readonly matches: readonly {
    readonly runId: string;
    readonly completedAt: string;
    readonly summary: string;
  }[];
  readonly draftName: string;
  readonly draftBody: string;
  readonly judgeLabel: string;
  /** Saved into the Library as this kind; a playbook is a broader guide than a skill. */
  readonly libraryKind?: "skill" | "playbook";
  /** `script_approval`: owner approval of one installed script version. */
  readonly kind?: "skill" | "script_approval";
  /** Permission list and replay result of the scripts (nothing secret). */
  readonly scriptInfo?: AutoSkillScriptInfoPayload;
};

export type AutoSkillScriptInfoPayload = {
  readonly skillId?: string;
  readonly scripts: readonly {
    readonly name: string;
    readonly description: string;
    readonly permissions: {
      readonly write: boolean;
      readonly network: boolean;
    };
    readonly params: readonly {
      readonly name: string;
      readonly required: boolean;
    }[];
    readonly replay: {
      readonly status: "ok" | "failed" | "not_replayed";
      readonly exitCode: number | null;
      readonly ms: number | null;
      readonly note: string | null;
    };
  }[];
};

/** Cloud side of auto skills (settings, status, questions). Throws on http errors. */
export type AutoSkillCloud = {
  readonly getSettings: (projectId: string) => Promise<AutoSkillCloudSettings>;
  readonly postStatus: (
    projectId: string,
    status: AutoSkillStatusReport,
  ) => Promise<void>;
  readonly postSuggestion: (
    projectId: string,
    suggestion: AutoSkillSuggestionPayload,
  ) => Promise<void>;
};

export const createHttpAutoSkillCloud = (
  api: AgentWitchCloudApiConfig,
): AutoSkillCloud => {
  const url = (projectId: string): string =>
    `${api.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/auto-skills`;
  const headers = {
    [AGENT_WITCH_PAIRING_TOKEN_HEADER]: api.pairingToken,
    "Content-Type": "application/json",
  };
  const post = async (projectId: string, body: unknown): Promise<void> => {
    const response = await fetch(url(projectId), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      throw new Error(`auto-skills post http ${response.status}`);
    }
  };
  return {
    getSettings: async (projectId) => {
      const response = await fetch(url(projectId), {
        headers,
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) {
        throw new Error(`auto-skills get http ${response.status}`);
      }
      return (await response.json()) as AutoSkillCloudSettings;
    },
    postStatus: (projectId, status) =>
      post(projectId, { kind: "status", status }),
    postSuggestion: (projectId, suggestion) =>
      post(projectId, { kind: "suggestion", suggestion }),
  };
};
