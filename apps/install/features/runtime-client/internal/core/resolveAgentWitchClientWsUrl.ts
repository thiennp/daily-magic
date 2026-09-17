import path from "node:path";

import { AGENT_WITCH_PRODUCTION_WS_URL } from "@agent-witch/shared/network";
import { AWI_INSTALL_ROOT_DIR_NAMES } from "@agent-witch/install-layout/types";

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
  if (installBase === AWI_INSTALL_ROOT_DIR_NAMES.production) {
    return AGENT_WITCH_PRODUCTION_WS_URL;
  }

  const configWsUrl = input.configWsUrl?.trim() ?? "";
  if (installBase === AWI_INSTALL_ROOT_DIR_NAMES.localhost) {
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
