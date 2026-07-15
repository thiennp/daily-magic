import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "@/lib/agentWitch/agentWitchDeviceAuth.constant";

export interface AgentWitchDeviceAuthContext {
  readonly device: AgentWitchDeviceRecord;
  readonly pairingToken: string;
}

const readPairingToken = (request: Request): string | null => {
  const fromHeader = request.headers
    .get(AGENT_WITCH_PAIRING_TOKEN_HEADER)
    ?.trim();
  if (fromHeader !== undefined && fromHeader.length > 0) {
    return fromHeader;
  }

  const authorization = request.headers.get("authorization")?.trim() ?? "";
  if (authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.slice("bearer ".length).trim();
    return token.length > 0 ? token : null;
  }

  return null;
};

export const requireAgentWitchDeviceAuth = async (
  request: Request,
): Promise<AgentWitchDeviceAuthContext | Response> => {
  const pairingToken = readPairingToken(request);

  if (pairingToken === null) {
    return Response.json(
      { ok: false, error: "Agent Witch device token is required." },
      { status: 401 },
    );
  }

  const device = await findAgentWitchDeviceByToken(pairingToken);

  if (device === null || device.revokedAt !== null) {
    return Response.json(
      { ok: false, error: "Unknown or revoked Agent Witch device." },
      { status: 401 },
    );
  }

  return { device, pairingToken };
};
