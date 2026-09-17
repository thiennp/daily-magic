import path from "node:path";

import type { ServerResponse } from "node:http";

import {
  buildLocalHarnessCandidateSetFromCursorDir,
  iterateCursorDirectoriesUnderRoot,
} from "./buildLocalHarnessCandidateSet";
import { resolveSafePathUnderHome } from "./pathSafety";
import { resolveLocalHarnessGroupNameFromCursorDir } from "./resolveLocalHarnessGroupNameFromCursorDir";
import type { LocalHarnessRevealResult } from "./revealLocalHarnessCandidates.types";

export const LOCAL_HARNESS_REVEAL_MAX_DEPTH = 5;

const writeSseEvent = (
  response: ServerResponse,
  event: string,
  data: unknown,
): void => {
  response.write(`event: ${event}\n`);
  response.write(`data: ${JSON.stringify(data)}\n\n`);
};

export const streamLocalHarnessReveal = (input: {
  readonly scanRoot: string;
  readonly response: ServerResponse;
  readonly shouldAbort: () => boolean;
}): LocalHarnessRevealResult => {
  const safeRoot = resolveSafePathUnderHome(input.scanRoot.trim());
  if (safeRoot === null) {
    writeSseEvent(input.response, "error", {
      errorMessage: "Choose a folder under your home directory.",
    });
    return { scanRoots: [], sets: [] };
  }

  const sets: LocalHarnessRevealResult["sets"][number][] = [];
  let stopped = false;

  for (const cursorDir of iterateCursorDirectoriesUnderRoot(
    safeRoot,
    LOCAL_HARNESS_REVEAL_MAX_DEPTH,
    input.shouldAbort,
  )) {
    if (input.shouldAbort()) {
      stopped = true;
      break;
    }

    const safeCursor = resolveSafePathUnderHome(cursorDir);
    if (safeCursor === null) {
      continue;
    }

    const groupName = resolveLocalHarnessGroupNameFromCursorDir(safeCursor);

    writeSseEvent(input.response, "folder", {
      cursorDir: safeCursor,
      groupName,
      repoPath: path.dirname(safeCursor),
    });

    const set = buildLocalHarnessCandidateSetFromCursorDir(safeCursor);
    if (set !== null) {
      sets.push(set);
      writeSseEvent(input.response, "set", {
        proposedSlug: set.proposedSlug,
        proposedName: set.proposedName,
        groupName,
        itemCount: set.items.length,
        sourceRoot: set.sourceRoot,
        tree: set.items.map((item) => item.relativePath),
      });
    }
  }

  if (input.shouldAbort()) {
    stopped = true;
  }

  const reveal: LocalHarnessRevealResult = {
    scanRoots: [safeRoot],
    sets: sets.toSorted((left, right) =>
      left.proposedName.localeCompare(right.proposedName),
    ),
  };

  writeSseEvent(input.response, stopped ? "stopped" : "done", {
    setCount: reveal.sets.length,
    stopped,
  });

  return reveal;
};
