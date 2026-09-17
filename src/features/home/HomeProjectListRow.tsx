"use client";

import Button from "@/components/ui/button/Button";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface HomeProjectListRowProps {
  readonly project: UserProjectRecord;
  readonly onEdit: (project: UserProjectRecord) => void;
}

export default function HomeProjectListRow({
  project,
  onEdit,
}: HomeProjectListRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 dark:border-gray-800 dark:bg-white/[0.02]">
      <span className="min-w-0 truncate text-sm font-medium text-gray-800 dark:text-white/90">
        {project.name}
      </span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="shrink-0 !px-3 !py-2"
        onClick={() => {
          onEdit(project);
        }}
      >
        Edit
      </Button>
    </div>
  );
}
