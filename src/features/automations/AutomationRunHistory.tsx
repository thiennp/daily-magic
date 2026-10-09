"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/button/Button";
import type { AutomationRunSummary } from "@/lib/automations/listAutomationRuns";

const STATUS_LABEL: Readonly<Record<string, string>> = {
  completed: "Success",
  failed: "Failed",
  running: "Running",
  pending_approval: "Waiting for approval",
  denied: "Denied",
  expired: "Timed out",
};

const formatWhen = (iso: string): string => new Date(iso).toLocaleString();

/** Recent runs of one automation: status, time, Copy run ID. Loads when opened. */
export default function AutomationRunHistory({
  automationId,
}: {
  readonly automationId: string;
}) {
  const [runs, setRuns] = useState<readonly AutomationRunSummary[] | null>(
    null,
  );
  const [failed, setFailed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/automations/${encodeURIComponent(automationId)}/runs`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { runs?: AutomationRunSummary[] } | null) => {
        if (data?.runs === undefined) setFailed(true);
        else setRuns(data.runs);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [automationId]);

  if (failed) {
    return (
      <p role="alert" className="mt-3 text-sm text-awc-fg-muted">
        Could not load the run history.
      </p>
    );
  }
  if (runs === null) {
    return <p className="mt-3 text-sm text-awc-fg-muted">Loading runs…</p>;
  }
  if (runs.length === 0) {
    return <p className="mt-3 text-sm text-awc-fg-muted">No runs yet.</p>;
  }
  return (
    <ul className="mt-3 divide-y divide-awc-border rounded-lg border border-awc-border">
      {runs.map((run) => (
        <li
          key={run.runId}
          className="flex flex-wrap items-center gap-3 px-3 py-2 text-sm"
        >
          <span className="font-medium text-awc-fg">
            {STATUS_LABEL[run.status] ?? run.status}
          </span>
          <span className="text-awc-fg-muted">{formatWhen(run.createdAt)}</span>
          <span className="flex-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void navigator.clipboard
                .writeText(run.runId)
                .then(() => setCopiedId(run.runId))
                .catch(() => undefined);
            }}
          >
            {copiedId === run.runId ? "Copied" : "Copy run ID"}
          </Button>
        </li>
      ))}
    </ul>
  );
}
