"use client";

import { useFeedbackInbox } from "@/features/feedback/hooks/useFeedbackInbox";
import FeedbackInboxItemRow from "@/features/feedback/FeedbackInboxItemRow";

export default function FeedbackInboxPanel() {
  const { items, isLoading, reloadInbox } = useFeedbackInbox();

  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Feedback inbox
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
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
    </section>
  );
}
