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

  const reload = useCallback(async () => {
    if (!enabled) {
      setPending([]);
      return;
    }
    const access = await fetchProjectAccess(projectId);
    if (!access.ok) {
      setPending([]);
      return;
    }
    setPending(access.pendingRequests ?? []);
  }, [enabled, projectId]);

  useEffect(() => {
    void reload();
  }, [reload]);

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
