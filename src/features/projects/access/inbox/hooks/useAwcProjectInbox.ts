"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { loadAwcProjectInbox } from "@/features/projects/access/inbox/hooks/loadAwcProjectInbox";
import { useAwcProjectInboxClear } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxClear";
import { useAwcProjectInboxRestore } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxRestore";
import { useAwcProjectInboxSnapshotState } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxSnapshotState";
import { useAwcProjectInboxToast } from "@/features/projects/access/inbox/hooks/useAwcProjectInboxToast";

export const useAwcProjectInbox = (
  projectId: string,
  enabled: boolean = true,
) => {
  const state = useAwcProjectInboxSnapshotState(enabled);
  const { applySnapshot, setIsLoading } = state;
  const [showArchived, setShowArchived] = useState(false);
  const generationRef = useRef(0);

  const reload = useCallback(
    async (silent: boolean = false) => {
      if (!enabled) {
        return;
      }
      if (!silent) {
        setIsLoading(true);
      }
      const snapshot = await loadAwcProjectInbox(projectId, showArchived);
      applySnapshot(snapshot);
      if (!silent) {
        setIsLoading(false);
      }
    },
    [projectId, enabled, showArchived, applySnapshot, setIsLoading],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const snapshot = await loadAwcProjectInbox(projectId, showArchived);
      if (generationRef.current !== generation) {
        return;
      }
      applySnapshot(snapshot);
      setIsLoading(false);
    };
    void load();
  }, [projectId, enabled, showArchived, applySnapshot, setIsLoading]);

  const reloadLoud = useCallback(() => reload(false), [reload]);
  const reloadSilent = useCallback(() => reload(true), [reload]);
  const { toast, showToast } = useAwcProjectInboxToast();
  const deps = { projectId, reloadSilent, showToast };
  const clear = useAwcProjectInboxClear(deps);
  const restore = useAwcProjectInboxRestore(deps);

  return {
    ...state.view,
    members: state.members,
    isLoading: enabled ? state.isLoading : false,
    showArchived,
    setShowArchived,
    toast,
    clearing: clear.clearing,
    clearAll: clear.clearAll,
    restoring: restore.restoring,
    restore: restore.restore,
    reload: reloadLoud,
    reloadSilent,
  };
};
