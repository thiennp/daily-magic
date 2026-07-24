import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

/** @deprecated Install ships a single bundled JS file under app/. */
export const listAgentWitchInstallScriptNames = (): readonly string[] => [
  AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath,
];
