"use client";

import AwcProjectAccessPanel from "@/features/projects/access/AwcProjectAccessPanel";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

interface AwcProjectMembersColumnProps {
  readonly projectId: string;
  readonly pageActorRole: ProjectPageActorRole;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly viewerUserId?: string | null;
}

/**
 * Right Team rail — flat like left nav (no cards). Contrast = soft
 * surface tone + left divider only. Nested Access card chrome flattened via
 * utility overrides until L5 restyles content the same way.
 */
const RAIL_CLASS =
  "min-w-0 border-t border-gray-200/80 bg-gray-50/70 px-3 py-4 dark:border-gray-800/80 dark:bg-white/[0.03] lg:border-l lg:border-t-0 lg:pl-4 lg:pr-1";

const FLAT_NESTED_CLASS = [
  // Strip Access owner/viewer outer card + nested section cards
  "[&>section]:rounded-none [&>section]:border-0 [&>section]:bg-transparent [&>section]:p-0 [&>section]:shadow-none",
  "[&_section]:rounded-none [&_section]:border-0 [&_section]:bg-transparent [&_section]:p-0 [&_section]:shadow-none",
  // Hide Access panel's own "Bots & people" header — rail owns "Team"
  "[&>section>header]:hidden",
  // Nav-like row density
  "text-sm [&_h3]:px-3.5 [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:text-gray-500 dark:[&_h3]:text-gray-400",
].join(" ");

export default function AwcProjectMembersColumn({
  projectId,
  pageActorRole,
  ownerEmail = null,
  ownerDisplayName = null,
  viewerUserId = null,
}: AwcProjectMembersColumnProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  return (
    <aside
      id="project-members-column"
      aria-label={copy.membersColumnLabel}
      className={RAIL_CLASS}
    >
      <h2 className="mb-3 px-3.5 text-[13px] font-semibold text-gray-500 dark:text-gray-400">
        {copy.membersColumnLabel}
      </h2>
      <div className={FLAT_NESTED_CLASS}>
        <AwcProjectAccessPanel
          projectId={projectId}
          pageActorRole={pageActorRole}
          ownerEmail={ownerEmail}
          ownerDisplayName={ownerDisplayName}
          viewerUserId={viewerUserId}
          className="!rounded-none !border-0 !bg-transparent !p-0 !shadow-none"
        />
      </div>
    </aside>
  );
}
