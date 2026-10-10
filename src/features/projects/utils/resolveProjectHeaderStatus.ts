import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/public-api/types";
import { PROJECT_PAGE_V5_CHROME_COPY } from "@/features/projects/public-api/types";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";

export type ProjectHeaderStatusTone = "ok" | "warn" | "neutral";

export interface ProjectHeaderStatus {
  readonly tone: ProjectHeaderStatusTone;
  readonly text: string;
}

/**
 * V5-3 / HN-H3 header status. This computer → locked strings; offline adds the
 * "tasks wait" hint. Another computer keeps v2 Online/Offline on {name}.
 */
const resolveProjectHeaderStatus = (input: {
  readonly presence: ProjectDevicePresenceLabel;
  readonly isThisMac: boolean;
  readonly hasLinkedDevice: boolean;
  readonly deviceDisplayName: string;
  readonly lastSeenLabel?: string | null;
}): ProjectHeaderStatus => {
  const v2 = PROJECT_PAGE_LAYOUT_V2_COPY;
  const v5 = PROJECT_PAGE_V5_CHROME_COPY;
  const name = input.deviceDisplayName.trim();
  if (!input.hasLinkedDevice) {
    return { tone: "neutral", text: input.presence.text };
  }
  if (input.presence.statusIcon === "reconnecting") {
    return { tone: "warn", text: v2.statusReconnecting };
  }
  if (input.presence.statusIcon === "online") {
    if (input.isThisMac) {
      return { tone: "ok", text: v5["status.onlineOnThisComputer"] };
    }
    return { tone: "ok", text: name ? v2.onlineOn(name) : v2.statusAllGood };
  }
  if (input.isThisMac) {
    const parts: string[] = [v5["status.offlineThisComputer"]];
    const lastSeen = input.lastSeenLabel?.trim();
    if (lastSeen) {
      parts.push(`last seen ${lastSeen}`);
    }
    parts.push(v5["status.offlineWaitHint"]);
    return { tone: "neutral", text: parts.join(" · ") };
  }
  return {
    tone: "neutral",
    text: name ? v2.offlineOn(name) : v2.statusOffline,
  };
};

export default resolveProjectHeaderStatus;
