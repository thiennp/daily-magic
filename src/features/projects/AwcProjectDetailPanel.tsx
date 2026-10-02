"use client";

import Link from "next/link";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectAccessPanel from "@/features/projects/access/AwcProjectAccessPanel";
import AwcProjectDetailPrimaryColumn from "@/features/projects/AwcProjectDetailPrimaryColumn";
import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import AppPanel from "@/components/surfaces/AppPanel";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename?: boolean;
}

export default function AwcProjectDetailPanel({
  project,
  startRename = false,
}: AwcProjectDetailPanelProps) {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const { deviceDisplayName, presence, editCta } =
    useAwcProjectDevicePresentation({
      project,
      devices,
      displayNameById,
      localTokenHash,
    });
  const {
    counts,
    items,
    isLoading: isCompositionLoading,
  } = useAwcProjectComposition(project.id);

  return (
    <AppPanel padding="compact">
      <p className="mb-4">
        <Link
          href="/projects"
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          ← All projects
        </Link>
      </p>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] xl:items-start xl:gap-10">
        <AwcProjectDetailPrimaryColumn
          project={project}
          startRename={startRename}
          deviceDisplayName={deviceDisplayName}
          presence={presence}
          editCta={editCta}
          counts={counts}
          items={items}
          isCompositionLoading={isCompositionLoading}
        />
        <aside className="min-w-0 xl:sticky xl:top-6">
          <AwcProjectAccessPanel projectId={project.id} className="xl:mt-0" />
        </aside>
      </div>
    </AppPanel>
  );
}
