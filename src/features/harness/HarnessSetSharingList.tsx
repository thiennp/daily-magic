"use client";

import { Fragment } from "react";

import { COMPANY_MEMBERS_LABEL } from "@/lib/admin/companyGroupCopy.constant";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import HomeSetupDivider from "@/features/home/HomeSetupDivider";
import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";
import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import type { HarnessSetSharingVisibilityValue } from "@/lib/harness/harnessSetSharingQueries";

const SHARING_ROW_BOX_CLASS =
  "flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700";

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
  const embedded = useHomeSetupEmbedded();

  if (sets.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Publish your shared setup first — your Mac sends its rule list when it
        connects.
      </p>
    );
  }

  return (
    <ul className={embedded ? "mt-4 list-none p-0" : "mt-4 space-y-3"}>
      {sets.map((set, index) => (
        <Fragment key={set.slug}>
          {index > 0 ? (
            <li className="list-none">
              <HomeSetupDivider className="my-3" />
            </li>
          ) : null}
          <li
            className={resolveHomeSetupNestedBoxClass(
              embedded,
              SHARING_ROW_BOX_CLASS,
              "flex flex-wrap items-center gap-3",
            )}
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
        </Fragment>
      ))}
    </ul>
  );
}

export type { HarnessSetSharingRow };
