import path from "node:path";

/** Folder label for a `.cursor` tree (e.g. `daily-magic`, or repo root when `.cursor` lives under `agents/`). */
export const resolveLocalHarnessGroupNameFromCursorDir = (
  cursorDir: string,
): string => {
  const cursorParentPath = path.dirname(cursorDir);
  const cursorParentName = path.basename(cursorParentPath);

  if (cursorParentName === "agents") {
    return path.basename(path.dirname(cursorParentPath));
  }

  return cursorParentName;
};

export const resolveLocalHarnessRepoPathFromCursorDir = (
  cursorDir: string,
): string => path.dirname(cursorDir);
