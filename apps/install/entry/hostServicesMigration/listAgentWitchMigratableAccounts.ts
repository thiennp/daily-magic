import fs from "node:fs";
import path from "node:path";

import { sanitizeProfileEmailForDir } from "@agent-witch/install-layout";
import { AGENT_WITCH_PROFILES_DIR_NAME } from "@agent-witch/install-layout/types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasProfileConfig = (profileDir: string): boolean => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(path.join(profileDir, "config.json"), "utf8"),
    );
    return isRecord(parsed);
  } catch {
    return false;
  }
};

/** Sanitized emails of `profiles/<dir>` that hold a paired config.json (sorted). */
export const listAgentWitchMigratableAccounts = (
  installDir: string,
): readonly string[] => {
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  const entries = fs.existsSync(profilesDir) ? fs.readdirSync(profilesDir) : [];
  return [
    ...new Set(
      entries
        .filter((entry) => hasProfileConfig(path.join(profilesDir, entry)))
        .map((entry) => sanitizeProfileEmailForDir(entry)),
    ),
  ].toSorted();
};
