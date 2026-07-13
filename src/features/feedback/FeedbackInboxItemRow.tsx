import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import FeedbackInboxItemActions from "@/features/feedback/FeedbackInboxItemActions";
import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

interface FeedbackInboxItemRowProps {
  readonly item: CapabilityFeedbackInboxItem;
  readonly onUpdated: () => void;
}

export default function FeedbackInboxItemRow({
  item,
  onUpdated,
}: FeedbackInboxItemRowProps) {
  return (
    <li className={APP_SURFACE_NESTED_CARD_CLASS}>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {item.capabilityName ?? "Assistant"} · {item.reviewerEmail}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {item.comment}
      </p>
      <FeedbackInboxItemActions item={item} onUpdated={onUpdated} />
    </li>
  );
}
