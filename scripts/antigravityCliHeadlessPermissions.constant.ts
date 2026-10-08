import path from "node:path";

import { ANTIGRAVITY_CLI_GEMINI_STATE_DIR } from "@/lib/agentWitch/antigravityCliAuthLocations.constant";

export { AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES } from "./antigravityCliPermissionAllowRules";

export const resolveAntigravityCliSettingsJsonPath = (
  homeDir: string,
): string =>
  path.join(homeDir, ANTIGRAVITY_CLI_GEMINI_STATE_DIR, "settings.json");
