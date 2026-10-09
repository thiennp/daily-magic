"use client";

import { useEffect, useMemo, useState } from "react";

import {
  resolveMemberTaskPulse,
  summarizeTaskOwnerPulses,
} from "@/features/projects/access/utils/resolveMemberTaskPulse";
import type {
  AwcMemberTaskPulse,
  AwcTaskOwnerPulse,
} from "@/features/projects/access/utils/resolveMemberTaskPulse";
import useProjectTaskRecords from "@/features/projects/tasks/useProjectTaskRecords";

const REFRESH_MS = 60_000;

export type AwcMemberTaskPulses = {
  readonly nowMs: number;
  readonly byMembershipId: (membershipId: string) => AwcMemberTaskPulse;
  /** Every seat that owns an open task, quiet ones first. */
  readonly owners: readonly AwcTaskOwnerPulse[];
};

/**
 * Task records refreshed every minute. Undefined while there is nothing to
 * show (loading, failed, or a project with no tasks), so no row claims "Idle"
 * before the data is known.
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
            owners: summarizeTaskOwnerPulses(records, nowMs),
          },
    [records, nowMs],
  );
}
