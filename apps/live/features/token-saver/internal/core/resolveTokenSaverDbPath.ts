import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { TOKEN_SAVER_DB_FILE_NAME } from "./pitfall.constants";
import { resolveProfileScopedPath } from "./resolveProfileScopedPath";

/** Profile-scoped cache: `…/profiles/<email>/token-saver.db` (legacy root if no profile). */
export const resolveTokenSaverDbPath = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): string => resolveProfileScopedPath(layout, TOKEN_SAVER_DB_FILE_NAME);
