import { HARNESS_KIND_LABELS } from "@/features/harness/constants/harnessFormOptions";
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
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/60">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Harness bundle
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
        {harnessName}
      </p>
      <ul className="mt-2 space-y-1">
        {harnessItems.map((item) => (
          <li
            key={item.id}
            className="text-xs text-gray-600 dark:text-gray-400"
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">
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
