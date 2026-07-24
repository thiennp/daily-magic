import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_ERROR_LOG_FILE_NAME,
  AGENT_WITCH_LOGS_DIR_NAME,
  AGENT_WITCH_MAIN_LOG_FILE_NAME,
  resolveAgentWitchLocalLayout,
  type AgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";

const moveLogFileIfPresent = (sourcePath: string, targetPath: string): void => {
  if (!fs.existsSync(sourcePath) || fs.existsSync(targetPath)) {
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.renameSync(sourcePath, targetPath);
};

export const migrateLegacyAgentWitchInstallLogs = (
  layout: AgentWitchLocalLayout,
): void => {
  if (layout.profileEmail === null) {
    return;
  }

  const legacyLogsDir = path.join(layout.installDir, AGENT_WITCH_LOGS_DIR_NAME);
  moveLogFileIfPresent(
    path.join(legacyLogsDir, AGENT_WITCH_MAIN_LOG_FILE_NAME),
    layout.mainLogPath,
  );
  moveLogFileIfPresent(
    path.join(legacyLogsDir, AGENT_WITCH_ERROR_LOG_FILE_NAME),
    layout.errorLogPath,
  );
};

export const migrateLegacyAgentWitchInstallLogsForActiveProfiles = (
  installDir?: string,
): void => {
  const layout = resolveAgentWitchLocalLayout();
  if (installDir !== undefined && layout.installDir !== installDir) {
    return;
  }

  migrateLegacyAgentWitchInstallLogs(layout);
};
