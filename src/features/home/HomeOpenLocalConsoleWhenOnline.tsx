"use client";

import { MAC_DEVICE_LOCAL_STATUS_LINK_LABEL } from "@/features/agent-witch/macDevices/macDeviceRowMenuCopy.constant";
import HomeOpenLocalConsoleLink from "@/features/home/HomeOpenLocalConsoleLink";
import useThisMacHasConnectedLocalBridge from "@/features/home/hooks/useThisMacHasConnectedLocalBridge";

export default function HomeOpenLocalConsoleWhenOnline() {
  const showLocalConsole = useThisMacHasConnectedLocalBridge();

  if (!showLocalConsole) {
    return null;
  }

  return (
    <HomeOpenLocalConsoleLink
      className="mt-3 inline-flex"
      label={MAC_DEVICE_LOCAL_STATUS_LINK_LABEL}
    />
  );
}
