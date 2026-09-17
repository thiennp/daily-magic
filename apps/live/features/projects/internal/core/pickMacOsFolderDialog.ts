import { execFileSync } from "node:child_process";

export const pickMacOsFolderDialog = (): string | null => {
  if (process.platform !== "darwin") {
    return null;
  }

  try {
    const script =
      'POSIX path of (choose folder with prompt "Choose a folder to scan for .cursor harness files")';
    const output = execFileSync("/usr/bin/osascript", ["-e", script], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();

    return output.length > 0 ? output : null;
  } catch {
    return null;
  }
};
