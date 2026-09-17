import path from "node:path";
import { fileURLToPath } from "node:url";

const isAgentWitchBundled = (): boolean =>
  process.env.AGENT_WITCH_BUNDLED === "1";

/** Directory containing `agent-witch.js` (the install `app/` folder when bundled). */
export const resolveAgentWitchBundleAppDir = (): string => {
  if (isAgentWitchBundled()) {
    const entry = process.argv[1];
    if (entry !== undefined && entry.trim().length > 0) {
      return path.dirname(path.resolve(entry));
    }
  }

  return path.dirname(fileURLToPath(import.meta.url));
};
