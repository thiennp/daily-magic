import os from "node:os";

import { readMacOsConsoleUsernameSync } from "./readMacOsConsoleUsername";

export interface ActiveMacOsConsoleUserInput {
  readonly platform?: NodeJS.Platform;
  readonly consoleUsername?: string | null;
  readonly currentUsername?: string;
}

const normalizeMacOsUsername = (username: string): string =>
  username.trim().toLowerCase();

export const isActiveMacOsConsoleUser = (
  input?: ActiveMacOsConsoleUserInput,
): boolean => {
  const platform = input?.platform ?? process.platform;
  if (platform !== "darwin") {
    return true;
  }

  const consoleUsername =
    input?.consoleUsername === undefined
      ? readMacOsConsoleUsernameSync()
      : input.consoleUsername;
  if (consoleUsername === null) {
    return false;
  }

  const currentUsername = input?.currentUsername ?? os.userInfo().username;
  return (
    normalizeMacOsUsername(consoleUsername) ===
    normalizeMacOsUsername(currentUsername)
  );
};
