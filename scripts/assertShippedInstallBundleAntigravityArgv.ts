import fs from "node:fs";

import { resolveAgentWitchInstallBundleOutfile } from "@agent-witch/install-bundle";

const CLAUDE_SHAPED_ANTIGRAVITY_ARGV_SNIPPET =
  '"-p","--dangerously-skip-permissions"';

/**
 * S0-4 argv is `--sandbox -p <prompt>`. Bundle 267 ships it, so the legacy
 * `--dangerously-skip-permissions` shape is no longer accepted: a stale
 * shipped bundle fails here.
 */
const CORRECT_ANTIGRAVITY_ARGV_SNIPPETS = [
  '"--sandbox","-p"',
  '"--sandbox", "-p"',
] as const;

/** Any permission-bypass flag in the shipped bundle means it is stale. */
const LEGACY_PERMISSION_BYPASS_ARGV_SNIPPET =
  '"--dangerously-skip-permissions"';

const HEADLESS_COMMAND_ALLOW_RULE_SNIPPET = "command(*)";
const HEADLESS_READ_FILE_ALLOW_RULE_SNIPPET = "read_file(*)";

export const assertShippedInstallBundleAntigravityArgv = (
  workspaceRoot: string,
): void => {
  const bundlePath = resolveAgentWitchInstallBundleOutfile(workspaceRoot);
  const source = fs.readFileSync(bundlePath, "utf8");

  if (source.includes(CLAUDE_SHAPED_ANTIGRAVITY_ARGV_SNIPPET)) {
    throw new Error(
      `Shipped install bundle still contains Claude-shaped antigravity argv (${CLAUDE_SHAPED_ANTIGRAVITY_ARGV_SNIPPET}). Rebuild with npm run build:agent-witch and bump AGENT_WITCH_INSTALL_BUNDLE_VERSION.`,
    );
  }

  if (source.includes(LEGACY_PERMISSION_BYPASS_ARGV_SNIPPET)) {
    throw new Error(
      `Shipped install bundle still contains ${LEGACY_PERMISSION_BYPASS_ARGV_SNIPPET} argv. Rebuild with npm run build:agent-witch and bump AGENT_WITCH_INSTALL_BUNDLE_VERSION.`,
    );
  }

  const hasCorrectArgv = CORRECT_ANTIGRAVITY_ARGV_SNIPPETS.some((snippet) =>
    source.includes(snippet),
  );
  if (!hasCorrectArgv) {
    throw new Error(
      "Shipped install bundle is missing expected antigravity argv (--sandbox before -p).",
    );
  }

  if (!source.includes(HEADLESS_COMMAND_ALLOW_RULE_SNIPPET)) {
    throw new Error(
      `Shipped install bundle is missing Antigravity headless permissions allow rule (${HEADLESS_COMMAND_ALLOW_RULE_SNIPPET}). Rebuild with npm run build:agent-witch and bump AGENT_WITCH_INSTALL_BUNDLE_VERSION.`,
    );
  }

  if (!source.includes(HEADLESS_READ_FILE_ALLOW_RULE_SNIPPET)) {
    throw new Error(
      `Shipped install bundle is missing Antigravity headless read_file allow rule (${HEADLESS_READ_FILE_ALLOW_RULE_SNIPPET}). Rebuild with npm run build:agent-witch and bump AGENT_WITCH_INSTALL_BUNDLE_VERSION.`,
    );
  }
};
