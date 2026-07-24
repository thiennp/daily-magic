import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
  AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME,
} from "@/lib/agentWitch/agentWitchInstallApp.constant";

const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

export const buildAgentWitchInstallBundleUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_APP_BUNDLE_FILE_NAME}`;

export const buildAgentWitchInstallDepsArchiveUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME}`;

export const buildAgentWitchInstallBundleRelativePath = (): string =>
  `${AGENT_WITCH_APP_DIR_NAME}/${AGENT_WITCH_APP_BUNDLE_FILE_NAME}`;
