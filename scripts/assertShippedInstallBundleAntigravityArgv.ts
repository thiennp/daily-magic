import fs from "node:fs";

import { resolveAgentWitchInstallBundleOutfile } from "@agent-witch/install-bundle";

const CLAUDE_SHAPED_ANTIGRAVITY_ARGV_SNIPPET =
  '"-p","--dangerously-skip-permissions"';

/**
 * S0-4 argv is `--sandbox -p <prompt>`. The legacy bypass shape stays accepted
 * until AW Mac rebuilds the shipped bundle (public/install/... is not rebuilt
 * in the safety branch); either way -p is never followed by another flag.
 */
const CORRECT_ANTIGRAVITY_ARGV_SNIPPETS = [
  '"--sandbox","-p"',
  '"--sandbox", "-p"',
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
      "Shipped install bundle is missing expected antigravity argv (--sandbox before -p).",
    );
  }
};
