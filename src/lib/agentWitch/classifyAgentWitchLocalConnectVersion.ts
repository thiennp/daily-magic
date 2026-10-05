import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import type { AgentWitchLocalConnectVersionStatus } from "@/lib/agentWitch/types/AgentWitchLocalConnectVersionStatus.type";

/**
 * Hard connect gate (not the soft "update available" hint — that stays
 * `isAgentWitchInstallBundleVersionBehind`).
 * null / empty / non-numeric → too_old; parseInt < min → too_old.
 */
export const classifyAgentWitchLocalConnectVersion = (
  installBundleVersion: string | null | undefined,
  minBundleVersion: string = AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
): AgentWitchLocalConnectVersionStatus => {
  const normalized = installBundleVersion?.trim() ?? "";
  if (normalized.length === 0 || !/^\d+$/.test(normalized)) {
    return "too_old";
  }

  const local = Number.parseInt(normalized, 10);
  const min = Number.parseInt(minBundleVersion.trim(), 10);
  if (!Number.isFinite(local)) {
    return "too_old";
  }

  if (Number.isFinite(min) && local < min) {
    return "too_old";
  }

  return "ok";
};
