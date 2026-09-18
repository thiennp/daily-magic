"use client";

import Button from "@/components/ui/button/Button";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface HomeProjectListRowProps {
  readonly project: UserProjectRecord;
  readonly onEdit: (project: UserProjectRecord) => void;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
}

export default function HomeProjectListRow({
  project,
  onEdit,
  devices,
  displayNameById,
  localTokenHash,
}: HomeProjectListRowProps) {
  const { presence } = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 dark:border-gray-800 dark:bg-white/[0.02]">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {project.name}
        </p>
        <AwcProjectPresenceBadge
          statusIcon={presence.statusIcon}
          text={presence.text}
        />
      </div>
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
