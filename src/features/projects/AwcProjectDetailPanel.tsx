"use client";

import Link from "next/link";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectReadOnlyCompositionSections from "@/features/projects/AwcProjectReadOnlyCompositionSections";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailPanelProps {
  readonly project: UserProjectRecord;
}

export default function AwcProjectDetailPanel({
  project,
}: AwcProjectDetailPanelProps) {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const { deviceDisplayName, presence, editCta, statusPrefix } =
    useAwcProjectDevicePresentation({
      project,
      devices,
      displayNameById,
      localTokenHash,
    });

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
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>{project.name}</h2>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        View-only on the web. Edit on {deviceDisplayName} in Agent Witch Live.
      </p>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Folder
          </dt>
          <dd className="mt-0.5 text-gray-800 dark:text-white/90">
            {project.folderPath}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Mac
          </dt>
          <dd className="mt-0.5 text-gray-800 dark:text-white/90">
            <span aria-hidden="true">{statusPrefix} </span>
            {presence.text}
          </dd>
        </div>
      </dl>
      <AwcProjectReadOnlyCompositionSections
        deviceDisplayName={deviceDisplayName}
      />
      <div className="mt-6">
        <AwcProjectEditOnMacActions editCta={editCta} />
      </div>
    </AppPanel>
  );
}
