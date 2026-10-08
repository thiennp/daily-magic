"use client";

import { useCallback, useEffect, useState } from "react";

import AwcOneWindowApprovalCard from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import { buildAskAgainHandler } from "@/features/projects/messenger/oneWindow/oneWindowAskAgain";
import { mapAccessPendingToOneWindowCard } from "@/features/projects/messenger/oneWindow/mapAccessPendingToOneWindowCard";
import {
  fetchProjectAccess,
  postProjectAccessAction,
} from "@/features/projects/access/utils/projectAccessApi";
import type { AccessPendingView } from "@/features/projects/access/utils/projectAccessApi.types";

type DecidedCard = {
  readonly req: AccessPendingView;
  readonly decision: "approved" | "denied";
  readonly at: string;
};

interface AwcOneWindowInFeedApprovalsProps {
  readonly projectId: string;
  /** Owner-only; non-owners see nothing (Access pending stays the live list). */
  readonly enabled: boolean;
  /** Timed-out run approvals: prefill the composer with an @mention of the assistant. */
  readonly onAskAgain?: (name: string) => void;
}

/**
 * In-feed join approval cards — views of live Access pending records.
 * Approve/Deny hit the same Access APIs; Access pending list + hub modal stay.
 */
export default function AwcOneWindowInFeedApprovals({
  projectId,
  enabled,
  onAskAgain,
}: AwcOneWindowInFeedApprovalsProps) {
  const [pending, setPending] = useState<readonly AccessPendingView[]>([]);
  // A decided card stays in the feed (result line) instead of vanishing on reload.
  const [decided, setDecided] = useState<ReadonlyMap<string, DecidedCard>>(
    new Map(),
  );

  // Disabled → empty list (render-time reset; the effect only subscribes to the fetch).
  const [wasEnabled, setWasEnabled] = useState(enabled);
  if (wasEnabled !== enabled) {
    setWasEnabled(enabled);
    if (!enabled) setPending([]);
  }

  const loadPending = useCallback(async (): Promise<
    readonly AccessPendingView[]
  > => {
    const access = await fetchProjectAccess(projectId);
    return access.ok ? (access.pendingRequests ?? []) : [];
  }, [projectId]);

  const reload = useCallback(async () => {
    if (!enabled) return;
    setPending(await loadPending());
  }, [enabled, loadPending]);

  useEffect(() => {
    if (!enabled) return;
    void loadPending().then(setPending);
  }, [enabled, loadPending]);

  const decide = (req: AccessPendingView, decision: "approved" | "denied") => {
    const at = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDecided((prev) => new Map(prev).set(req.id, { req, decision, at }));
  };
  const decidedOnly = [...decided.values()].filter(
    (d) => !pending.some((p) => p.id === d.req.id),
  );
  if (!enabled || (pending.length === 0 && decidedOnly.length === 0))
    return null;

  return (
    <div className="flex flex-col gap-3 border-b border-awc-border bg-awc-surface px-4 py-3">
      {[...pending, ...decidedOnly.map((d) => d.req)].map((req) => {
        const done = decided.get(req.id);
        const model = {
          ...mapAccessPendingToOneWindowCard(req),
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
            key={req.id}
            model={model}
            onAskAgain={buildAskAgainHandler(model, onAskAgain)}
            onApprove={(id) => {
              decide(req, "approved");
              void postProjectAccessAction(
                `/api/projects/${projectId}/access/requests/${id}/approve`,
                {},
              ).then(() => reload());
            }}
            onDeny={(id) => {
              decide(req, "denied");
              void postProjectAccessAction(
                `/api/projects/${projectId}/access/requests/${id}/deny`,
              ).then(() => reload());
            }}
          />
        );
      })}
    </div>
  );
}
