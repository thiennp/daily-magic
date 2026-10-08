"use client";

import { useEffect, useRef } from "react";

import { resolveDeepLinkProjectDeviceSwitch } from "@/features/agent/utils/resolveDeepLinkProjectDeviceSwitch";

const fetchProjectDeviceId = async (
  projectId: string,
): Promise<string | null> => {
  const response = await fetch(
    `/api/projects/${encodeURIComponent(projectId)}`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    return null;
  }
  const body = (await response.json()) as {
    readonly project?: { readonly deviceId?: string | null };
  };
  return body.project?.deviceId ?? null;
};

/** 5c30842c: the deep link's project binding picks the computer, once per link. */
export const useAdoptDeepLinkProjectDevice = (input: {
  readonly urlProjectId: string;
  readonly selectedDeviceId: string;
  readonly deviceIds: readonly string[];
  readonly projectIds: readonly string[];
  readonly isProjectsLoading: boolean;
  readonly adoptDeviceId: (deviceId: string) => void;
}): void => {
  const attemptedFor = useRef("");
  const { urlProjectId, selectedDeviceId, isProjectsLoading } = input;
  const projectFound = input.projectIds.includes(urlProjectId);
  const deviceIdsKey = input.deviceIds.join(",");
  const { adoptDeviceId } = input;

  useEffect(() => {
    if (
      urlProjectId.length === 0 ||
      selectedDeviceId.length === 0 ||
      isProjectsLoading ||
      projectFound ||
      attemptedFor.current === urlProjectId
    ) {
      return;
    }
    attemptedFor.current = urlProjectId;
    void fetchProjectDeviceId(urlProjectId)
      .catch(() => null)
      .then((projectDeviceId) => {
        const target = resolveDeepLinkProjectDeviceSwitch({
          projectDeviceId,
          selectedDeviceId,
          deviceIds: deviceIdsKey.split(","),
        });
        if (target !== null) {
          adoptDeviceId(target);
        }
      });
  }, [
    adoptDeviceId,
    deviceIdsKey,
    isProjectsLoading,
    projectFound,
    selectedDeviceId,
    urlProjectId,
  ]);
};
