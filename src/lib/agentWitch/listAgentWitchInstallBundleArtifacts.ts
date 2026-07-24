import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "@/lib/agentWitch/agentWitchInstallApp.constant";
import { buildAgentWitchInstallBundleRelativePath } from "@/lib/agentWitch/buildAgentWitchInstallBundleUrl";

/** Single shipped Mac client artifact downloaded on install/update. */
export const AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT = {
  relativePath: buildAgentWitchInstallBundleRelativePath(),
  fileName: AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  appDirName: AGENT_WITCH_APP_DIR_NAME,
} as const;

export const listAgentWitchInstallBundleArtifacts = (): readonly string[] => [
  AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath,
];
