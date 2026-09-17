export const AGENT_WITCH_MATERIALIZATION_LEDGER_FILE_NAME =
  "materialization.json";

export const AGENT_WITCH_PROJECT_BACKUPS_DIR_NAME = "backups";

export const AGENT_WITCH_PROJECT_DOT_GITIGNORE_FILE_NAME = ".gitignore";

export const AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION = 1;

export const harnessSetComponentId = (setSlug: string): string =>
  `harness-set:${setSlug.trim()}`;
