import fs from "node:fs";
import path from "node:path";

const linkedProjectId = (dir: string): string | null => {
  try {
    const meta = JSON.parse(
      fs.readFileSync(path.join(dir, ".agent-witch", "project.json"), "utf8"),
    ) as { projectId?: unknown };
    return typeof meta.projectId === "string" ? meta.projectId : null;
  } catch {
    return null;
  }
};

/** Project folder root: nearest ancestor of cwd linked to `projectId`. */
export const findProjectFolderRoot = (
  cwdReal: string,
  projectId: string,
): string | null => {
  for (let dir = cwdReal; ; dir = path.dirname(dir)) {
    if (linkedProjectId(dir) === projectId) {
      return dir;
    }
    if (path.dirname(dir) === dir) {
      return null;
    }
  }
};
