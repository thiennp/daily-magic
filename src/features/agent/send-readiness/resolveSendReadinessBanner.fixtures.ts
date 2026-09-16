import type { ResolveSendReadinessBannerInput } from "@/features/agent/send-readiness/sendReadinessBanner.types";

export const liveReadyDevice = {
  id: "mac-live",
  isConnected: true,
  isOnline: true,
  presenceTier: "live" as const,
  isDispatchReady: true,
  installBundleVersion: "40",
};

export const readinessBannerBaseInput: ResolveSendReadinessBannerInput = {
  isTeamDispatch: false,
  browserConnectionReady: true,
  selectedDeviceId: "mac-live",
  devices: [liveReadyDevice],
  serverInstallBundleVersion: null,
  formPromptEmpty: false,
};
