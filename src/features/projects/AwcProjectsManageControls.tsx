"use client";

import AwcProjectsNewProjectButton from "@/features/projects/AwcProjectsNewProjectButton";
import AwcProjectsNewProjectCard from "@/features/projects/AwcProjectsNewProjectCard";
import AwcProjectsToolbar from "@/features/projects/AwcProjectsToolbar";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectsManageControlsProps {
  readonly deviceId: string;
  readonly formOpen: boolean;
  readonly onFormOpenChange: (open: boolean) => void;
  readonly createdName: string | null;
  readonly onCreated: (project: UserProjectRecord) => void;
  readonly searchQuery: string;
  readonly onSearchQueryChange: (value: string) => void;
  readonly projectCount: number;
  readonly visibleCount: number;
}

/** New project card + toast line + search/count row with the New project button. */
export default function AwcProjectsManageControls({
  deviceId,
  formOpen,
  onFormOpenChange,
  createdName,
  onCreated,
  searchQuery,
  onSearchQueryChange,
  projectCount,
  visibleCount,
}: AwcProjectsManageControlsProps) {
  return (
    <>
      {formOpen ? (
        <AwcProjectsNewProjectCard
          deviceId={deviceId}
          onClose={() => onFormOpenChange(false)}
          onCreated={onCreated}
        />
      ) : null}
      {createdName !== null ? (
        <p
          role="status"
          className="mb-4 rounded-awc-lg bg-awc-ok-soft px-3 py-2 text-sm font-medium text-awc-ok"
        >
          {`“${createdName}” created`}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {projectCount > 0 ? (
          <AwcProjectsToolbar
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            projectCount={projectCount}
            visibleCount={visibleCount}
          />
        ) : (
          <span />
        )}
        <AwcProjectsNewProjectButton
          expanded={formOpen}
          onClick={() => onFormOpenChange(!formOpen)}
        />
      </div>
    </>
  );
}
