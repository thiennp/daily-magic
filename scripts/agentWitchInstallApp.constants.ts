/** Bundled Mac client lives under ~/.agent-witch/app/ */
export const AGENT_WITCH_APP_DIR_NAME = "app";

export const AGENT_WITCH_APP_BUNDLE_FILE_NAME = "agent-witch.js";

/** Shell wrappers live under ~/.agent-witch/app/command/ */
export const AGENT_WITCH_COMMAND_DIR_NAME = "command";

export const buildAgentWitchInstallCommandRelativePath = (): string =>
  `${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}`;
