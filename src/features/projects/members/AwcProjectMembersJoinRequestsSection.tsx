"use client";

import { useState } from "react";

import AwcExpiredJoinRequestList from "@/features/projects/access/approvalCard/AwcExpiredJoinRequestList";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import type { AwcProjectAccessPending } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  nextJoinRequestsStickyProject,
  shouldRenderJoinRequestsSection,
} from "@/features/projects/members/joinRequestsSectionVisibility";

interface AwcProjectMembersJoinRequestsSectionProps {
  readonly projectId: string;
  readonly pending: readonly AwcProjectAccessPending[];
  readonly expired: readonly AwcProjectAccessPending[];
  readonly onApprove: (
    requestId: string,
    projectDisplayName?: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  readonly onDeny: (requestId: string) => Promise<boolean>;
}

/**
 * Non-Grok S3 — owner approval cards in the Members rail (owner-only mount).
 * Minimal layout; Human UI owns final rail styling. Approve / Deny reuse the
 * existing owner endpoints; nothing here grants access without that click.
 */
export default function AwcProjectMembersJoinRequestsSection({
  projectId,
  pending,
  expired,
  onApprove,
  onDeny,
}: AwcProjectMembersJoinRequestsSectionProps) {
  // DF-017: keep the list mounted once it showed a request, so the resolved
  // row survives the post-approve/deny reload draining `pending`.
  const [stickyProjectId, setStickyProjectId] = useState<string | null>(
    pending.length > 0 ? projectId : null,
  );
  const nextSticky = nextJoinRequestsStickyProject({
    projectId,
    pendingCount: pending.length,
    stickyProjectId,
  });
  if (nextSticky !== stickyProjectId) setStickyProjectId(nextSticky);
  if (
    !shouldRenderJoinRequestsSection({
      projectId,
      pendingCount: pending.length,
      expiredCount: expired.length,
      stickyProjectId: nextSticky,
    })
  ) {
    return null;
  }
  return (
    <section
      id="members-join-requests"
      className="flex flex-col gap-1 px-3.5"
      data-members-join-requests
    >
      <AwcProjectAccessPendingList
        projectId={projectId}
        pending={pending}
        onApprove={onApprove}
        onDeny={onDeny}
      />
      <AwcExpiredJoinRequestList expired={expired} />
    </section>
  );
}
