import type { AgentWitchInstallVersionRecord } from "@agent-witch/install-self-update/types";

export const formatAgentWitchInstallBundleVersionLabel = (
  version: AgentWitchInstallVersionRecord | null,
): string => {
  const bundleVersion = version?.bundleVersion?.trim();
  return bundleVersion !== undefined && bundleVersion.length > 0
    ? bundleVersion
    : "unknown";
};
