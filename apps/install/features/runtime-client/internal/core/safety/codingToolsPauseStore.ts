import fs from "node:fs";
import path from "node:path";

import {
  parseCodingToolsPauseFile,
  type CodingToolsPauseState,
} from "./parseCodingToolsPauseFile";

export const CODING_TOOLS_PAUSE_FILE_NAME = "coding-tools-pause.json";

/** Not JSON on purpose: parses as "unreadable" → paused (fail closed). */
const UNREADABLE_PAUSE_FILE = "unreadable";

/** Profile-scoped: sits next to the profile's `config.json`. */
export const resolveCodingToolsPausePath = (configPath: string): string =>
  path.join(path.dirname(configPath), CODING_TOOLS_PAUSE_FILE_NAME);

const readRawPauseFile = (filePath: string): string | null => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    // Missing file = not paused; any other read error fails closed.
    return code === "ENOENT" ? null : UNREADABLE_PAUSE_FILE;
  }
};

/** S0-7a local "Pause all coding tools" switch (local wins over cloud). */
export const readCodingToolsPause = (
  configPath: string,
): CodingToolsPauseState =>
  parseCodingToolsPauseFile(
    readRawPauseFile(resolveCodingToolsPausePath(configPath)),
  );

export const isCodingToolsPaused = (configPath: string): boolean =>
  readCodingToolsPause(configPath).paused;

/** Atomic 0600 write (tmp + rename). */
export const writeCodingToolsPause = (
  configPath: string,
  paused: boolean,
  now: Date = new Date(),
): CodingToolsPauseState => {
  const filePath = resolveCodingToolsPausePath(configPath);
  const state: CodingToolsPauseState = {
    paused,
    updatedAt: now.toISOString(),
  };
  fs.mkdirSync(path.dirname(filePath), { recursive: true, mode: 0o700 });
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(state)}\n`, { mode: 0o600 });
  fs.renameSync(tmpPath, filePath);
  return state;
};
