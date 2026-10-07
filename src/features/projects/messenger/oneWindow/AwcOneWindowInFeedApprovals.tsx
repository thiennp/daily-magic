"use client";

import { useCallback, useEffect, useState } from "react";

import AwcOneWindowApprovalCard from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import { mapAccessPendingToOneWindowCard } from "@/features/projects/messenger/oneWindow/mapAccessPendingToOneWindowCard";
import {
  fetchProjectAccess,
  postProjectAccessAction,
} from "@/features/projects/access/utils/projectAccessApi";
import type { AccessPendingView } from "@/features/projects/access/utils/projectAccessApi.types";

interface AwcOneWindowInFeedApprovalsProps {
  readonly projectId: string;
  /** Owner-only; non-owners see nothing (Access pending stays the live list). */
  readonly enabled: boolean;
}

/**
 * In-feed join approval cards — views of live Access pending records.
 * Approve/Deny hit the same Access APIs; Access pending list + hub modal stay.
 */
export default function AwcOneWindowInFeedApprovals({
  projectId,
  enabled,
}: AwcOneWindowInFeedApprovalsProps) {
  const [pending, setPending] = useState<readonly AccessPendingView[]>([]);

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

  if (!enabled || pending.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 border-b border-awc-border bg-awc-surface px-4 py-3">
      {pending.map((req) => {
        const model = mapAccessPendingToOneWindowCard(req);
        return (
          <AwcOneWindowApprovalCard
            key={req.id}
            model={model}
            onApprove={(id) => {
              void postProjectAccessAction(
                `/api/projects/${projectId}/access/requests/${id}/approve`,
                {},
              ).then(() => reload());
            }}
            onDeny={(id) => {
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
