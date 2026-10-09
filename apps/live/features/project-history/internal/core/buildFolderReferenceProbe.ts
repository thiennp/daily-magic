import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import type { DocReferenceProbe } from "./findBrokenDocReferences";

const readScripts = (folderPath: string): ReadonlySet<string> | null => {
  try {
    const pkg: unknown = JSON.parse(
      readFileSync(join(folderPath, "package.json"), "utf8"),
    );
    const scripts =
      typeof pkg === "object" && pkg !== null && "scripts" in pkg
        ? (pkg as { scripts?: unknown }).scripts
        : undefined;
    return typeof scripts === "object" && scripts !== null
      ? new Set(Object.keys(scripts))
      : null;
  } catch {
    return null;
  }
};

/** Reads the project folder once; fail-open: an unreadable folder flags nothing. */
export const buildFolderReferenceProbe = (
  folderPath: string,
): DocReferenceProbe => {
  const top = (() => {
    try {
      return new Set(readdirSync(folderPath));
    } catch {
      return new Set<string>();
    }
  })();
  return {
    exists: (rel) => existsSync(join(folderPath, rel)),
    hasTopLevel: (name) => top.has(name),
    scripts: readScripts(folderPath),
  };
};
