"use client";

import { useEffect, useMemo, useState } from "react";

import { resolveMemberTaskPulse } from "@/features/projects/access/utils/resolveMemberTaskPulse";
import type { AwcMemberTaskPulse } from "@/features/projects/access/utils/resolveMemberTaskPulse";
import useProjectTaskRecords from "@/features/projects/tasks/useProjectTaskRecords";

const REFRESH_MS = 60_000;

export type AwcMemberTaskPulses = {
  readonly nowMs: number;
  readonly byMembershipId: (membershipId: string) => AwcMemberTaskPulse;
};

/**
 * Owner Members rail: task records refreshed every minute. Undefined while
 * there is nothing to show (loading, failed, or a project with no tasks), so
 * no row claims "Idle" before the data is known.
 */
export default function useAwcMemberTaskPulses(
  projectId: string,
): AwcMemberTaskPulses | undefined {
  const { records, reload } = useProjectTaskRecords(projectId);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
      reload();
    }, REFRESH_MS);
    return () => {
      window.clearInterval(timer);
    };
  }, [reload]);

  return useMemo(
    () =>
      records.length === 0
        ? undefined
        : {
            nowMs,
            byMembershipId: (membershipId) =>
              resolveMemberTaskPulse(records, membershipId, nowMs),
          },
    [records, nowMs],
  );
}
