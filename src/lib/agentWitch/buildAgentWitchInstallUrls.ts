import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { isLocalAgentWitchOrigin } from "@/lib/agentWitch/resolveAgentWitchAppHome";

export {
  buildAppOrigin,
  buildAppOriginFromHeaders,
} from "@/lib/agentWitch/resolveAgentWitchAppOrigin";

const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

export const buildAgentWitchWsUrl = (origin: string): string => {
  const url = new URL(origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/api/agent-witch/ws";
  url.search = "";
  url.hash = "";
  return url.toString();
};

export const buildAgentWitchInstallScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch.sh`;

/** Localhost keeps same-origin DMG; every other host downloads from production. */
export const buildAgentWitchDmgDownloadUrl = (origin: string): string => {
  const downloadOrigin = isLocalAgentWitchOrigin(origin)
    ? normalizeOrigin(origin)
    : AGENT_WITCH_DEFAULT_ORIGIN;
  return `${downloadOrigin}/install/agent-witch.dmg`;
};

export const buildAgentWitchInstallAuxiliaryScriptUrl = (
  origin: string,
  scriptName: string,
): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/scripts/${scriptName}`;

export const buildAgentWitchClientScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/client.ts`;
