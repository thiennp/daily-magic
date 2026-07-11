"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AgentRunDetailContent from "@/features/reports/AgentRunDetailContent";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunDetailProps {
  readonly runId: string;
}

export default function AgentRunDetail({ runId }: AgentRunDetailProps) {
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRun = async (): Promise<void> => {
      const response = await fetch(`/api/agent-runs/${runId}`);
      if (!response.ok) {
        setRun(null);
        setIsLoading(false);
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "run" in data &&
        typeof (data as { run: EnrichedAgentRunRecord }).run === "object"
      ) {
        setRun((data as { run: EnrichedAgentRunRecord }).run);
      }
      setIsLoading(false);
    };

    void loadRun();
    const timer = setInterval(() => {
      void loadRun();
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [runId]);

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Loading agent run…
      </p>
    );
  }

  if (run === null) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Agent run not found.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/reports"
        className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        Back to reports
      </Link>
      <AgentRunDetailContent run={run} />
    </div>
  );
}
