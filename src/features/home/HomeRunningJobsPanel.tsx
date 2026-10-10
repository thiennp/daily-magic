"use client";

import { useEffect, useState } from "react";

import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import HomeRunningJobRow from "@/features/home/HomeRunningJobRow";
import HomeStalledJobRow from "@/features/home/HomeStalledJobRow";
import {
  useHomeRunningAgentJobs,
  useRefreshStalledAgentRuns,
} from "@/features/home/hooks/public-api/presentation";
import { isAgentRunSilentPastStall } from "@/lib/dispatch/isAgentRunSilentPastStall";

export default function HomeRunningJobsPanel() {
  const runningJobs = useHomeRunningAgentJobs();
  const { expandRunningSendTask } = useSendTaskModal();
  const [nowMs, setNowMs] = useState(() => Date.now());
  const stalledJobs = runningJobs.filter((run) =>
    isAgentRunSilentPastStall(run, nowMs),
  );
  useRefreshStalledAgentRuns(stalledJobs);

  useEffect(() => {
    if (runningJobs.length === 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 5_000);
    return () => {
      window.clearInterval(timer);
    };
  }, [runningJobs.length]);

  if (runningJobs.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
        Running on your computer
      </h2>
      <ul className="mt-3 space-y-2">
        {runningJobs.map((run) =>
          stalledJobs.includes(run) ? (
            <HomeStalledJobRow key={run.id} run={run} nowMs={nowMs} />
          ) : (
            <HomeRunningJobRow
              key={run.id}
              run={run}
              nowMs={nowMs}
              onExpand={expandRunningSendTask}
            />
          ),
        )}
      </ul>
    </div>
  );
}
