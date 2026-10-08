import fs from "node:fs";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { resolveAgentWitchLocalLayout } from "@agent-witch/install-layout";

import {
  listScriptsNeedingApproval,
  openSkillIndexDb,
  recordScriptDecision,
  type ScriptApprovalRequest,
} from "../../../skills/public-api/infrastructure";
import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";

import {
  createHttpAutoSkillCloud,
  type AutoSkillCloud,
} from "./autoSkillCloud";

const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;

const questionFor = (r: ScriptApprovalRequest) => ({
  clusterId: r.key.slice(0, 80),
  title: `Allow script ${r.entry.name} to run on your computer?`,
  prompt: `Skill ${r.skillId}: ${r.entry.description}`,
  occurrences: 2,
  matches: [],
  draftName: `${r.skillId}/${r.entry.name}`.slice(0, 80),
  draftBody: r.content,
  judgeLabel: "Script approval",
  kind: "script_approval" as const,
  scriptInfo: {
    skillId: r.skillId,
    scripts: [
      {
        name: r.entry.name,
        description: r.entry.description,
        permissions: r.entry.permissions,
        params: r.entry.params.map(({ name, required }) => ({
          name,
          required,
        })),
        replay: {
          status: "not_replayed" as const,
          exitCode: null,
          ms: null,
          note: null,
        },
      },
    ],
  },
});

/**
 * Per project: ask the owner once per installed script version, and copy the
 * answers (saved = approved, never = denied) into the local approval table the
 * MCP gate reads. Never throws; retried on the next History tick.
 */
export const syncProjectScriptApprovals = async (input: {
  readonly db: NonNullable<ReturnType<typeof openSkillIndexDb>>;
  readonly projectDataDir: string;
  readonly projectId: string;
  readonly cloud: AutoSkillCloud;
}): Promise<void> => {
  const needed = listScriptsNeedingApproval(
    input.db,
    input.projectDataDir,
    input.projectId,
  );
  if (needed.length === 0) {
    return;
  }
  const settings = await input.cloud.getSettings(input.projectId);
  for (const request of needed) {
    const id = request.key.slice(0, 80);
    if (settings.savedClusterIds.includes(id)) {
      recordScriptDecision(input.db, input.projectId, request, "approved");
    } else if (settings.neverClusterIds.includes(id)) {
      recordScriptDecision(input.db, input.projectId, request, "denied");
    } else if (request.status === null) {
      await input.cloud.postSuggestion(input.projectId, questionFor(request));
      recordScriptDecision(input.db, input.projectId, request, "pending");
    }
  }
};

/** Whole computer: every project with a skill mirror. */
export const syncSkillScriptApprovals = async (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
  cloudApi: AgentWitchCloudApiConfig,
): Promise<void> => {
  try {
    const db = openSkillIndexDb(layout);
    const { projectDataDir } = resolveAgentWitchLocalLayout();
    if (db === null || !fs.existsSync(projectDataDir)) {
      return;
    }
    const cloud = createHttpAutoSkillCloud(cloudApi);
    for (const projectId of fs.readdirSync(projectDataDir)) {
      if (SAFE_ID.test(projectId)) {
        await syncProjectScriptApprovals({
          db,
          projectDataDir,
          projectId,
          cloud,
        }).catch(() => undefined);
      }
    }
  } catch {
    // best effort; retried next tick
  }
};
