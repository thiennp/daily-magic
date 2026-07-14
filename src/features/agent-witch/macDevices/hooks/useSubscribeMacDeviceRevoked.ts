"use client";

import { useEffect } from "react";

import {
  MAC_DEVICE_REVOKED_EVENT,
  type MacDeviceRevokedEventDetail,
} from "@/features/agent-witch/macDevices/macDeviceRevokedEvent";

const useSubscribeMacDeviceRevoked = (
  onRevoked: (deviceId: string) => void,
): void => {
  useEffect(() => {
    const handleRevoked = (event: Event): void => {
      const detail = (event as CustomEvent<MacDeviceRevokedEventDetail>).detail;
      onRevoked(detail.deviceId);
    };

    window.addEventListener(MAC_DEVICE_REVOKED_EVENT, handleRevoked);

    return () => {
      window.removeEventListener(MAC_DEVICE_REVOKED_EVENT, handleRevoked);
    };
  }, [onRevoked]);
};

export default useSubscribeMacDeviceRevoked;
