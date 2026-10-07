"use client";

import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import type { AccessLogCategoryFilter } from "@/features/projects/accessLog/hooks/useAwcAccessLog";

const CHIPS: readonly { readonly id: AccessLogCategoryFilter; readonly label: string }[] = [
  { id: "all", label: C.filterAll },
  { id: "access", label: C.filterAccess },
  { id: "wake", label: C.filterWake },
  { id: "safety", label: C.filterSafety },
];

const CHIP =
  "rounded-full px-2.5 py-1 text-[12px] font-medium transition";
const ON = `${CHIP} bg-gray-900 text-white dark:bg-white dark:text-gray-900`;
const OFF = `${CHIP} bg-awc-fill text-awc-fg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600`;

interface AwcAccessLogFilterChipsProps {
  readonly category: AccessLogCategoryFilter;
  readonly onChange: (c: AccessLogCategoryFilter) => void;
}

export default function AwcAccessLogFilterChips({
  category,
  onChange,
}: AwcAccessLogFilterChipsProps) {
  return (
    <div
      role="group"
      aria-label={C.filterLabel}
      className="flex flex-wrap gap-1.5"
    >
      {CHIPS.map((chip) => (
        <button
          key={chip.id}
          type="button"
          className={category === chip.id ? ON : OFF}
          aria-pressed={category === chip.id}
          onClick={() => onChange(chip.id)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
