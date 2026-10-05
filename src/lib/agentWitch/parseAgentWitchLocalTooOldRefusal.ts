import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import {
  AGENT_WITCH_LOCAL_DOWNLOAD_URL,
  AGENT_WITCH_LOCAL_TOO_OLD_ERROR,
} from "@/lib/agentWitch/agentWitchLocalTooOld.constant";
import type { AgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/types/AgentWitchLocalTooOldRefusal.type";

/**
 * Client parser for the Connect refuse. Matches on `error === "agent_witch_local_too_old"`
 * (status is informational — 409 per contract). Returns null for any other payload.
 */
export const parseAgentWitchLocalTooOldRefusal = (
  payload: unknown,
): AgentWitchLocalTooOldRefusal | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as {
    error?: unknown;
    installBundleVersion?: unknown;
    minBundleVersion?: unknown;
    downloadUrl?: unknown;
  };

  if (record.error !== AGENT_WITCH_LOCAL_TOO_OLD_ERROR) {
    return null;
  }

  const downloadUrl =
    typeof record.downloadUrl === "string" &&
    record.downloadUrl.startsWith("/") &&
    !record.downloadUrl.startsWith("//")
      ? record.downloadUrl
      : AGENT_WITCH_LOCAL_DOWNLOAD_URL;

  return {
    error: AGENT_WITCH_LOCAL_TOO_OLD_ERROR,
    installBundleVersion:
      typeof record.installBundleVersion === "string" &&
      record.installBundleVersion.trim().length > 0
        ? record.installBundleVersion.trim()
        : null,
    minBundleVersion:
      typeof record.minBundleVersion === "string" &&
      record.minBundleVersion.trim().length > 0
        ? record.minBundleVersion.trim()
        : typeof record.minBundleVersion === "number"
          ? String(record.minBundleVersion)
          : AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
    downloadUrl,
  };
};
