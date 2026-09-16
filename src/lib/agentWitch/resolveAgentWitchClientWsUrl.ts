import path from "node:path";

import { AGENT_WITCH_PRODUCTION_WS_URL } from "@/lib/agentWitch/constants";
import {
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

const LOCAL_DEV_WS_URL = "ws://localhost:3000/api/agent-witch/ws";

const normalizeWsUrl = (value: string): string => value.replace(/\/$/, "");

export const resolveAgentWitchClientWsUrl = (input: {
  readonly installDir: string;
  readonly configWsUrl?: string;
}): string => {
  const envWsUrl = process.env.AGENT_WITCH_WS_URL?.trim();
  if (envWsUrl !== undefined && envWsUrl.length > 0) {
    return normalizeWsUrl(envWsUrl);
  }

  const installBase = path.basename(input.installDir);
  if (installBase === AGENT_WITCH_PROD_INSTALL_DIR_NAME) {
    return AGENT_WITCH_PRODUCTION_WS_URL;
  }

  const configWsUrl = input.configWsUrl?.trim() ?? "";
  if (installBase === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME) {
    if (configWsUrl.length > 0) {
      return normalizeWsUrl(configWsUrl);
    }
    return LOCAL_DEV_WS_URL;
  }

  if (configWsUrl.length > 0) {
    return normalizeWsUrl(configWsUrl);
  }

  return AGENT_WITCH_PRODUCTION_WS_URL;
};
