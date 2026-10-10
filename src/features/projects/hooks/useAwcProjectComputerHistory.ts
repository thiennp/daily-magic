"use client";

import { useCallback, useEffect, useState } from "react";

import { requestProjectComputerHistory } from "@/features/projects/utils/public-api/presentation";

/** Owner opt-in toggle state for project computer history. */
const useAwcProjectComputerHistory = (
  projectId: string,
): {
  readonly enabled: boolean | null;
  readonly isSaving: boolean;
  readonly hasError: boolean;
  readonly setEnabled: (next: boolean) => Promise<void>;
} => {
  const [enabled, setEnabledState] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void requestProjectComputerHistory({
      projectId,
      signal: controller.signal,
    }).then((result) => {
      if (!controller.signal.aborted) {
        setEnabledState(result.ok ? result.enabled : false);
      }
    });
    return () => controller.abort();
  }, [projectId]);

  const setEnabled = useCallback(
    async (next: boolean): Promise<void> => {
      setIsSaving(true);
      setHasError(false);
      const result = await requestProjectComputerHistory({
        projectId,
        enabled: next,
      });
      setIsSaving(false);
      if (result.ok) {
        setEnabledState(result.enabled);
        return;
      }
      setHasError(true);
    },
    [projectId],
  );

  return { enabled, isSaving, hasError, setEnabled };
};

export default useAwcProjectComputerHistory;
