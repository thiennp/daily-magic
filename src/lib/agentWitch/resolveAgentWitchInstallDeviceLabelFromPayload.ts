import { resolveAgentWitchInstallDeviceLabel } from "@/lib/agentWitch/resolveAgentWitchInstallDeviceLabel";

const resolvePayloadString = (
  payload: Readonly<Record<string, unknown>> | undefined,
  key: string,
): string | null => {
  const value = payload?.[key];
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const resolveAgentWitchInstallDeviceLabelFromPayload = (
  payload: Readonly<Record<string, unknown>> | undefined,
): {
  readonly hostname: string | null;
  readonly macOsUsername: string | null;
  readonly installDeviceLabel: string | null;
} => {
  const hostname = resolvePayloadString(payload, "hostname");
  const macOsUsername = resolvePayloadString(payload, "macOsUsername");
  const explicitDeviceLabel = resolvePayloadString(payload, "deviceLabel");

  return {
    hostname,
    macOsUsername,
    installDeviceLabel: resolveAgentWitchInstallDeviceLabel({
      hostname,
      macOsUsername,
      deviceLabel: explicitDeviceLabel,
    }),
  };
};
