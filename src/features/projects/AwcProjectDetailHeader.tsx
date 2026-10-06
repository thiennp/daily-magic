"use client";

import AwcProjectDetailHeaderActions from "@/features/projects/AwcProjectDetailHeaderActions";
import AwcProjectDetailHeaderStatus from "@/features/projects/AwcProjectDetailHeaderStatus";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectMobileMembersChip from "@/features/projects/AwcProjectMobileMembersChip";
import AwcProjectPathDisplay from "@/features/projects/AwcProjectPathDisplay";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

interface AwcProjectDetailHeaderProps {
  readonly projectId: string;
  readonly projectName: string;
  readonly folderPath: string;
  readonly presence: ProjectDevicePresenceLabel;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly canRename: boolean;
  readonly canApprove: boolean;
  readonly onRename: () => void;
  readonly onInvite: () => void;
  readonly onDelete: () => void;
}

export default function AwcProjectDetailHeader({
  projectId,
  projectName,
  folderPath,
  presence,
  deviceDisplayName,
  editCta,
  canRename,
  canApprove,
  onRename,
  onInvite,
  onDelete,
}: AwcProjectDetailHeaderProps) {
  const editCtaEn = {
    ...editCta,
    buttonLabel: PROJECT_PAGE_LAYOUT_V2_COPY.editOnThisComputer,
  };

  return (
    <header className="flex min-w-0 flex-col gap-4">
      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-[-0.03em] text-gray-900 dark:text-white">
            {projectName}
          </h1>
          <AwcProjectDetailHeaderStatus
            presence={presence}
            deviceDisplayName={deviceDisplayName}
          >
            <span className="min-w-0 max-w-[min(30ch,50vw)] overflow-hidden">
              <AwcProjectPathDisplay folderPath={folderPath} />
            </span>
          </AwcProjectDetailHeaderStatus>
          <AwcProjectMobileMembersChip
            projectId={projectId}
            canApprove={canApprove}
          />
        </div>
        <AwcProjectDetailHeaderActions
          canRename={canRename}
          onRename={onRename}
          onInvite={onInvite}
          onDelete={onDelete}
        >
          <AwcProjectEditOnMacActions
            editCta={editCtaEn}
            size="compact"
            layout="buttonOnly"
            fullWidthOnMobile
          />
        </AwcProjectDetailHeaderActions>
      </div>
    </header>
  );
}
