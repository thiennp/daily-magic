"use client";

import { useEffect, useState } from "react";

import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import { useHomeRunningAgentJobs } from "@/features/home/hooks/useHomeRunningAgentJobs";
import { formatHomeRunningJobAliveLabel } from "@/features/home/utils/formatHomeRunningJobAliveLabel";
import { formatHomeRunningJobTitle } from "@/features/home/utils/formatHomeRunningJobTitle";

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
          <li key={run.id}>
            <button
              type="button"
              onClick={() => {
                expandRunningSendTask(run.id);
              }}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-500/40 dark:hover:bg-brand-500/5"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-gray-900 dark:text-white/90">
                  {formatHomeRunningJobTitle(run.prompt)}
                </span>
                <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                  {formatHomeRunningJobAliveLabel({
                    lastRunHeartbeatAt: run.lastRunHeartbeatAt,
                    startedAt: run.startedAt,
                    createdAt: run.createdAt,
                    nowMs,
                  })}
                  {" · Click to expand"}
                </span>
              </span>
              <AgentRunStatusBadge status={run.status} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
