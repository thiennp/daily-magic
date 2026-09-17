import path from "node:path";

import {
  AGENT_WITCH_COMPONENT_INSTALLED_FILE_NAME,
  AGENT_WITCH_COMPONENT_STORE_DIR_NAME,
  AGENT_WITCH_COMPONENT_VERSIONS_DIR_NAME,
  AGENT_WITCH_COMPONENTS_DIR_NAME,
} from "./componentStore.constants";

export const resolveAgentWitchComponentStorePaths = (
  installDir: string,
): {
  readonly componentsRootDir: string;
  readonly storeDir: string;
  readonly versionsDir: string;
  readonly installedFilePath: string;
} => {
  const componentsRootDir = path.join(
    installDir,
    AGENT_WITCH_COMPONENTS_DIR_NAME,
  );

  return {
    componentsRootDir,
    storeDir: path.join(
      componentsRootDir,
      AGENT_WITCH_COMPONENT_STORE_DIR_NAME,
    ),
    versionsDir: path.join(
      componentsRootDir,
      AGENT_WITCH_COMPONENT_VERSIONS_DIR_NAME,
    ),
    installedFilePath: path.join(
      componentsRootDir,
      AGENT_WITCH_COMPONENT_INSTALLED_FILE_NAME,
    ),
  };
};
