import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  AGENT_WITCH_PROJECTS_DIR_NAME,
} from "@/lib/projects/constants";
import { AGENT_WITCH_PROD_INSTALL_DIR_NAME } from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const buildAgentWitchProjectsHomePath = (
  profileEmail: string,
  installDirName: string = AGENT_WITCH_PROD_INSTALL_DIR_NAME,
): string => {
  const normalizedEmail = profileEmail.trim().toLowerCase();

  return `~/${installDirName}/${AGENT_WITCH_PROFILES_DIR_NAME}/${normalizedEmail}/${AGENT_WITCH_PROJECTS_DIR_NAME}`;
};
