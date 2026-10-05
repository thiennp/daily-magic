import fs from "node:fs";
import path from "node:path";

import {
  PROJECT_HISTORY_DIR_MODE,
  PROJECT_HISTORY_FILE_MODE,
} from "./projectHistoryPaths.constant";

export const ensureDir0700 = (dirPath: string): void => {
  fs.mkdirSync(dirPath, { recursive: true, mode: PROJECT_HISTORY_DIR_MODE });
  try {
    fs.chmodSync(dirPath, PROJECT_HISTORY_DIR_MODE);
  } catch {
    // best effort on platforms that ignore mode
  }
};

/** Atomic write: temp file in the same dir, then rename. Mode 0600. */
export const atomicWriteFile0600 = (
  filePath: string,
  contents: string | Buffer,
): void => {
  ensureDir0700(path.dirname(filePath));
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, contents, { mode: PROJECT_HISTORY_FILE_MODE });
  try {
    fs.chmodSync(tmpPath, PROJECT_HISTORY_FILE_MODE);
  } catch {
    // best effort
  }
  fs.renameSync(tmpPath, filePath);
  try {
    fs.chmodSync(filePath, PROJECT_HISTORY_FILE_MODE);
  } catch {
    // best effort
  }
};
