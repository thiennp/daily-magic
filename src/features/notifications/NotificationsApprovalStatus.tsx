import {
  NOTIFICATIONS_CHIP_DANGER_CLASS,
  NOTIFICATIONS_CHIP_OUTLINE_CLASS,
  NOTIFICATIONS_CHIP_SUCCESS_CLASS,
  NOTIFICATIONS_CHIP_WARNING_CLASS,
} from "@/features/notifications/notificationsClasses.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationApprovalState } from "@/features/notifications/notificationsDemoItems.constant";

interface NotificationsApprovalStatusProps {
  readonly state: NotificationApprovalState;
  readonly minsLeft?: number;
}

export default function NotificationsApprovalStatus({
  state,
  minsLeft,
}: NotificationsApprovalStatusProps) {
  if (state === "pending") {
    const label =
      typeof minsLeft === "number"
        ? NOTIFICATIONS_COPY.waitingMins.replace("{mins}", String(minsLeft))
        : NOTIFICATIONS_COPY.waitingForYou;
    return <span className={NOTIFICATIONS_CHIP_WARNING_CLASS}>{label}</span>;
  }
  if (state === "approved") {
    return (
      <span className={NOTIFICATIONS_CHIP_SUCCESS_CLASS}>
        {NOTIFICATIONS_COPY.approved}
      </span>
    );
  }
  if (state === "denied") {
    return (
      <span className={NOTIFICATIONS_CHIP_DANGER_CLASS}>
        {NOTIFICATIONS_COPY.denied}
      </span>
    );
  }
  return (
    <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
      {NOTIFICATIONS_COPY.timedOut}
    </span>
  );
}
