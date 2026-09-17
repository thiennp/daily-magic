import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");

export const toRepoRelativePath = (
  absolutePath: string,
  cwd?: string,
): string | null => {
  const normalized = path.normalize(absolutePath);
  const root = path.normalize(cwd ?? REPO_ROOT);
  if (normalized.startsWith(root)) {
    return path.relative(root, normalized).replace(/\\/g, "/");
  }
  if (normalized.startsWith(REPO_ROOT)) {
    return path.relative(REPO_ROOT, normalized).replace(/\\/g, "/");
  }
  return null;
};

export const shouldArchitectureCheck = (repoRelative: string): boolean =>
  repoRelative.startsWith("src/") &&
  (repoRelative.endsWith(".ts") || repoRelative.endsWith(".tsx"));

export const runArchitectureOnFile = (repoRelative: string): string | null => {
  try {
    execSync(`npm run cursor:architecture -- "${repoRelative}"`, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return null;
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string };
    const stdout = err.stdout ?? "";
    const stderr = err.stderr ?? "";
    const combined = `${stdout}\n${stderr}`.trim();
    return combined.length > 0
      ? combined
      : `architecture-check failed for ${repoRelative}`;
  }
};
