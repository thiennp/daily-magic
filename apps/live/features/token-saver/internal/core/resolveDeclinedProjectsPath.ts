import path from "node:path";

import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  type AgentWitchLocalLayout,
} from "@agent-witch/install-layout/types";

import { DECLINED_PROJECTS_FILE_NAME } from "./tokenSaverMarkers.constants";

/** D2: `…/profiles/<email>/declined-projects.json` (legacy root if no profile). */
export const resolveDeclinedProjectsPath = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): string => {
  if (layout.profileEmail !== null) {
    return path.join(
      layout.installDir,
      AGENT_WITCH_PROFILES_DIR_NAME,
      layout.profileEmail,
      DECLINED_PROJECTS_FILE_NAME,
    );
  }
  return path.join(layout.installDir, DECLINED_PROJECTS_FILE_NAME);
};
