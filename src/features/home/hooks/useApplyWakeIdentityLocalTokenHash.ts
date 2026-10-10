"use client";

import { useEffect } from "react";

import type { LocalAgentWitchIdentitySnapshot } from "@/features/agent-witch/public-api/types";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/public-api/presentation";
import { setAgentWitchLocalHostCookie } from "@/features/agent-witch/utils/public-api/presentation";
import {
  applyWakeIdentityToLocalMacTokenHash,
  getLocalMacTokenHashSnapshot,
  setLocalMacTokenHash,
} from "@/features/home/utils/public-api/presentation";

const useApplyWakeIdentityLocalTokenHash = (
  identity: LocalAgentWitchIdentitySnapshot["identity"],
  pairedDevicesSnapshot: ReturnType<typeof pairedDevicesResource.getSnapshot>,
): void => {
  useEffect(() => {
    if (identity === null) {
      return;
    }

    setAgentWitchLocalHostCookie(identity.hostname);

    const snapshotDevices = (
      pairedDevicesSnapshot ?? getPairedDevicesSnapshotOrEmpty()
    ).devices;
    const nextTokenHash = applyWakeIdentityToLocalMacTokenHash({
      identity,
      currentTokenHash: getLocalMacTokenHashSnapshot(),
      devices: snapshotDevices,
    });
    if (nextTokenHash !== null) {
      setLocalMacTokenHash(nextTokenHash);
    }
  }, [identity, pairedDevicesSnapshot]);
};

export default useApplyWakeIdentityLocalTokenHash;
