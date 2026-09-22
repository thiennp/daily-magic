import { isValidAgentWitchPairingToken } from "@/lib/agentWitch/generateAgentWitchPairingToken";
import { isAgentWitchDevicePlatform } from "@/lib/agentWitch/isAgentWitchDevicePlatform";
import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

export interface RegisterInstallBody {
  readonly pairingToken: string;
  readonly deviceLabel: string;
  readonly installBundleVersion?: string;
  readonly wakePort?: number;
  readonly platform?: AgentWitchDevicePlatform;
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

  const installBundleVersionRaw =
    "installBundleVersion" in body &&
    typeof (body as { installBundleVersion: unknown }).installBundleVersion ===
      "string"
      ? (body as { installBundleVersion: string }).installBundleVersion.trim()
      : "";
  const installBundleVersion =
    installBundleVersionRaw.length > 0 ? installBundleVersionRaw : undefined;

  const wakePortRaw =
    "wakePort" in body &&
    typeof (body as { wakePort: unknown }).wakePort === "number"
      ? (body as { wakePort: number }).wakePort
      : null;
  const wakePort =
    wakePortRaw !== null &&
    Number.isInteger(wakePortRaw) &&
    wakePortRaw > 0 &&
    wakePortRaw <= 65535
      ? wakePortRaw
      : undefined;

  const platformRaw =
    "platform" in body &&
    typeof (body as { platform: unknown }).platform === "string"
      ? (body as { platform: string }).platform.trim().toLowerCase()
      : "";
  const platform =
    platformRaw.length > 0 && isAgentWitchDevicePlatform(platformRaw)
      ? platformRaw
      : undefined;

  return {
    pairingToken,
    deviceLabel,
    installBundleVersion,
    wakePort,
    platform,
  };
};
