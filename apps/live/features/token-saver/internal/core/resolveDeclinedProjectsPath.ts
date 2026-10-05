import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { resolveProfileScopedPath } from "./resolveProfileScopedPath";
import { DECLINED_PROJECTS_FILE_NAME } from "./tokenSaverMarkers.constants";

/** D2: `…/profiles/<email>/declined-projects.json` (legacy root if no profile). */
export const resolveDeclinedProjectsPath = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): string => resolveProfileScopedPath(layout, DECLINED_PROJECTS_FILE_NAME);
