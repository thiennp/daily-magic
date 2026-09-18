"use client";

import Link from "next/link";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import AwcProjectReadOnlyCompositionSections from "@/features/projects/AwcProjectReadOnlyCompositionSections";
import useAwcProjectComposition from "@/features/projects/hooks/useAwcProjectComposition";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import { shouldShowProjectEditOnMacHelperText } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import formatProjectCompositionCountsLine from "@/lib/projects/formatProjectCompositionCountsLine";
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
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>{project.name}</h2>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        View-only on the web. Edit on {deviceDisplayName} in Agent Witch Live.
      </p>
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-gray-200/80 bg-gray-50/80 p-4 dark:border-gray-800/80 dark:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between">
        <AwcProjectPresenceBadge
          statusIcon={presence.statusIcon}
          text={presence.text}
        />
        <AwcProjectEditOnMacActions
          editCta={editCta}
          size="compact"
          layout="buttonOnly"
          fullWidthOnMobile
        />
      </div>
      {editCta.helperText !== null &&
      shouldShowProjectEditOnMacHelperText(editCta.state) ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {editCta.helperText}
        </p>
      ) : null}
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
            Composition
          </dt>
          <dd className="mt-0.5 text-gray-800 dark:text-white/90">
            {formatProjectCompositionCountsLine(counts)}
          </dd>
        </div>
      </dl>
      <AwcProjectReadOnlyCompositionSections
        deviceDisplayName={deviceDisplayName}
        items={items}
        isLoading={isCompositionLoading}
      />
    </AppPanel>
  );
}
