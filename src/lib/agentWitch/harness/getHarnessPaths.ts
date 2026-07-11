import os from "node:os";
import path from "node:path";

import {
  HARNESS_MANIFEST_FILE_NAME,
  HARNESS_ROOT_DIR_NAME,
  HARNESS_SETS_DIR_NAME,
} from "./constants";

export const getAgentWitchInstallDir = (): string =>
  path.join(os.homedir(), ".agent-witch");

export const getHarnessRootDir = (): string =>
  path.join(getAgentWitchInstallDir(), HARNESS_ROOT_DIR_NAME);

export const getHarnessSetsDir = (): string =>
  path.join(getHarnessRootDir(), HARNESS_SETS_DIR_NAME);

export const getHarnessManifestPath = (): string =>
  path.join(getHarnessRootDir(), HARNESS_MANIFEST_FILE_NAME);

export const getHarnessSetDir = (slug: string): string =>
  path.join(getHarnessSetsDir(), slug);
