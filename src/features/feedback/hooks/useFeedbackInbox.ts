import { useCallback, useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import type { CapabilityFeedbackInboxItem } from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

export function useFeedbackInbox(): {
  readonly items: readonly CapabilityFeedbackInboxItem[];
  readonly isLoading: boolean;
  readonly reloadInbox: () => Promise<void>;
} {
  const demoPreview = useDemoPreview();
  const [items, setItems] = useState<readonly CapabilityFeedbackInboxItem[]>(
    () => demoPreview?.feedbackItems ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  const reloadInbox = useCallback(async (): Promise<void> => {
    if (demoPreview) {
      return;
    }

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
  }, [demoPreview]);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void reloadInbox();
  }, [demoPreview, reloadInbox]);

  return { items, isLoading, reloadInbox };
}
