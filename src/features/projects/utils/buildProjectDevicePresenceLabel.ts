import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";
import { resolveMacPresenceTier } from "@/features/agent-witch/online-wake/macDevicePresence";
import { formatLastSeenText } from "@/lib/time/formatRelativeTimeAgo";

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
      text: `No Mac linked — ${name}`,
    };
  }

  const tier = resolveMacPresenceTier(input.device);

  if (tier === "live_other_instance") {
    return {
      statusIcon: "reconnecting",
      text: `Reconnecting — ${name}`,
    };
  }

  if (tier === "offline") {
    const lastSeen = formatLastSeenText(input.deviceLastSeenAt);
    const suffix = lastSeen !== null ? ` · last seen ${lastSeen}` : "";
    return {
      statusIcon: "offline",
      text: `Offline — ${name}${suffix}`,
    };
  }

  if (input.isThisMac) {
    return {
      statusIcon: "online",
      text: `Online here — ${name}`,
    };
  }

  return {
    statusIcon: "online",
    text: `Online — ${name}`,
  };
};

export default buildProjectDevicePresenceLabel;
