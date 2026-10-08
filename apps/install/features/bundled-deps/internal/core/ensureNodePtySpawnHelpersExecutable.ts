import fs from "node:fs";
import path from "node:path";

const EXECUTABLE_MODE = 0o755;
const EXEC_BITS = 0o111;

/**
 * node-pty's prebuilt `spawn-helper` ships without the execute bit, which makes
 * `posix_spawnp` fail and every PTY run fall back to a pipe. Returns the helper
 * files that were fixed. Safe to call repeatedly.
 */
export const ensureNodePtySpawnHelpersExecutable = (
  depsDir: string,
): readonly string[] => {
  const prebuildsDir = path.join(depsDir, "node-pty", "prebuilds");
  if (!fs.existsSync(prebuildsDir)) {
    return [];
  }

  const fixed: string[] = [];
  for (const entry of fs.readdirSync(prebuildsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const helperPath = path.join(prebuildsDir, entry.name, "spawn-helper");
    try {
      const { mode } = fs.statSync(helperPath);
      if ((mode & EXEC_BITS) !== EXEC_BITS) {
        fs.chmodSync(helperPath, EXECUTABLE_MODE);
        fixed.push(helperPath);
      }
    } catch {
      // no helper for this architecture
    }
  }
  return fixed;
};
