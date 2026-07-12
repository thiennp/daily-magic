"use client";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";

const TYPE_LABEL_MAP: Record<CapabilityTypeValue, string> = {
  [CapabilityType.AGENT]: "Agent",
  [CapabilityType.WORKFLOW]: "Workflow",
};

interface LibraryPlaybookTypeBadgeProps {
  readonly type: CapabilityTypeValue;
}

export default function LibraryPlaybookTypeBadge({
  type,
}: LibraryPlaybookTypeBadgeProps) {
  return (
    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
      {TYPE_LABEL_MAP[type]}
    </span>
  );
}
