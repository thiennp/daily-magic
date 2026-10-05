import { AGENT_WITCH_LOCAL_MIN_TASK_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinTaskBundleVersion.constant";
import { classifyAgentWitchLocalConnectVersion } from "@/lib/agentWitch/classifyAgentWitchLocalConnectVersion";
import type { AgentWitchLocalConnectVersionStatus } from "@/lib/agentWitch/types/AgentWitchLocalConnectVersionStatus.type";

export type ProjectComputerAssignabilityInput = {
  readonly status: "active" | "revoked" | "naming_required" | string;
  readonly isOnline: boolean;
  readonly installBundleVersion: string | null | undefined;
  /** Override Connect classifier min (tests). Default = Connect min. */
  readonly connectMinBundleVersion?: string;
  /** Override task floor (tests). Default = MIN_TASK. */
  readonly taskMinBundleVersion?: string;
};

export type ProjectComputerAssignability = {
  readonly connectVersionStatus: AgentWitchLocalConnectVersionStatus;
  readonly assignable: boolean;
};

/**
 * Pure assignability for a computer seat. Dispatch must re-check server-side.
 * offline | too_old | below MIN_TASK ⇒ not assignable.
 */
export const isProjectComputerMemberAssignable = (
  input: ProjectComputerAssignabilityInput,
): ProjectComputerAssignability => {
  const taskMin =
    input.taskMinBundleVersion ?? AGENT_WITCH_LOCAL_MIN_TASK_BUNDLE_VERSION;
  const connectVersionStatus = classifyAgentWitchLocalConnectVersion(
    input.installBundleVersion,
    input.connectMinBundleVersion,
  );
  const taskStatus = classifyAgentWitchLocalConnectVersion(
    input.installBundleVersion,
    taskMin,
  );
  const assignable =
    input.status === "active" &&
    input.isOnline === true &&
    connectVersionStatus === "ok" &&
    taskStatus === "ok";
  return { connectVersionStatus, assignable };
};
