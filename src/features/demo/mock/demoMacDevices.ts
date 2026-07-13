import { demoTimestamp } from "./demoTimestamp.constant";

export const demoMacDevices = [
  {
    id: "device-demo-alex-macbook",
    deviceLabel: "Alex's MacBook",
    claimedAt: demoTimestamp,
    lastSeenAt: demoTimestamp,
    isOnline: true,
    lastHeartbeatAt: demoTimestamp,
  },
  {
    id: "device-demo-jordan-imac",
    deviceLabel: "Jordan's iMac",
    claimedAt: demoTimestamp,
    lastSeenAt: demoTimestamp,
    isOnline: false,
    lastHeartbeatAt: null,
  },
] as const;
