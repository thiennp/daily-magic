import { HARNESS_KIND_LABELS } from "@/features/harness/public-api/types";
import type { CapabilityTemplateHarnessItemSummary } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface CapabilityTemplateHarnessPreviewProps {
  readonly harnessName: string;
  readonly harnessItems: readonly CapabilityTemplateHarnessItemSummary[];
}

export default function CapabilityTemplateHarnessPreview({
  harnessName,
  harnessItems,
}: CapabilityTemplateHarnessPreviewProps) {
  return (
    <div className="rounded-lg border border-awc-border bg-awc-surface-2 p-3 dark:border-gray-800 dark:bg-white/[0.06]">
      <p className="text-xs font-medium uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
        Rules bundle
      </p>
      <p className="mt-1 text-sm font-medium text-awc-fg dark:text-white/90">
        {harnessName}
      </p>
      <ul className="mt-2 space-y-1">
        {harnessItems.map((item) => (
          <li
            key={item.id}
            className="text-xs text-awc-fg-muted dark:text-gray-400"
          >
            <span className="font-medium text-awc-fg dark:text-gray-300">
              {HARNESS_KIND_LABELS[item.kind] ?? item.kind}
            </span>
            {" · "}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
