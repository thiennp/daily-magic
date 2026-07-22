import path from "node:path";

import {
  AGENT_WITCH_PROJECT_META_DIR_NAME,
  AGENT_WITCH_PROJECT_REPORTS_DIR_NAME,
  AGENT_WITCH_PROJECT_RUN_REPORT_FILE_EXTENSION,
} from "@/lib/projects/agentWitchProjectStorage.constants";

export const buildAgentRunReportFilePath = (
  projectFolderPath: string,
  agentRunId: string,
): string =>
  path.join(
    projectFolderPath.trim(),
    AGENT_WITCH_PROJECT_META_DIR_NAME,
    AGENT_WITCH_PROJECT_REPORTS_DIR_NAME,
    `${agentRunId.trim()}${AGENT_WITCH_PROJECT_RUN_REPORT_FILE_EXTENSION}`,
  );
