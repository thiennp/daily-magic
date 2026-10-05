import fs from "node:fs";

import { resolveAgentWitchInstallBundleOutfile } from "@agent-witch/install-bundle";

const CLAUDE_SHAPED_ANTIGRAVITY_ARGV_SNIPPET =
  '"-p","--dangerously-skip-permissions"';

const CORRECT_ANTIGRAVITY_ARGV_SNIPPETS = [
  '"--dangerously-skip-permissions","-p"',
  '"--dangerously-skip-permissions", "-p"',
] as const;

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

  const hasCorrectArgv = CORRECT_ANTIGRAVITY_ARGV_SNIPPETS.some((snippet) =>
    source.includes(snippet),
  );
  if (!hasCorrectArgv) {
    throw new Error(
      "Shipped install bundle is missing expected antigravity argv (--dangerously-skip-permissions before -p).",
    );
  }
};
