import { writeProjectHistoryAiSession } from "@agent-witch/live-project-history";
import { getAgentRunLocalPrompt } from "@/lib/dispatch/agentRunLocalPromptStore";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";
import { PROJECT_COMPUTER_HISTORY_ON_STATES } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";

/**
 * Try to persist full prompt/result into project-computer C1 tasks/.
 * Works when this process shares the Mac profileDir (AWL / colocated).
 * On hosted AWC (Railway) History local state is usually unknown → no-op;
 * the device path (COMMAND_CLAUDE_RUN / result) is the durable SoT then.
 * Never writes bodies to Neon.
 */
export const tryPersistAgentRunHistoryAiSession = (input: {
  readonly projectId: string | null | undefined;
  readonly agentRunId: string;
  readonly status: string;
  readonly promptBody?: string | null;
  readonly resultBody?: string | null;
  readonly writerAgent?: string | null;
  readonly createdAt?: string;
  readonly completedAt?: string | null;
}): boolean => {
  const projectId =
    typeof input.projectId === "string" ? input.projectId.trim() : "";
  if (projectId.length === 0) {
    return false;
  }
  const agentRunId = input.agentRunId.trim();
  if (agentRunId.length === 0) {
    return false;
  }

  const result = writeProjectHistoryAiSession({
    projectId,
    taskId: agentRunId,
    agentRunId,
    status: input.status,
    ...(input.promptBody !== undefined ? { promptBody: input.promptBody } : {}),
    ...(input.resultBody !== undefined ? { resultBody: input.resultBody } : {}),
    ...(typeof input.writerAgent === "string"
      ? { writerAgent: input.writerAgent }
      : {}),
    ...(typeof input.createdAt === "string"
      ? { createdAt: input.createdAt }
      : {}),
    ...(input.completedAt !== undefined
      ? { completedAt: input.completedAt }
      : {}),
  });
  return result.ok;
};

/**
 * Server-local prompt delete policy after terminal:
 * - no projectId → delete (explicit drop; Neon meta-only accepted)
 * - cloud History OFF → delete (C1 would no-op; body loss expected)
 * - local C1 write succeeded → delete (durable SoT confirmed on this FS)
 * - otherwise keep (History ON / unknown / device offline — bridge until C1)
 */
export const shouldDeleteAgentRunLocalPromptAfterTerminal = async (input: {
  readonly projectId: string | null | undefined;
  readonly c1WriteOk: boolean;
}): Promise<boolean> => {
  if (input.c1WriteOk) {
    return true;
  }
  const projectId =
    typeof input.projectId === "string" ? input.projectId.trim() : "";
  if (projectId.length === 0) {
    return true;
  }
  try {
    const state = await readProjectComputerHistoryState(projectId);
    if (!PROJECT_COMPUTER_HISTORY_ON_STATES.includes(state)) {
      return true;
    }
  } catch {
    // History read failed → keep local bridge (conservative).
    return false;
  }
  return false;
};

/**
 * Terminal helper: attempt C1 persist with full bodies from local store +
 * uncapped result, then decide whether server-local prompt may be deleted.
 * Returns true when the local prompt file should be deleted.
 */
export const finalizeAgentRunLocalPromptAtTerminal = async (input: {
  readonly agentRunId: string;
  readonly projectId: string | null | undefined;
  readonly status: string;
  readonly resultBody?: string | null;
  readonly writerAgent?: string | null;
  readonly completedAt?: string | null;
}): Promise<boolean> => {
  const promptBody = getAgentRunLocalPrompt(input.agentRunId);
  const c1WriteOk = tryPersistAgentRunHistoryAiSession({
    projectId: input.projectId,
    agentRunId: input.agentRunId,
    status: input.status,
    ...(promptBody !== null ? { promptBody } : {}),
    ...(input.resultBody !== undefined
      ? { resultBody: input.resultBody }
      : {}),
    ...(typeof input.writerAgent === "string"
      ? { writerAgent: input.writerAgent }
      : {}),
    ...(input.completedAt !== undefined
      ? { completedAt: input.completedAt }
      : {}),
  });
  return shouldDeleteAgentRunLocalPromptAfterTerminal({
    projectId: input.projectId,
    c1WriteOk,
  });
};
