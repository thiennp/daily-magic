import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const resolveHomeReal = (): string =>
  fs.realpathSync(path.resolve(os.homedir()));

export const resolveSafePathUnderHome = (inputPath: string): string | null => {
  const trimmed = inputPath.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const expanded = trimmed.startsWith("~")
    ? path.join(os.homedir(), trimmed.slice(1))
    : trimmed;

  let resolved: string;
  try {
    resolved = fs.realpathSync(path.resolve(expanded));
  } catch {
    return null;
  }

  const home = resolveHomeReal();
  if (resolved === home || resolved.startsWith(`${home}${path.sep}`)) {
    return resolved;
  }

  return null;
};

export const assertReadableFileUnderHome = (
  filePath: string,
): string | null => {
  const safe = resolveSafePathUnderHome(filePath);
  if (safe === null) {
    return null;
  }

  try {
    const stat = fs.statSync(safe);
    if (!stat.isFile()) {
      return null;
    }
  } catch {
    return null;
  }

  return safe;
};
