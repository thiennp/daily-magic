import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isAgentWitchBundled } from "./agentWitchBundled.constant";

/** Real path when it exists: `~/.local/bin/agent-witch` is a symlink to the bundle. */
const toRealPath = (filePath: string): string => {
  const resolved = path.resolve(filePath);
  try {
    return fs.realpathSync(resolved);
  } catch {
    return resolved;
  }
};

export const isAgentWitchScriptEntryPoint = (moduleUrl?: string): boolean => {
  const entry = process.argv[1];
  if (entry === undefined) {
    return false;
  }

  const realEntry = toRealPath(entry);

  if (isAgentWitchBundled()) {
    return realEntry === toRealPath(__filename);
  }

  if (moduleUrl === undefined) {
    return false;
  }

  return realEntry === toRealPath(fileURLToPath(moduleUrl));
};
