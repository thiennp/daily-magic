import path from "node:path";

import { ANTIGRAVITY_CLI_GEMINI_STATE_DIR } from "@/lib/agentWitch/antigravityCliAuthLocations.constant";

/**
 * Headless agy soft-denies `command` tools unless `permissions.allow` includes a
 * matching rule. With `--sandbox`, `command(*)` is the narrowest rule that still
 * permits varied shell invocations (per antigravity-cli#627); we merge it
 * non-destructively before each host run instead of `--dangerously-skip-permissions`.
 */
export const AGENT_WITCH_ANTIGRAVITY_HEADLESS_COMMAND_ALLOW_RULE = "command(*)";

export const AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES: readonly string[] =
  [AGENT_WITCH_ANTIGRAVITY_HEADLESS_COMMAND_ALLOW_RULE];

export const resolveAntigravityCliSettingsJsonPath = (
  homeDir: string,
): string =>
  path.join(homeDir, ANTIGRAVITY_CLI_GEMINI_STATE_DIR, "settings.json");
