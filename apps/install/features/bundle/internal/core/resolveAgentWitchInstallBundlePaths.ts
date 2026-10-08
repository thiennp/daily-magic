import path from "node:path";

import {
  AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE_ENV,
  AWI_REPO_PUBLIC_INSTALL_RELATIVE_PATH,
  AWI_SHIPPED_APP_DIR_NAME,
  AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
  AWI_VERIFY_INSTALL_BUNDLE_RELATIVE_PATH,
} from "../../public-api/types";

type EnvLookup = Readonly<Record<string, string | undefined>>;

export const shouldWriteShippedAgentWitchInstallBundle = (
  env: EnvLookup = process.env,
): boolean => env[AGENT_WITCH_WRITE_SHIPPED_INSTALL_BUNDLE_ENV] === "1";

export const resolveAgentWitchShippedInstallBundleRootDir = (
  workspaceRoot: string,
): string => path.join(workspaceRoot, AWI_REPO_PUBLIC_INSTALL_RELATIVE_PATH);

export const resolveAgentWitchVerifyInstallBundleAppDir = (
  workspaceRoot: string,
): string =>
  path.join(
    workspaceRoot,
    AWI_VERIFY_INSTALL_BUNDLE_RELATIVE_PATH,
    AWI_SHIPPED_APP_DIR_NAME,
  );

export const resolveAgentWitchShippedInstallBundleAppDir = (
  workspaceRoot: string,
): string =>
  path.join(
    resolveAgentWitchShippedInstallBundleRootDir(workspaceRoot),
    AWI_SHIPPED_APP_DIR_NAME,
  );

/** App dir for the next `build:agent-witch` (verify cache vs shipped tree). */
export const resolveAgentWitchInstallBundleAppDir = (
  workspaceRoot: string,
  env: EnvLookup = process.env,
): string =>
  shouldWriteShippedAgentWitchInstallBundle(env)
    ? resolveAgentWitchShippedInstallBundleAppDir(workspaceRoot)
    : resolveAgentWitchVerifyInstallBundleAppDir(workspaceRoot);

export const resolveAgentWitchInstallBundleOutfile = (
  workspaceRoot: string,
  env: EnvLookup = process.env,
): string =>
  path.join(
    resolveAgentWitchInstallBundleAppDir(workspaceRoot, env),
    AWI_SHIPPED_MAIN_SCRIPT_FILE_NAME,
  );
