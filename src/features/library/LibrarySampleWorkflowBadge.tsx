"use client";

import isSampleWorkflowCapability from "@/lib/capabilities/isSampleWorkflowCapability";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface LibrarySampleWorkflowBadgeProps {
  readonly capability: PublishedCapabilityRecord;
}

export default function LibrarySampleWorkflowBadge({
  capability,
}: LibrarySampleWorkflowBadgeProps) {
  if (!isSampleWorkflowCapability(capability)) {
    return null;
  }

  return (
    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      Sample
    </span>
  );
}
