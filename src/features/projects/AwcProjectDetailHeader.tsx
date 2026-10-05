"use client";

import Link from "next/link";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectPathDisplay from "@/features/projects/AwcProjectPathDisplay";
import AwcProjectPresenceBadge from "@/features/projects/AwcProjectPresenceBadge";
import { PROJECT_PAGE_SHELL_COPY } from "@/features/projects/projectPageShellCopy.constant";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

interface AwcProjectDetailHeaderProps {
  readonly projectName: string;
  readonly folderPath: string;
  readonly presence: ProjectDevicePresenceLabel;
  readonly editCta: ProjectEditOnMacCta;
  readonly canRename: boolean;
  readonly onRename: () => void;
}

export default function AwcProjectDetailHeader({
  projectName,
  folderPath,
  presence,
  editCta,
  canRename,
  onRename,
}: AwcProjectDetailHeaderProps) {
  const copy = PROJECT_PAGE_SHELL_COPY;

  return (
    <header className="flex min-w-0 flex-col gap-4">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-gray-500 dark:text-gray-400">
          <li>
            <Link
              href="/projects"
              className="font-medium text-gray-700 underline-offset-4 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-white"
            >
              {copy.breadcrumbAllProjects}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="min-w-0 truncate font-medium text-gray-900 dark:text-white">
            {projectName}
          </li>
        </ol>
      </nav>

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <h1 className="text-[clamp(1.75rem,4vw,2.375rem)] font-bold tracking-tight text-gray-900 dark:text-white">
            {projectName}
          </h1>
          <div className="flex min-w-0 max-w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <AwcProjectPresenceBadge
              statusIcon={presence.statusIcon}
              text={presence.text}
              variant="pill"
            />
            <div className="min-w-0 max-w-full overflow-hidden">
              <AwcProjectPathDisplay folderPath={folderPath} />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          {canRename ? (
            <button
              type="button"
              onClick={onRename}
              className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            >
              {copy.rename}
            </button>
          ) : null}
          <AwcProjectEditOnMacActions
            editCta={editCta}
            size="compact"
            layout="buttonOnly"
            fullWidthOnMobile
          />
        </div>
      </div>
    </header>
  );
}
