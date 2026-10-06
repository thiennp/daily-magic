import type { ReactNode } from "react";

import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";

interface AwcProjectDetailHeaderStatusProps {
  readonly presence: ProjectDevicePresenceLabel;
  readonly deviceDisplayName: string;
  /** Trailing slot (folder path) rendered after the last separator. */
  readonly children: ReactNode;
}

const DOT_BY_STATUS: Record<
  ProjectDevicePresenceLabel["statusIcon"],
  string
> = {
  online: "bg-success-500",
  offline: "bg-gray-300 dark:bg-gray-600",
  reconnecting: "bg-warning-500",
};

function statusHeadline(
  presence: ProjectDevicePresenceLabel,
  copy: typeof PROJECT_PAGE_LAYOUT_V2_COPY,
): string {
  if (presence.statusIcon === "reconnecting") {
    return copy.statusReconnecting;
  }
  if (presence.statusIcon === "offline") {
    return copy.statusOffline;
  }
  return copy.statusAllGood;
}

function statusOnlineClause(
  presence: ProjectDevicePresenceLabel,
  deviceDisplayName: string,
  copy: typeof PROJECT_PAGE_LAYOUT_V2_COPY,
): string {
  const device = deviceDisplayName.trim() || "Mac";
  if (presence.statusIcon === "offline") {
    return copy.offlineOn(device);
  }
  return copy.onlineOn(device);
}

/** Project header status line: dot · headline · online clause · path slot. */
export default function AwcProjectDetailHeaderStatus({
  presence,
  deviceDisplayName,
  children,
}: AwcProjectDetailHeaderStatusProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  return (
    <p
      role="status"
      className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
    >
      <span
        aria-hidden="true"
        className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${DOT_BY_STATUS[presence.statusIcon]}`}
      />
      <span className="text-gray-700 dark:text-gray-200">
        {statusHeadline(presence, copy)}
      </span>
      <span aria-hidden="true">·</span>
      <span>{statusOnlineClause(presence, deviceDisplayName, copy)}</span>
      <span aria-hidden="true">·</span>
      {children}
    </p>
  );
}
