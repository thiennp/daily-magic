import path from "node:path";

import { AGENT_WITCH_PROFILES_DIR_NAME } from "@agent-witch/install-layout/types";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { TOKEN_SAVER_DB_FILE_NAME } from "./pitfall.constants";

/** Profile-scoped cache: `…/profiles/<email>/token-saver.db` (legacy root if no profile). */
export const resolveTokenSaverDbPath = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): string => {
  if (layout.profileEmail !== null) {
    return path.join(
      layout.installDir,
      AGENT_WITCH_PROFILES_DIR_NAME,
      layout.profileEmail,
      TOKEN_SAVER_DB_FILE_NAME,
    );
  }

  return path.join(layout.installDir, TOKEN_SAVER_DB_FILE_NAME);
};
