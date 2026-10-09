"use client";

import { useCallback, useEffect, useState } from "react";

import { postProjectAccessAction } from "@/features/projects/access/utils/projectAccessApi";
import AwcOneWindowApprovalCard from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import { buildAskAgainHandler } from "@/features/projects/messenger/oneWindow/oneWindowAskAgain";
import { askAssistantAgain } from "@/features/projects/messenger/oneWindow/oneWindowComposerPrefill";
import {
  mapRunApprovalToOneWindowCard,
  type OneWindowRunApproval,
} from "@/features/projects/messenger/oneWindow/mapRunApprovalToOneWindowCard";

interface AwcOneWindowInFeedRunApprovalsProps {
  readonly projectId: string;
  /** Owner-only: run approvals are decided by the project owner. */
  readonly enabled: boolean;
}

const fetchRunApprovals = async (
  projectId: string,
): Promise<readonly OneWindowRunApproval[]> => {
  try {
    const response = await fetch(
      `/api/projects/${encodeURIComponent(projectId)}/access/run-approvals`,
      { cache: "no-store" },
    );
    if (!response.ok) return [];
    const data = (await response.json()) as {
      approvals?: OneWindowRunApproval[];
    };
    return data.approvals ?? [];
  } catch {
    return [];
  }
};

type Decided = {
  readonly decision: "approved" | "denied";
  readonly at: string;
};

/** In-feed computer-run approvals; a decided card stays with its result line. */
export default function AwcOneWindowInFeedRunApprovals({
  projectId,
  enabled,
}: AwcOneWindowInFeedRunApprovalsProps) {
  const [approvals, setApprovals] = useState<readonly OneWindowRunApproval[]>(
    [],
  );
  const [decided, setDecided] = useState<ReadonlyMap<string, Decided>>(
    new Map(),
  );

  useEffect(() => {
    if (!enabled) return;
    void fetchRunApprovals(projectId).then(setApprovals);
  }, [enabled, projectId]);

  const decide = useCallback(
    (runId: string, decision: "approved" | "denied") => {
      const at = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDecided((prev) => new Map(prev).set(runId, { decision, at }));
      const verb = decision === "approved" ? "approve" : "decline";
      void postProjectAccessAction(
        `/api/projects/${projectId}/access/run-approvals/${runId}/${verb}`,
      );
    },
    [projectId],
  );

  if (!enabled || approvals.length === 0) return null;
  return (
    <div className="flex flex-col gap-3 border-b border-awc-border bg-awc-surface px-4 py-3">
      {approvals.map((approval) => {
        const done = decided.get(approval.runId);
        const model = {
          ...mapRunApprovalToOneWindowCard(approval),
          ...(done
            ? {
                status: done.decision,
                decidedAt: done.at,
                expiresLabel: undefined,
              }
            : {}),
        };
        return (
          <AwcOneWindowApprovalCard
            key={approval.runId}
            model={model}
            onAskAgain={buildAskAgainHandler(model, askAssistantAgain)}
            onApprove={(id) => decide(id, "approved")}
            onDeny={(id) => decide(id, "denied")}
          />
        );
      })}
    </div>
  );
}
