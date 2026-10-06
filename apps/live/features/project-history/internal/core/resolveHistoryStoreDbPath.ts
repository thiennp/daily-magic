import path from "node:path";

import {
  PROJECT_HISTORY_INDEX_DIR_NAME,
  PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

/** `<projectDataDir>/index/store.db` — sibling of `history/`. */
export const resolveHistoryStoreDbPath = (projectId: string): string =>
  path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_INDEX_DIR_NAME,
    PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
  );
