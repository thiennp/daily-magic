"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { useFeedbackInbox } from "@/features/feedback/hooks/useFeedbackInbox";
import FeedbackInboxItemRow from "@/features/feedback/FeedbackInboxItemRow";

export default function FeedbackInboxPanel() {
  const { items, isLoading, reloadInbox } = useFeedbackInbox();

  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <AppPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Feedback inbox</h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Teammates shared notes about your assistants. Review them when you have
        time.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <FeedbackInboxItemRow
            key={item.id}
            item={item}
            onUpdated={() => {
              void reloadInbox();
            }}
          />
        ))}
      </ul>
    </AppPanel>
  );
}
