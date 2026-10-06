import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { classifyAgentWitchLocalConnectVersion } from "@/lib/agentWitch/classifyAgentWitchLocalConnectVersion";

/**
 * True when a reported AWL install bundle is below the supported minimum, so the
 * UI should offer the repair command. Same rule and constant as the hard connect
 * gate: missing / empty / non-numeric versions count as below the minimum.
 */
export const isAgentWitchBelowMinVersion = (
  installBundleVersion: string | null | undefined,
  minBundleVersion: string = AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
): boolean =>
  classifyAgentWitchLocalConnectVersion(
    installBundleVersion,
    minBundleVersion,
  ) === "too_old";
