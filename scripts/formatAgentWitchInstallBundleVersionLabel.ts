import type { AgentWitchInstallVersionRecord } from "./agentWitchInstallVersion";

export const formatAgentWitchInstallBundleVersionLabel = (
  version: AgentWitchInstallVersionRecord | null,
): string => {
  const bundleVersion = version?.bundleVersion?.trim();
  return bundleVersion !== undefined && bundleVersion.length > 0
    ? bundleVersion
    : "unknown";
};
