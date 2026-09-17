"use client";

import { useMemo } from "react";

import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import buildProjectDevicePresenceLabel from "@/features/projects/utils/buildProjectDevicePresenceLabel";
import resolveProjectEditOnMacCta from "@/features/projects/utils/resolveProjectEditOnMacCta";
import resolveProjectMacDeviceContext from "@/features/projects/utils/resolveProjectMacDeviceContext";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const useAwcProjectDevicePresentation = (input: {
  readonly project: UserProjectRecord;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
}) =>
  useMemo(() => {
    const { device, deviceDisplayName, isThisMac } =
      resolveProjectMacDeviceContext({
        projectDeviceId: input.project.deviceId,
        devices: input.devices,
        displayNameById: input.displayNameById,
        localTokenHash: input.localTokenHash,
      });

    const presence = buildProjectDevicePresenceLabel({
      deviceDisplayName,
      device,
      deviceLastSeenAt: device?.lastSeenAt ?? null,
      isThisMac,
    });

    const editCta = resolveProjectEditOnMacCta({
      projectId: input.project.id,
      deviceDisplayName,
      device,
      deviceLastSeenAt: device?.lastSeenAt ?? null,
      isThisMac,
    });

    const statusPrefix =
      presence.statusIcon === "online"
        ? "●"
        : presence.statusIcon === "reconnecting"
          ? "◐"
          : "○";

    return {
      deviceDisplayName,
      presence,
      editCta,
      statusPrefix,
    };
  }, [
    input.project,
    input.devices,
    input.displayNameById,
    input.localTokenHash,
  ]);

export default useAwcProjectDevicePresentation;
