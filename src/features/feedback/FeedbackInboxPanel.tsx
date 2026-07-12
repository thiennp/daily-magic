"use client";

import { useEffect, useState } from "react";

import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

export default function FeedbackInboxPanel() {
  const [items, setItems] = useState<readonly CapabilityFeedbackInboxItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadInbox = async (): Promise<void> => {
    try {
      const response = await fetch("/api/capabilities/feedback/inbox");
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "items" in data &&
        Array.isArray((data as { items: unknown }).items)
      ) {
        setItems((data as { items: CapabilityFeedbackInboxItem[] }).items);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadInbox();
  }, []);

  if (isLoading) {
    return null;
  }

  if (items.length === 0) {
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
          <li
            key={item.id}
            className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {item.capabilityName ?? "Assistant"} · {item.reviewerEmail}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {item.comment}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  void fetch(`/api/capabilities/feedback/${item.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "acknowledged" }),
                  }).then(() => loadInbox());
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
                  }).then(() => loadInbox());
                }}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-700"
              >
                Dismiss
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
