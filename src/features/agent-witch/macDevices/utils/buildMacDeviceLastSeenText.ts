import { formatLastSeenText } from "@/lib/time/formatRelativeTimeAgo";

export const buildMacDeviceLastSeenText = (device: {
  readonly isOnline: boolean;
  readonly lastSeenAt: string | null;
}): string | null => {
  if (device.isOnline) {
    return null;
  }

  return formatLastSeenText(device.lastSeenAt);
};
