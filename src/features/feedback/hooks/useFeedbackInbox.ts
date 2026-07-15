import { useCallback, useEffect, useState } from "react";

import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

export function useFeedbackInbox(): {
  readonly items: readonly CapabilityFeedbackInboxItem[];
  readonly isLoading: boolean;
  readonly reloadInbox: () => Promise<void>;
} {
  const [items, setItems] = useState<readonly CapabilityFeedbackInboxItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const reloadInbox = useCallback(async (): Promise<void> => {
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
  }, []);

  useEffect(() => {
    void reloadInbox();
  }, [reloadInbox]);

  return { items, isLoading, reloadInbox };
}
