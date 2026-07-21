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

export const buildAgentWitchInstallScriptUrlWithToken = (
  origin: string,
  input: {
    readonly pairingToken: string;
    readonly profileEmail?: string;
  },
): string => {
  const url = new URL(buildAgentWitchInstallScriptUrl(origin));
  url.searchParams.set("token", input.pairingToken);
  const profileEmail = input.profileEmail?.trim().toLowerCase();
  if (profileEmail !== undefined && profileEmail.length > 0) {
    url.searchParams.set("email", profileEmail);
  }
  return url.toString();
};

export const buildAgentWitchInstallAuxiliaryScriptUrl = (
  origin: string,
  scriptName: string,
): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/scripts/${scriptName}`;

export const buildAgentWitchClientScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/client.ts`;
