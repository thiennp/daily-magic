import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { resolveSafePathUnderHome } from "./pathSafety";

const DEFAULT_RELATIVE_SCAN_DIRS = [
  "daily-magic",
  "nrg-core",
  "Projects",
  "projects",
  "dev",
  "Developer",
  "code",
] as const;

export const buildDefaultLocalHarnessScanRoots = (): readonly string[] => {
  const home = os.homedir();
  const candidates = DEFAULT_RELATIVE_SCAN_DIRS.map((segment) =>
    path.join(home, segment),
  );

  const existing = candidates.filter((candidate) => {
    try {
      return fs.statSync(candidate).isDirectory();
    } catch {
      return false;
    }
  });

  const safeExisting = existing
    .map((entry) => resolveSafePathUnderHome(entry))
    .filter((entry): entry is string => entry !== null);

  if (safeExisting.length > 0) {
    return safeExisting;
  }

  const homeSafe = resolveSafePathUnderHome(home);
  return homeSafe !== null ? [homeSafe] : [];
};
