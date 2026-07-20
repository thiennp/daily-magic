import { buildMacDeviceInstallBundleText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceInstallBundleText";
import { buildMacDeviceLastSeenText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceLastSeenText";

export const buildMacDeviceDetailText = (input: {
  readonly device: {
    readonly isOnline: boolean;
    readonly lastSeenAt: string | null;
    readonly installBundleVersion: string | null;
  };
  readonly serverInstallBundleVersion: string | null;
}): { readonly text: string; readonly isMismatch: boolean } | null => {
  const parts: string[] = [];
  const lastSeenText = buildMacDeviceLastSeenText(input.device);
  if (lastSeenText !== null) {
    parts.push(lastSeenText);
  }

  const bundleText = buildMacDeviceInstallBundleText({
    installBundleVersion: input.device.installBundleVersion,
    serverInstallBundleVersion: input.serverInstallBundleVersion,
  });

  if (bundleText !== null) {
    parts.push(bundleText.text);
  }

  if (parts.length === 0) {
    return null;
  }

  return {
    text: parts.join(" · "),
    isMismatch: bundleText?.isMismatch === true,
  };
};
