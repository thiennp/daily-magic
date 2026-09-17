import path from "node:path";

import {
  AWI_REPO_PUBLIC_INSTALL_RELATIVE_PATH,
  AWI_SHIPPED_APP_DIR_NAME,
  AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
} from "../../public-api/types";

export const resolveAgentWitchShippedInstallBundleRootDir = (
  workspaceRoot: string,
): string => path.join(workspaceRoot, AWI_REPO_PUBLIC_INSTALL_RELATIVE_PATH);

export const resolveAgentWitchShippedInstallBundleAppDir = (
  workspaceRoot: string,
): string =>
  path.join(
    resolveAgentWitchShippedInstallBundleRootDir(workspaceRoot),
    AWI_SHIPPED_APP_DIR_NAME,
  );

export const resolveAgentWitchInstallBundleOutfile = (
  workspaceRoot: string,
): string =>
  path.join(
    resolveAgentWitchShippedInstallBundleAppDir(workspaceRoot),
    AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
  );
