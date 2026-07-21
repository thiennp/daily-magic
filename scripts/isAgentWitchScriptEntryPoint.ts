import path from "node:path";
import { fileURLToPath } from "node:url";

export const isAgentWitchScriptEntryPoint = (moduleUrl: string): boolean => {
  const entry = process.argv[1];
  if (entry === undefined) {
    return false;
  }

  return path.resolve(entry) === fileURLToPath(moduleUrl);
};
