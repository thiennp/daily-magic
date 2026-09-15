import path from "node:path";
import { fileURLToPath } from "node:url";

import { isAgentWitchBundled } from "./agentWitchBundled.constant";

export const isAgentWitchScriptEntryPoint = (moduleUrl: string): boolean => {
  const entry = process.argv[1];
  if (entry === undefined) {
    return false;
  }

  const resolvedEntry = path.resolve(entry);

  if (isAgentWitchBundled()) {
    return resolvedEntry === path.resolve(__filename);
  }

  return resolvedEntry === fileURLToPath(moduleUrl);
};
