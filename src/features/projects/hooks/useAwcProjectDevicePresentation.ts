"use client";

import { useMemo } from "react";

import type { MyMacDevice } from "@/features/agent/hooks/public-api/types";
import { buildProjectDevicePresenceLabel } from "@/features/projects/utils/public-api/presentation";
import { resolveProjectEditOnMacCta } from "@/features/projects/utils/public-api/presentation";
import { resolveProjectMacDeviceContext } from "@/features/projects/utils/public-api/presentation";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";
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
      isThisMac,
      hasLinkedDevice: device !== null,
      presence,
      editCta,
      statusPrefix,
      lastSeenLabel: formatRelativeTimeAgo(device?.lastSeenAt ?? null),
    };
  }, [
    input.project,
    input.devices,
    input.displayNameById,
    input.localTokenHash,
  ]);

export default useAwcProjectDevicePresentation;
