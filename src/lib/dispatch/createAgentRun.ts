import { randomUUID } from "node:crypto";

import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import {
  deleteAgentRunLocalPrompt,
  putAgentRunLocalPrompt,
} from "@/lib/dispatch/agentRunLocalPromptStore";
import { tryPersistAgentRunHistoryAiSession } from "@/lib/dispatch/persistAgentRunHistoryAiSession";
import mapAgentRunRow from "@/lib/dispatch/mapAgentRunRow";
import { toAgentRunNeonMetaText } from "@/lib/dispatch/toAgentRunNeonMetaText";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";

export interface CreateAgentRunInput {
  readonly id?: string;
  readonly groupId?: string | null;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly deviceId?: string | null;
  readonly prompt: string;
  readonly status: AgentRunStatusValue;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly writerAgent?: HarnessWriterAgent;
  readonly capabilityId?: string | null;
  readonly capabilityVersionId?: string | null;
  readonly approvalExpiresAt?: string | null;
  readonly projectId?: string | null;
  readonly compositionSnapshotId?: string | null;
}

const createAgentRun = async (
  input: CreateAgentRunInput,
): Promise<AgentRunRecord> => {
  const runId = input.id ?? randomUUID();
  const writerAgent = input.writerAgent ?? "claude-cli";
  // Neon meta-only: store capped prompt. Full body stays on local store for
  // pending_approval hydrate — never re-expand local → Neon.
  const neonPrompt = toAgentRunNeonMetaText(input.prompt);
  putAgentRunLocalPrompt(runId, input.prompt);

  // Project-computer C1 durable SoT when History ON + this process shares the
  // Mac profileDir (AWL / colocated). Hosted Railway usually no-ops
  // (history_unknown); device COMMAND_CLAUDE_RUN path writes C1 then.
  tryPersistAgentRunHistoryAiSession({
    projectId: input.projectId,
    agentRunId: runId,
    status: input.status,
    promptBody: input.prompt,
    resultBody: null,
    writerAgent,
    completedAt: null,
  });

  if (isAgentWitchDevDashboardEnabled()) {
    const now = new Date().toISOString();
    const run: AgentRunRecord = {
      id: runId,
      groupId: input.groupId ?? null,
      requesterUserId: input.requesterUserId,
      executorUserId: input.executorUserId,
      deviceId: input.deviceId ?? null,
      prompt: input.prompt,
      status: input.status,
      dispatchPolicy: input.dispatchPolicy,
      writerAgent,
      capabilityId: input.capabilityId ?? null,
      capabilityVersionId: input.capabilityVersionId ?? null,
      projectId: input.projectId ?? null,
      compositionSnapshotId: input.compositionSnapshotId ?? null,
      approvalExpiresAt: input.approvalExpiresAt ?? null,
      resultOutput: null,
      resultExitCode: null,
      resultOutcomeCode: null,
      denialReason: null,
      createdAt: now,
      updatedAt: now,
      startedAt: null,
      completedAt: null,
      lastRunHeartbeatAt: null,
    };
    registerAgentRunSession(run);
    return run;
  }

  try {
    const sql = getSql();
    const result = asRowArray(
      await sql`
        INSERT INTO agent_runs (
          id,
          group_id,
          requester_user_id,
          executor_user_id,
          device_id,
          prompt,
          status,
          dispatch_policy,
          writer_agent,
          capability_id,
          capability_version_id,
          project_id,
          composition_snapshot_id,
          approval_expires_at
        )
        VALUES (
          ${runId},
          ${input.groupId ?? null},
          ${input.requesterUserId},
          ${input.executorUserId},
          ${input.deviceId ?? null},
          ${neonPrompt},
          ${input.status},
          ${input.dispatchPolicy},
          ${writerAgent},
          ${input.capabilityId ?? null},
          ${input.capabilityVersionId ?? null},
          ${input.projectId ?? null},
          ${input.compositionSnapshotId ?? null},
          ${input.approvalExpiresAt ?? null}
        )
        RETURNING *
      `,
    );

    const fromNeon = mapAgentRunRow(result[0]);
    // Callers (registry / approval) need the full prompt; Neon row is meta-only.
    return { ...fromNeon, prompt: input.prompt };
  } catch (error: unknown) {
    // Soft note: put-then-INSERT-fail orphan cleanup.
    deleteAgentRunLocalPrompt(runId);
    throw error;
  }
};

export default createAgentRun;
