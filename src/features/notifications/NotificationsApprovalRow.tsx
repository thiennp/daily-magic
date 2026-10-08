import NotificationsAlsoOn from "@/features/notifications/NotificationsAlsoOn";
import NotificationsApprovalActions from "@/features/notifications/NotificationsApprovalActions";
import NotificationsApprovalDoneLine from "@/features/notifications/NotificationsApprovalDoneLine";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

interface NotificationsApprovalRowProps {
  readonly item: Extract<NotificationItem, { kind: "join" | "run" }>;
  readonly onDecide: (id: string, decision: "approved" | "denied") => void;
}

/** Done line (resolved) or action buttons (pending), plus the "Also on/in" link. */
export default function NotificationsApprovalRow({
  item,
  onDecide,
}: NotificationsApprovalRowProps) {
  return (
    <>
      <NotificationsApprovalDoneLine item={item} />
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <NotificationsApprovalActions item={item} onDecide={onDecide} />
        <NotificationsAlsoOn item={item} />
      </div>
    </>
  );
}
