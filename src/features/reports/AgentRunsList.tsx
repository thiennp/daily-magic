"use client";

import { useEffect, useState } from "react";

import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const formatRunStatus = (status: string): string => status.replaceAll("_", " ");

export default function AgentRunsList() {
  const [runs, setRuns] = useState<readonly AgentRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch("/api/agent-runs");
        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "runs" in data &&
          Array.isArray((data as { runs: unknown }).runs)
        ) {
          setRuns((data as { runs: AgentRunRecord[] }).runs);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading agent runs…
      </p>
    );
  }

  if (runs.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No agent runs yet. Dispatch a task from the Agent page to create your
        first report.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {runs.map((run) => (
        <article
          key={run.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium capitalize text-gray-800 dark:text-white/90">
              {formatRunStatus(run.status)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(run.createdAt).toLocaleString()}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Policy: {run.dispatchPolicy}
          </p>
          <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {run.prompt}
          </pre>
          {run.resultOutput ? (
            <pre className="mt-3 max-h-40 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
              {run.resultOutput}
            </pre>
          ) : null}
        </article>
      ))}
    </div>
  );
}
