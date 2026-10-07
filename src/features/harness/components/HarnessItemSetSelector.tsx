import type { HarnessManifestSetSummary } from "@/lib/agentWitch/harness/listHarnessManifestSets";

interface HarnessItemSetSelectorProps {
  readonly availableSets: readonly HarnessManifestSetSummary[];
  readonly selectedSetSlugs: readonly string[];
  readonly onSelectedSetSlugsChange: (setSlugs: readonly string[]) => void;
}

export default function HarnessItemSetSelector({
  availableSets,
  selectedSetSlugs,
  onSelectedSetSlugsChange,
}: HarnessItemSetSelectorProps) {
  if (availableSets.length === 0) {
    return (
      <p className="mt-3 text-xs text-awc-fg-muted dark:text-gray-400">
        Install a bundle from Library or Marketplace before attaching items.
      </p>
    );
  }

  return (
    <fieldset className="mt-3">
      <legend className="text-sm font-medium text-awc-fg dark:text-white/90">
        Include in sets
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {availableSets.map((set) => {
          const isSelected = selectedSetSlugs.includes(set.slug);

          return (
            <label
              key={set.slug}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                isSelected
                  ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-300"
                  : "border-awc-border text-awc-fg-muted hover:border-awc-border-strong dark:border-gray-700 dark:text-gray-300"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {
                  const nextSlugs = isSelected
                    ? selectedSetSlugs.filter((slug) => slug !== set.slug)
                    : [...selectedSetSlugs, set.slug];
                  onSelectedSetSlugsChange(nextSlugs);
                }}
                className="h-3.5 w-3.5 rounded border-awc-border-strong text-brand-500 focus:ring-awc-blue-600/20"
              />
              {set.name}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
