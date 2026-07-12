import FeedbackImprovementDraft from "@/features/improvements/FeedbackImprovementDraft";
import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

interface FeedbackInboxItemActionsProps {
  readonly item: CapabilityFeedbackInboxItem;
  readonly onUpdated: () => void;
}

export default function FeedbackInboxItemActions({
  item,
  onUpdated,
}: FeedbackInboxItemActionsProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => {
          void fetch(`/api/capabilities/feedback/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "acknowledged" }),
          }).then(onUpdated);
        }}
        className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white"
      >
        Mark reviewed
      </button>
      <button
        type="button"
        onClick={() => {
          void fetch(`/api/capabilities/feedback/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "dismissed" }),
          }).then(onUpdated);
        }}
        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-700"
      >
        Dismiss
      </button>
      {item.capabilityId ? (
        <FeedbackImprovementDraft
          feedbackId={item.id}
          defaultSuggestion={item.comment}
          onCreated={onUpdated}
        />
      ) : null}
    </div>
  );
}
