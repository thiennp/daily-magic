"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { COMPANY_ENTITY_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface GroupTeamActivityPanelProps {
  readonly groupId: string;
}

export default function GroupTeamActivityPanel({
  groupId,
}: GroupTeamActivityPanelProps) {
  const [runs, setRuns] = useState<readonly EnrichedAgentRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const response = await fetch(`/api/admin/groups/${groupId}/agent-runs`);
      if (!response.ok) {
        setRuns([]);
        setIsLoading(false);
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "runs" in data &&
        Array.isArray((data as { runs: unknown }).runs)
      ) {
        setRuns((data as { runs: EnrichedAgentRunRecord[] }).runs);
      }
      setIsLoading(false);
    })();
  }, [groupId]);

  return (
    <AppPanel>
      <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
        Recent company agent runs
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Latest dispatches for members of this{" "}
        {COMPANY_ENTITY_LABEL.toLowerCase()}.
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading company activity…
        </p>
      ) : runs.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No company agent runs yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {runs.map((run) => (
            <li
              key={run.id}
              className="rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <AgentRunStatusBadge status={run.status} />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(run.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {run.requesterEmail} → {run.executorEmail}
              </p>
              <Link
                href={`/reports/${run.id}`}
                className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                View report
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppPanel>
  );
}
