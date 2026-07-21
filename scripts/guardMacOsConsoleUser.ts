import { MACOS_CONSOLE_USER_GUARD_INTERVAL_MS } from "./macOsConsoleUser.constants";
import { bootoutAgentWitchLaunchAgentsForCurrentUser } from "./bootoutAgentWitchLaunchAgentsForCurrentUser";
import { isActiveMacOsConsoleUser } from "./isActiveMacOsConsoleUser";

export const exitUnlessActiveMacOsConsoleUser = (scriptLabel: string): void => {
  if (isActiveMacOsConsoleUser()) {
    return;
  }

  bootoutAgentWitchLaunchAgentsForCurrentUser();
  process.stdout.write(
    `[${scriptLabel}] Skipping — this macOS account is not the active console user.\n`,
  );
  process.exit(0);
};

export const startActiveMacOsConsoleUserGuard = (
  onInactive: () => void,
  intervalMs: number = MACOS_CONSOLE_USER_GUARD_INTERVAL_MS,
): (() => void) => {
  if (process.platform !== "darwin") {
    return () => undefined;
  }

  const interval = setInterval(() => {
    if (!isActiveMacOsConsoleUser()) {
      onInactive();
    }
  }, intervalMs);

  return () => {
    clearInterval(interval);
  };
};
