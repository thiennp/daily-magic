import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES,
  resolveAntigravityCliSettingsJsonPath,
} from "./antigravityCliHeadlessPermissions.constant";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readSettingsRoot = (filePath: string): Record<string, unknown> => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return isRecord(parsed) ? { ...parsed } : {};
  } catch {
    return {};
  }
};

const mergeAllowRules = (
  existingAllow: unknown,
  rulesToAdd: readonly string[],
): readonly string[] => {
  const allow = Array.isArray(existingAllow)
    ? existingAllow.filter(
        (entry): entry is string => typeof entry === "string",
      )
    : [];
  const merged = [...allow];
  for (const rule of rulesToAdd) {
    if (!merged.includes(rule)) {
      merged.push(rule);
    }
  }
  return merged;
};

export interface MergeAntigravityCliHeadlessPermissionsResult {
  readonly settingsPath: string;
  readonly wrote: boolean;
}

/**
 * Non-destructively merges AgentWitch headless allow rules into agy global
 * settings (`~/.gemini/antigravity-cli/settings.json`). Existing user rules are
 * preserved; only missing allow entries are appended.
 */
export const mergeAntigravityCliHeadlessPermissions = (
  homeDir: string = os.homedir(),
): MergeAntigravityCliHeadlessPermissionsResult => {
  const settingsPath = resolveAntigravityCliSettingsJsonPath(homeDir);
  const root = readSettingsRoot(settingsPath);
  const permissions = isRecord(root.permissions) ? { ...root.permissions } : {};
  const nextAllow = mergeAllowRules(
    permissions.allow,
    AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES,
  );
  const existingAllow = Array.isArray(permissions.allow)
    ? permissions.allow.filter(
        (entry): entry is string => typeof entry === "string",
      )
    : [];
  const wrote =
    nextAllow.length !== existingAllow.length ||
    nextAllow.some((rule, index) => rule !== existingAllow[index]);

  if (!wrote) {
    return { settingsPath, wrote: false };
  }

  fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
  const nextRoot = {
    ...root,
    permissions: {
      ...permissions,
      allow: [...nextAllow],
    },
  };
  fs.writeFileSync(
    settingsPath,
    `${JSON.stringify(nextRoot, null, 2)}\n`,
    "utf8",
  );
  return { settingsPath, wrote: true };
};
