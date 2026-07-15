import { COMPANY_MEMBERS_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import type { HarnessSetSharingVisibilityValue } from "@/lib/harness/harnessSetSharingQueries";

interface HarnessSetSharingRow {
  readonly slug: string;
  readonly name: string;
  readonly visibility: HarnessSetSharingVisibilityValue;
}

interface HarnessSetSharingListProps {
  readonly sets: readonly HarnessSetSharingRow[];
  readonly onVisibilityChange: (
    setSlug: string,
    visibility: HarnessSetSharingVisibilityValue,
  ) => void;
  readonly onSave: (setSlug: string) => void;
}

export default function HarnessSetSharingList({
  sets,
  onVisibilityChange,
  onSave,
}: HarnessSetSharingListProps) {
  if (sets.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Publish a setup snapshot first — your agent reports the manifest when it
        connects.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {sets.map((set) => (
        <li
          key={set.slug}
          className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {set.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {set.slug}
            </p>
          </div>
          <select
            value={set.visibility}
            onChange={(event) => {
              onVisibilityChange(
                set.slug,
                event.target.value as HarnessSetSharingVisibilityValue,
              );
            }}
            className="rounded-lg border border-gray-200 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value={HarnessSharingVisibility.PRIVATE}>Private</option>
            <option value={HarnessSharingVisibility.GROUP}>
              {COMPANY_MEMBERS_LABEL} only
            </option>
            <option value={HarnessSharingVisibility.PUBLIC}>
              Public (signed-in users)
            </option>
          </select>
          <button
            type="button"
            onClick={() => {
              onSave(set.slug);
            }}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Save
          </button>
        </li>
      ))}
    </ul>
  );
}

export type { HarnessSetSharingRow };
