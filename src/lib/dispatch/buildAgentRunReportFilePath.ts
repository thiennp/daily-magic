import path from "node:path";

import { AGENT_WITCH_PROJECT_RUN_REPORT_FILE_EXTENSION } from "@/lib/projects/agentWitchProjectStorage.constants";

export const buildAgentRunReportFilePath = (
  reportsDir: string,
  reportKey: string,
): string =>
  path.join(
    reportsDir.trim(),
    `${reportKey.trim()}${AGENT_WITCH_PROJECT_RUN_REPORT_FILE_EXTENSION}`,
  );
