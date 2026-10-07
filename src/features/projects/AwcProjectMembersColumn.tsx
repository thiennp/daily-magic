"use client";

import AwcProjectMembersOwnerContent from "@/features/projects/members/AwcProjectMembersOwnerContent";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

interface AwcProjectMembersColumnProps {
  readonly projectId: string;
  readonly pageActorRole: ProjectPageActorRole;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly viewerUserId?: string | null;
  readonly onMessageHelper?: (membershipId: string) => void;
}

/**
 * Right Members rail — flat like left nav (no cards). Contrast = soft
 * surface tone + left divider only. L5 content: people · assistants · invite.
 */
const RAIL_CLASS =
  "min-w-0 border-t border-awc-border/80 bg-awc-bg/70 px-1 py-4 dark:border-gray-800/80 dark:bg-white/[0.03] lg:border-l lg:border-t-0 lg:pl-2 lg:pr-1";

export default function AwcProjectMembersColumn({
  projectId,
  pageActorRole,
  ownerEmail = null,
  ownerDisplayName = null,
  onMessageHelper,
}: AwcProjectMembersColumnProps) {
  const label = PROJECT_PAGE_LAYOUT_V2_COPY.membersColumnLabel;
  return (
    <aside
      id="project-members-column"
      aria-label={label}
      className={RAIL_CLASS}
    >
      <h2 className="mb-3 px-3.5 text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400">
        {label}
      </h2>
      {pageActorRole === "owner" ? (
        <AwcProjectMembersOwnerContent
          projectId={projectId}
          ownerEmail={ownerEmail}
          ownerDisplayName={ownerDisplayName}
          onMessageHelper={onMessageHelper ?? (() => undefined)}
        />
      ) : (
        <p className="px-3.5 text-[13px] text-awc-fg-muted dark:text-gray-400">
          {C.viewerHint}
        </p>
      )}
    </aside>
  );
}
