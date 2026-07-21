import { isValidAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";

export interface RegisterInstallBody {
  readonly pairingToken: string;
  readonly deviceLabel: string;
}

export const parseRegisterInstallBody = (
  body: unknown,
): RegisterInstallBody | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const pairingToken =
    "pairingToken" in body &&
    typeof (body as { pairingToken: unknown }).pairingToken === "string"
      ? (body as { pairingToken: string }).pairingToken.trim()
      : "";
  const deviceLabel =
    "deviceLabel" in body &&
    typeof (body as { deviceLabel: unknown }).deviceLabel === "string"
      ? (body as { deviceLabel: string }).deviceLabel.trim()
      : "";

  if (
    !isValidAgentWitchPairingToken(pairingToken) ||
    deviceLabel.length === 0
  ) {
    return null;
  }

  return { pairingToken, deviceLabel };
};
