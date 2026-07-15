"use client";

import { useCallback, useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_NESTED_CARD_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import type { CapabilityImprovementInboxItem } from "@/lib/improvements/types/CapabilityImprovementRecord.type";

export default function ImprovementReviewPanel() {
  const [items, setItems] = useState<readonly CapabilityImprovementInboxItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = useCallback(async (): Promise<void> => {
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
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <AppPanel>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        Planned assistant updates
      </h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Accepting a plan publishes a new assistant version. Nothing changes
        until you accept.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.id} className={APP_SURFACE_NESTED_CARD_CLASS}>
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
                className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
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
                className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AppPanel>
  );
}
