import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";
import { resolveMacPresenceTier } from "@/features/agent-witch/online-wake/macDevicePresence";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

export interface ProjectDevicePresenceLabel {
  readonly statusIcon: "online" | "offline" | "reconnecting";
  readonly text: string;
}

const buildProjectDevicePresenceLabel = (input: {
  readonly deviceDisplayName: string;
  readonly device: MacDevicePresence | null;
  readonly deviceLastSeenAt: string | null;
  readonly isThisMac: boolean;
}): ProjectDevicePresenceLabel => {
  const name = input.deviceDisplayName.trim() || "Mac";

  if (input.device === null) {
    return {
      statusIcon: "offline",
      text: "No computer linked",
    };
  }

  const tier = resolveMacPresenceTier(input.device);

  if (tier === "live_other_instance") {
    return {
      statusIcon: "reconnecting",
      text: `Reconnecting on ${name}`,
    };
  }

  if (tier === "offline") {
    const lastSeen = formatRelativeTimeAgo(input.deviceLastSeenAt);
    const suffix = lastSeen !== null ? ` · last seen ${lastSeen}` : "";
    return {
      statusIcon: "offline",
      text: `Offline on ${name}${suffix}`,
    };
  }

  if (input.isThisMac) {
    return {
      statusIcon: "online",
      text: `Online here on ${name}`,
    };
  }

  return {
    statusIcon: "online",
    text: `Online on ${name}`,
  };
};

export default buildProjectDevicePresenceLabel;
