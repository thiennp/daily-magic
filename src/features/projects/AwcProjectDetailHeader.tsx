"use client";

import AwcProjectBreadcrumb from "@/features/projects/AwcProjectBreadcrumb";
import AwcProjectDetailHeaderActions from "@/features/projects/AwcProjectDetailHeaderActions";
import AwcProjectDetailHeaderStatus from "@/features/projects/AwcProjectDetailHeaderStatus";
import AwcProjectHeaderEditAction from "@/features/projects/AwcProjectHeaderEditAction";
import AwcProjectMobileMembersChip from "@/features/projects/AwcProjectMobileMembersChip";
import AwcProjectRoleChip from "@/features/projects/AwcProjectRoleChip";
import { PROJECT_V5_H1_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectHeaderStatus } from "@/features/projects/utils/resolveProjectHeaderStatus";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";

interface AwcProjectDetailHeaderProps {
  readonly projectId: string;
  readonly projectName: string;
  /** null = nothing to say (a member on a project with no linked computer). */
  readonly status: ProjectHeaderStatus | null;
  readonly pageActorRole: ProjectPageActorRole;
  readonly editCta: ProjectEditOnMacCta;
  readonly canRename: boolean;
  readonly canApprove: boolean;
  readonly canDelete: boolean;
  readonly canLeave: boolean;
  readonly onRename: () => void;
  readonly onInvite: () => void;
  readonly onDelete: () => void;
  readonly onLeave: () => void;
}

/**
 * V5-3 project chrome: breadcrumb · H1 · status chip · role chip (non-owner)
 * · ONE action "Edit on this computer" · "More actions" menu. Project path
 * moved to Settings (I27). Mobile Members chip stays (live rail entry).
 */
export default function AwcProjectDetailHeader({
  projectId,
  projectName,
  status,
  pageActorRole,
  editCta,
  canRename,
  canApprove,
  canDelete,
  canLeave,
  onRename,
  onInvite,
  onDelete,
  onLeave,
}: AwcProjectDetailHeaderProps) {
  return (
    <header className="flex min-w-0 flex-col gap-2">
      <AwcProjectBreadcrumb projectName={projectName} />
      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h1 className={PROJECT_V5_H1_CLASS}>{projectName}</h1>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {status !== null ? (
              <AwcProjectDetailHeaderStatus status={status} />
            ) : null}
            <AwcProjectRoleChip pageActorRole={pageActorRole} />
            <AwcProjectMobileMembersChip
              projectId={projectId}
              canApprove={canApprove}
            />
          </div>
        </div>
        <AwcProjectDetailHeaderActions
          canRename={canRename}
          canDelete={canDelete}
          canLeave={canLeave}
          onRename={onRename}
          onInvite={onInvite}
          onDelete={onDelete}
          onLeave={onLeave}
        >
          <AwcProjectHeaderEditAction editCta={editCta} />
        </AwcProjectDetailHeaderActions>
      </div>
    </header>
  );
}
