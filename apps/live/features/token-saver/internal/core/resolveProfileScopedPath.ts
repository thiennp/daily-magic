import path from "node:path";

import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  type AgentWitchLocalLayout,
} from "@agent-witch/install-layout/types";

/**
 * Profile-scoped file under the install dir:
 * `…/profiles/<email>/<fileName>` (legacy install root when no profile).
 */
export const resolveProfileScopedPath = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
  fileName: string,
): string =>
  layout.profileEmail !== null
    ? path.join(
        layout.installDir,
        AGENT_WITCH_PROFILES_DIR_NAME,
        layout.profileEmail,
        fileName,
      )
    : path.join(layout.installDir, fileName);
