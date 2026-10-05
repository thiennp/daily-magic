"use client";

import AwcProjectAccessMemberViewerPanel from "@/features/projects/access/AwcProjectAccessMemberViewerPanel";
import AwcProjectAccessOwnerPanel from "@/features/projects/access/AwcProjectAccessOwnerPanel";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

interface AwcProjectAccessPanelProps {
  readonly projectId: string;
  readonly className?: string;
  readonly pageActorRole?: ProjectPageActorRole;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
}

export default function AwcProjectAccessPanel({
  projectId,
  className = "",
  pageActorRole = "owner",
  ownerEmail = null,
  ownerDisplayName = null,
}: AwcProjectAccessPanelProps) {
  if (pageActorRole === "owner") {
    return (
      <AwcProjectAccessOwnerPanel
        projectId={projectId}
        className={className}
        ownerEmail={ownerEmail}
        ownerDisplayName={ownerDisplayName}
      />
    );
  }

  return (
    <AwcProjectAccessMemberViewerPanel
      projectId={projectId}
      className={className}
      pageActorRole={pageActorRole}
    />
  );
}
