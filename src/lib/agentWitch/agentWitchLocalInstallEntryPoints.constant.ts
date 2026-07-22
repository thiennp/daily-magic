/** Scripts executed via tsx from ~/.agent-witch after install. */
export const AGENT_WITCH_LOCAL_INSTALL_ENTRY_POINTS = [
  "agent-witch.ts",
  "agent-witch-watchdog.ts",
  "agent-witch-wake-cli.ts",
  "agent-witch-self-update.ts",
  "agent-witch-automation-scheduler.ts",
] as const;
