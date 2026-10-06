import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import { PROJECT_PAGE_V5_CHROME_COPY } from "@/features/projects/projectPageV5ChromeCopy.constant";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";

export type ProjectHeaderStatusTone = "ok" | "warn" | "neutral";

export interface ProjectHeaderStatus {
  readonly tone: ProjectHeaderStatusTone;
  readonly text: string;
}

/**
 * V5-3 header status chip. This computer → locked v5 strings; another
 * computer keeps the existing v2 "Online on {name}" / "Offline on {name}".
 */
const resolveProjectHeaderStatus = (input: {
  readonly presence: ProjectDevicePresenceLabel;
  readonly isThisMac: boolean;
  readonly hasLinkedDevice: boolean;
  readonly deviceDisplayName: string;
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
    return { tone: "neutral", text: v5["status.offlineThisComputer"] };
  }
  return { tone: "neutral", text: name ? v2.offlineOn(name) : v2.statusOffline };
};

export default resolveProjectHeaderStatus;
