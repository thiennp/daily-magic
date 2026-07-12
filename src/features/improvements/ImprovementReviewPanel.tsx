"use client";

import { useEffect, useState } from "react";

import type { CapabilityImprovementInboxItem } from "@/lib/improvements/types/CapabilityImprovementRecord.type";

export default function ImprovementReviewPanel() {
  const [items, setItems] = useState<readonly CapabilityImprovementInboxItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = async (): Promise<void> => {
    try {
      const response = await fetch("/api/capabilities/improvements/inbox");
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
        setItems((data as { items: CapabilityImprovementInboxItem[] }).items);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Planned assistant updates
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Accepting a plan publishes a new assistant version. Nothing changes
        until you accept.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
          >
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {item.capabilityName}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {item.suggestion}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  void fetch(
                    `/api/capabilities/improvements/${item.id}/accept`,
                    { method: "POST" },
                  ).then(() => loadItems());
                }}
                className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Accept and publish version
              </button>
              <button
                type="button"
                onClick={() => {
                  void fetch(
                    `/api/capabilities/improvements/${item.id}/reject`,
                    { method: "POST" },
                  ).then(() => loadItems());
                }}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-700"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
