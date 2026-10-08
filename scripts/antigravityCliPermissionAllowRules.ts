/**
 * Valid Antigravity CLI `permissions.allow` action names (agy 1.2.x).
 * @see https://antigravity.google/docs/cli/permissions/
 */
export const ANTIGRAVITY_CLI_PERMISSION_ACTION_NAMES = [
  "read_file",
  "write_file",
  "read_url",
  "execute_url",
  "command",
  "mcp",
  "unsandboxed",
] as const;

export type AntigravityCliPermissionActionName =
  (typeof ANTIGRAVITY_CLI_PERMISSION_ACTION_NAMES)[number];

const ACTION_NAME_SET = new Set<string>(
  ANTIGRAVITY_CLI_PERMISSION_ACTION_NAMES,
);

/** `action(target)` strings accepted by the Antigravity permissions engine. */
export const isValidAntigravityCliPermissionAllowRule = (
  rule: string,
): boolean => {
  const trimmed = rule.trim();
  const openParen = trimmed.indexOf("(");
  const closeParen = trimmed.lastIndexOf(")");
  if (openParen <= 0 || closeParen !== trimmed.length - 1) {
    return false;
  }
  const action = trimmed.slice(0, openParen);
  if (!ACTION_NAME_SET.has(action)) {
    return false;
  }
  const target = trimmed.slice(openParen + 1, closeParen);
  return target.length > 0;
};

/**
 * Rules merged before each headless agy run. `read(*)` and similar legacy shapes
 * are invalid and are stripped during merge (agy logs them as dropped).
 */
export const AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES: readonly string[] =
  ["read_file(*)", "write_file(*)", "command(*)", "mcp(*)"];

export const filterValidAntigravityCliPermissionAllowRules = (
  rules: readonly string[],
): readonly string[] =>
  rules.filter((rule) => isValidAntigravityCliPermissionAllowRule(rule));
