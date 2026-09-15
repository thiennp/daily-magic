import { resolveSafePathUnderHome } from "./pathSafety";
import {
  buildLocalHarnessCandidateSetFromCursorDir,
  iterateCursorDirectoriesUnderRoot,
} from "./buildLocalHarnessCandidateSet";

export type {
  LocalHarnessCandidateItem,
  LocalHarnessCandidateSet,
} from "./revealLocalHarnessCandidates.types";

export type { LocalHarnessRevealResult } from "./revealLocalHarnessCandidates.types";

import type {
  LocalHarnessCandidateSet,
  LocalHarnessRevealResult,
} from "./revealLocalHarnessCandidates.types";

export const LOCAL_HARNESS_REVEAL_MAX_DEPTH = 5;

export const revealLocalHarnessCandidates = (input: {
  readonly scanRoots: readonly string[];
  readonly maxDepth?: number;
}): LocalHarnessRevealResult => {
  const maxDepth = input.maxDepth ?? LOCAL_HARNESS_REVEAL_MAX_DEPTH;
  const cursorDirs = new Map<string, string>();

  for (const rootRaw of input.scanRoots) {
    const safeRoot = resolveSafePathUnderHome(rootRaw);
    if (safeRoot === null) {
      continue;
    }

    for (const cursorDir of iterateCursorDirectoriesUnderRoot(
      safeRoot,
      maxDepth,
      () => false,
    )) {
      const safeCursor = resolveSafePathUnderHome(cursorDir);
      if (safeCursor !== null) {
        cursorDirs.set(safeCursor, safeCursor);
      }
    }
  }

  const sets: LocalHarnessCandidateSet[] = [];

  for (const cursorDir of cursorDirs.values()) {
    const set = buildLocalHarnessCandidateSetFromCursorDir(cursorDir);
    if (set !== null) {
      sets.push(set);
    }
  }

  sets.sort((left, right) =>
    left.proposedName.localeCompare(right.proposedName),
  );

  const scanRoots = input.scanRoots
    .map((entry) => resolveSafePathUnderHome(entry))
    .filter((entry): entry is string => entry !== null);

  return { scanRoots, sets };
};
