import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
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
        className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
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
        className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
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
