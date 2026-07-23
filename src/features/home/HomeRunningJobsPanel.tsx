"use client";

import { useEffect, useState } from "react";

import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import HomeRunningJobRow from "@/features/home/HomeRunningJobRow";
import { useHomeRunningAgentJobs } from "@/features/home/hooks/useHomeRunningAgentJobs";

export default function HomeRunningJobsPanel() {
  const runningJobs = useHomeRunningAgentJobs();
  const { expandRunningSendTask } = useSendTaskModal();
  const [nowMs, setNowMs] = useState(() => Date.now());

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
      <h2 className="text-sm font-medium text-gray-900 dark:text-white/90">
        Running on your Mac
      </h2>
      <ul className="mt-3 space-y-2">
        {runningJobs.map((run) => (
          <HomeRunningJobRow
            key={run.id}
            run={run}
            nowMs={nowMs}
            onExpand={expandRunningSendTask}
          />
        ))}
      </ul>
    </div>
  );
}
