import type { MacDevicePresenceCounts } from "@/features/agent-witch/online-wake/macDevicePresence";

const buildMacDevicesStatusLine = (counts: MacDevicePresenceCounts): string => {
  const connectedCount = counts.live + counts.liveOtherInstance;
  if (connectedCount > 0) {
    const remoteSuffix =
      counts.liveOtherInstance > 0
        ? ` (${counts.liveOtherInstance} on another server)`
        : "";
    const recentSuffix =
      counts.recent > 0 ? ` · ${counts.recent} seen recently` : "";
    return `${connectedCount} connected${remoteSuffix}${recentSuffix} · checks in every ~30s`;
  }

  if (counts.recent > 0) {
    return `${counts.recent} seen recently · waiting for the next check-in`;
  }

  return "Connected Macs appear here when Agent Witch is running.";
};

export default buildMacDevicesStatusLine;
