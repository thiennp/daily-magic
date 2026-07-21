import { formatMacPresenceStatusLabel } from "@/features/agent-witch/online-wake";
import { buildMacDeviceInstallBundleText } from "@/features/agent-witch/macDevices/utils/buildMacDeviceInstallBundleText";
import { formatLastSeenText } from "@/lib/time/formatRelativeTimeAgo";

export const buildMacDeviceDetailText = (input: {
  readonly device: {
    readonly isConnected: boolean;
    readonly isOnline: boolean;
    readonly lastSeenAt: string | null;
    readonly installBundleVersion: string | null;
  };
  readonly serverInstallBundleVersion: string | null;
}): { readonly text: string; readonly isMismatch: boolean } | null => {
  const presence = {
    isConnected: input.device.isConnected,
    isOnline: input.device.isOnline,
  };
  const parts: string[] = [formatMacPresenceStatusLabel(presence)];

  if (!presence.isOnline && input.device.lastSeenAt !== null) {
    const lastSeenText = formatLastSeenText(input.device.lastSeenAt);
    if (lastSeenText !== null) {
      parts.push(lastSeenText);
    }
  }

  const bundleText = buildMacDeviceInstallBundleText({
    installBundleVersion: input.device.installBundleVersion,
    serverInstallBundleVersion: input.serverInstallBundleVersion,
  });

  if (bundleText !== null) {
    parts.push(bundleText.text);
  }

  return {
    text: parts.join(" · "),
    isMismatch: bundleText?.isMismatch === true,
  };
};
