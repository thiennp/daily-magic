import fs from "node:fs";
import path from "node:path";

import {
  ANTIGRAVITY_CLI_GEMINI_STATE_DIR,
  ANTIGRAVITY_CLI_LEGACY_CREDENTIALS_RELATIVE_PATH,
  ANTIGRAVITY_CLI_OAUTH_TOKEN_FILENAME,
} from "@/lib/agentWitch/antigravityCliAuthLocations.constant";

const isNonEmptyFile = (filePath: string): boolean => {
  try {
    const stat = fs.statSync(filePath);
    return stat.isFile() && stat.size > 0;
  } catch {
    return false;
  }
};

/** Detects Antigravity CLI sign-in using real agy 1.2.x token locations (not only legacy agy config). */
export const resolveAntigravityCliOAuthTokenPresent = (
  homeDir: string,
): boolean => {
  const trimmedHome = homeDir.trim();
  if (trimmedHome.length === 0) {
    return false;
  }

  const geminiTokenPath = path.join(
    trimmedHome,
    ANTIGRAVITY_CLI_GEMINI_STATE_DIR,
    ANTIGRAVITY_CLI_OAUTH_TOKEN_FILENAME,
  );
  if (isNonEmptyFile(geminiTokenPath)) {
    return true;
  }

  const legacyCredentialsPath = path.join(
    trimmedHome,
    ANTIGRAVITY_CLI_LEGACY_CREDENTIALS_RELATIVE_PATH,
  );
  return isNonEmptyFile(legacyCredentialsPath);
};
