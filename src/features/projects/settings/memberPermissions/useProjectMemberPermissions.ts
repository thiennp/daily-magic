"use client";

import { useCallback, useEffect, useState } from "react";

import { requestProjectMemberPermissions } from "@/features/projects/settings/memberPermissions/requestProjectMemberPermissions";
import {
  ALL_MEMBER_PERMISSIONS_ALLOWED,
  PROJECT_MEMBER_PERMISSION_KEYS,
  type ProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

export type MemberPermissionsLoadState = "loading" | "ready" | "error";

/**
 * Owner-only member permissions: load once, save each toggle right away
 * (shown at once, put back if the save fails; the server is the truth).
 */
export const useProjectMemberPermissions = (projectId: string) => {
  const [loadState, setLoadState] =
    useState<MemberPermissionsLoadState>("loading");
  const [permissions, setPermissions] = useState<ProjectMemberPermissions>(
    ALL_MEMBER_PERMISSIONS_ALLOWED,
  );
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    void requestProjectMemberPermissions({
      projectId,
      signal: controller.signal,
    }).then((result) => {
      if (controller.signal.aborted) return;
      if (!result.ok) {
        setLoadState("error");
        return;
      }
      setPermissions(result.permissions);
      setLoadState("ready");
    });
    return () => controller.abort();
  }, [projectId, loadKey]);

  const save = useCallback(
    async (patch: Partial<ProjectMemberPermissions>): Promise<void> => {
      const before = permissions;
      setPermissions({ ...before, ...patch });
      setSaving(true);
      setSaveFailed(false);
      const result = await requestProjectMemberPermissions({
        projectId,
        patch,
      });
      setSaving(false);
      if (!result.ok) {
        setPermissions(before);
        setSaveFailed(true);
        return;
      }
      setPermissions(result.permissions);
    },
    [projectId, permissions],
  );

  const resetAll = useCallback(
    (): Promise<void> =>
      save(
        Object.fromEntries(
          PROJECT_MEMBER_PERMISSION_KEYS.map((key) => [key, true]),
        ),
      ),
    [save],
  );

  const reload = useCallback((): void => {
    setLoadState("loading");
    setLoadKey((key) => key + 1);
  }, []);

  return { loadState, permissions, saving, saveFailed, save, resetAll, reload };
};
