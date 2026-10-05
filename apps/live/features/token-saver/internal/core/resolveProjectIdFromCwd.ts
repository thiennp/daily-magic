import fs from "node:fs";
import path from "node:path";

/** Same names as live-projects project storage (avoid cross-feature import). */
const META_DIR_NAME = ".agent-witch";
const META_FILE_NAME = "project.json";

const readProjectIdAt = (folderPath: string): string | null => {
  const metaPath = path.join(folderPath, META_DIR_NAME, META_FILE_NAME);
  if (!fs.existsSync(metaPath)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }
    const projectId = (parsed as { projectId?: unknown }).projectId;
    return typeof projectId === "string" && projectId.trim().length > 0
      ? projectId.trim()
      : null;
  } catch {
    return null;
  }
};

/** Walk cwd → parents for `.agent-witch/project.json` with a projectId. */
export const resolveProjectIdFromCwd = (cwd: string): string | null => {
  let current = path.resolve(cwd);
  for (;;) {
    const projectId = readProjectIdAt(current);
    if (projectId !== null) {
      return projectId;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
};
