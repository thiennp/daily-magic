import fs from "node:fs";
import path from "node:path";

import { buildLocalHarnessCandidateSetFromCursorDir } from "./buildLocalHarnessCandidateSet";
import { resolveSafePathUnderHome } from "./pathSafety";
import type { LocalHarnessRevealResult } from "./revealLocalHarnessCandidates.types";

export const resolveCursorDirFromUserPath = (
  userPath: string,
): string | null => {
  const safePath = resolveSafePathUnderHome(userPath.trim());
  if (safePath === null) {
    return null;
  }

  if (path.basename(safePath) === ".cursor") {
    return safePath;
  }

  const nestedCursorDir = path.join(safePath, ".cursor");
  try {
    if (fs.statSync(nestedCursorDir).isDirectory()) {
      return resolveSafePathUnderHome(nestedCursorDir);
    }
  } catch {
    return null;
  }

  return null;
};

export const mergeLocalHarnessRevealWithCursorDir = (input: {
  readonly reveal: LocalHarnessRevealResult | null;
  readonly projectPath: string;
}): LocalHarnessRevealResult | null => {
  const cursorDir = resolveCursorDirFromUserPath(input.projectPath);
  if (cursorDir === null) {
    return null;
  }

  const set = buildLocalHarnessCandidateSetFromCursorDir(cursorDir);
  if (set === null) {
    return null;
  }

  const existing = input.reveal ?? { scanRoots: [], sets: [] };
  const setsWithoutDuplicate = existing.sets.filter(
    (entry) => entry.sourceRoot !== set.sourceRoot,
  );
  const sets = [...setsWithoutDuplicate, set].toSorted((left, right) =>
    left.proposedName.localeCompare(right.proposedName),
  );

  return {
    scanRoots: existing.scanRoots,
    sets,
  };
};
