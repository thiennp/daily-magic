import {
  buildAgentWitchInstallDeviceLabel,
  parseAgentWitchInstallDeviceLabel,
} from "@/lib/agentWitch/buildAgentWitchInstallDeviceLabel";

/**
 * Resolve the device_label used for reclaim/consolidate.
 * Prefer hostname#macosUsername when both are present (AGENT-048).
 */
export const resolveAgentWitchInstallDeviceLabel = (input: {
  readonly hostname: string | null | undefined;
  readonly macOsUsername?: string | null | undefined;
  readonly deviceLabel?: string | null | undefined;
}): string | null => {
  const explicit =
    typeof input.deviceLabel === "string" ? input.deviceLabel.trim() : "";
  if (explicit.length > 0) {
    const parsed = parseAgentWitchInstallDeviceLabel(explicit);
    if (parsed.macOsUsername !== null) {
      return buildAgentWitchInstallDeviceLabel(
        parsed.hostname,
        parsed.macOsUsername,
      );
    }
  }

  const hostname =
    typeof input.hostname === "string" ? input.hostname.trim() : "";
  const macOsUsername =
    typeof input.macOsUsername === "string" ? input.macOsUsername.trim() : "";

  if (hostname.length === 0 && explicit.length === 0) {
    return null;
  }

  if (hostname.length > 0 && macOsUsername.length > 0) {
    return buildAgentWitchInstallDeviceLabel(hostname, macOsUsername);
  }

  if (explicit.length > 0) {
    return explicit;
  }

  return hostname.length > 0 ? hostname : null;
};
