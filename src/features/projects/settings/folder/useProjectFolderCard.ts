"use client";

import { useMyMacDevices } from "@/features/agent/hooks/public-api/presentation";
import { useProjectFolderStatus } from "@/features/projects/settings/folder/useProjectFolderStatus";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Computer, reachability and folder check for the Folder and repository card. */
export const useProjectFolderCard = (
  project: UserProjectRecord,
  isOwner: boolean,
) => {
  const { devices } = useMyMacDevices();
  const device = devices.find((item) => item.id === project.deviceId) ?? null;
  const online = device?.isOnline === true;
  const wakePort = online ? (device?.wakePort ?? null) : null;
  const status = useProjectFolderStatus({
    projectId: project.id,
    wakePort,
    reloadKey: project.folderPath,
  });
  const hasFolder = project.folderPath.trim().length > 0;
  const reachable = status !== "loading" && status.kind === "ready";
  const missing =
    !hasFolder ||
    (status !== "loading" &&
      status.kind === "ready" &&
      status.status?.folderFound === false);
  return {
    status,
    wakePort,
    hasFolder,
    missing,
    computerName: device?.displayName ?? device?.deviceLabel ?? "its computer",
    computerState: device === null ? "unknown" : online ? "online" : "offline",
    canChange: isOwner && wakePort !== null && reachable,
  };
};
