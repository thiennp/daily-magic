import path from "node:path";

import {
  AGENT_WITCH_MATERIALIZATION_LEDGER_FILE_NAME,
  AGENT_WITCH_PROJECT_BACKUPS_DIR_NAME,
} from "./agentWitchMaterialization.constants";
import type { AgentWitchProjectStorageLayout } from "./resolveAgentWitchProjectStorageLayout";

export const resolveAgentWitchMaterializationPaths = (
  layout: AgentWitchProjectStorageLayout,
): {
  readonly ledgerFilePath: string;
  readonly backupsDirPath: string;
} => ({
  ledgerFilePath: path.join(
    layout.metaDirPath,
    AGENT_WITCH_MATERIALIZATION_LEDGER_FILE_NAME,
  ),
  backupsDirPath: path.join(
    layout.metaDirPath,
    AGENT_WITCH_PROJECT_BACKUPS_DIR_NAME,
  ),
});
