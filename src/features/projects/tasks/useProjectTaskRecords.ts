"use client";

import { useCallback, useEffect, useState } from "react";

import { parseProjectTaskRecordsPayload } from "@/features/projects/tasks/utils/parseProjectTaskRecordsPayload";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type ProjectTaskRecordsState = {
  readonly records: readonly ProjectTaskRecord[];
  readonly loadFailed: boolean;
  readonly reload: () => void;
};

/** DF-024: stand-alone task records for the Tasks tab (meta only). */
export default function useProjectTaskRecords(
  projectId: string,
): ProjectTaskRecordsState {
  const [records, setRecords] = useState<readonly ProjectTaskRecord[]>([]);
  const [loadFailed, setLoadFailed] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const res = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/task-records`,
          { cache: "no-store", signal: controller.signal },
        );
        const parsed = parseProjectTaskRecordsPayload(await res.json());
        if (controller.signal.aborted) return;
        setLoadFailed(parsed === null);
        setRecords(parsed ?? []);
      } catch {
        if (!controller.signal.aborted) setLoadFailed(true);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [projectId, tick]);

  const reload = useCallback(() => {
    setTick((n) => n + 1);
  }, []);

  return { records, loadFailed, reload };
}
