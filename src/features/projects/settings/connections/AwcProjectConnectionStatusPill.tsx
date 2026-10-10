import { PROJECT_V5_CHIP_BASE_CLASS } from "@/features/projects/public-api/types";
import type { ProjectConnectionStatus } from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

const LABEL: Record<ProjectConnectionStatus, string> = {
  connected: C.statusConnected,
  expired: C.statusExpired,
  error: C.statusError,
  none: C.statusNone,
};

const CLASS: Record<ProjectConnectionStatus, string> = {
  connected: `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-ok-soft text-awc-ok dark:bg-success-500/15 dark:text-success-400`,
  expired: `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-warn-soft text-awc-warn dark:bg-warning-500/15 dark:text-warning-400`,
  error: `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-warn-soft text-awc-warn dark:bg-warning-500/15 dark:text-warning-400`,
  none: `${PROJECT_V5_CHIP_BASE_CLASS} bg-awc-tile-2 text-awc-fg-muted dark:bg-white/10 dark:text-gray-300`,
};

/** Status pill — COPY Expired (not “Sign-in expired”). */
export default function AwcProjectConnectionStatusPill({
  status,
}: {
  readonly status: ProjectConnectionStatus;
}) {
  return <span className={CLASS[status]}>{LABEL[status]}</span>;
}
