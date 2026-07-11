import isAgentWitchRole from "./isAgentWitchRole";
import isNonEmptyString from "./isNonEmptyString";
import type { AgentWitchRole } from "./types/AgentWitchRole.type";

export const resolveRoleFromRegisterPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): AgentWitchRole | null => {
  if (payload === undefined) {
    return null;
  }

  const role = payload.role;
  if (isAgentWitchRole(role)) {
    return role;
  }

  return null;
};

export const resolvePairingTokenFromRegisterPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): string | null => {
  if (payload === undefined) {
    return null;
  }

  const pairingToken = payload.pairingToken;
  if (isNonEmptyString(pairingToken)) {
    return pairingToken.trim();
  }

  return null;
};
