import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import type { MacDevicePresenceCounts } from "@/features/agent-witch/online-wake/macDevicePresence";

const buildMacDevicesStatusLine = (counts: MacDevicePresenceCounts): string => {
  const connectedCount = counts.live + counts.liveOtherInstance;
  if (connectedCount > 0) {
    const recentSuffix =
      counts.recent > 0 ? ` · ${counts.recent} seen recently` : "";
    return `${connectedCount} connected${recentSuffix} · checks in every 30 seconds`;
  }

  if (counts.recent > 0) {
    return `${counts.recent} seen recently · waiting for the next check-in`;
  }

  return `Computers show here when ${AGENT_WITCH_PRODUCT_NAME} is running.`;
};

export default buildMacDevicesStatusLine;
