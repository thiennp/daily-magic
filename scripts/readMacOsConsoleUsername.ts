import { execFileSync } from "node:child_process";

import { INVALID_MACOS_CONSOLE_USERNAMES } from "./macOsConsoleUser.constants";

const normalizeMacOsUsername = (username: string): string =>
  username.trim().toLowerCase();

export const isValidMacOsConsoleUsername = (
  username: string | null | undefined,
): username is string => {
  if (username === null || username === undefined) {
    return false;
  }

  return !INVALID_MACOS_CONSOLE_USERNAMES.has(normalizeMacOsUsername(username));
};

export const readMacOsConsoleUsernameSync = (): string | null => {
  if (process.platform !== "darwin") {
    return null;
  }

  try {
    const stdout = execFileSync("stat", ["-f", "%Su", "/dev/console"], {
      encoding: "utf8",
    });
    const username = stdout.trim();
    return isValidMacOsConsoleUsername(username) ? username : null;
  } catch {
    return null;
  }
};
