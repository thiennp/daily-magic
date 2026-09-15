import path from "node:path";

import type { LocalHarnessRevealResult } from "./revealLocalHarnessCandidates.types";

export const normalizeLocalHarnessRevealResult = (
  reveal: LocalHarnessRevealResult,
): LocalHarnessRevealResult => ({
  scanRoots: reveal.scanRoots,
  sets: reveal.sets.map((set) => ({
    ...set,
    items: set.items.map((item) => {
      const relativePath =
        typeof item.relativePath === "string" && item.relativePath.length > 0
          ? item.relativePath
          : path
              .relative(set.sourceRoot, item.sourcePath)
              .replaceAll("\\", "/");

      return {
        ...item,
        relativePath,
        selected: item.selected ?? true,
      };
    }),
  })),
});
