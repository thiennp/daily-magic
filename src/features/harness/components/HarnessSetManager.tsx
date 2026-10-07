"use client";

import { HARNESS_WRITER_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import { useHomeSetupEmbedded } from "@/features/home/HomeSetupEmbeddedContext";
import HomeSetupDivider from "@/features/home/HomeSetupDivider";
import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";
import listHarnessManifestSets from "@/lib/agentWitch/harness/listHarnessManifestSets";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const BUNDLES_BOX_CLASS =
  "rounded-lg border border-awc-border bg-awc-surface-2/80 p-4 dark:border-gray-700 dark:bg-white/[0.02]";

interface HarnessSetManagerProps {
  readonly localManifest: HarnessManifest | null;
  readonly writerAgent: HarnessWriterAgent;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
}

export default function HarnessSetManager({
  localManifest,
  writerAgent,
  onWriterAgentChange,
}: HarnessSetManagerProps) {
  const embedded = useHomeSetupEmbedded();
  const existingSets = listHarnessManifestSets(localManifest);

  return (
    <div className="mt-5 space-y-4">
      <label className="block max-w-sm text-sm">
        <span className="font-medium text-awc-fg dark:text-white/90">
          Which AI runs on your computer?
        </span>
        <select
          value={writerAgent}
          onChange={(event) => {
            onWriterAgentChange(event.target.value as HarnessWriterAgent);
          }}
          className="mt-2 w-full rounded-lg border border-awc-border bg-white px-4 py-3 text-sm text-awc-fg shadow-theme-xs outline-none transition focus:border-awc-blue-300 focus:ring-3 focus:ring-awc-blue-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
        >
          {HARNESS_WRITER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {existingSets.length > 0 ? (
        <>
          <HomeSetupDivider className="my-4" />
          <div
            className={resolveHomeSetupNestedBoxClass(
              embedded,
              BUNDLES_BOX_CLASS,
            )}
          >
            <p className="text-sm font-medium text-awc-fg dark:text-white/90">
              Your bundles
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {existingSets.map((set) => (
                <li
                  key={set.slug}
                  className="rounded-full border border-awc-border bg-white px-3 py-1 text-xs font-medium text-awc-fg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {set.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">
          No bundles on this computer yet. Install one from Library or
          Marketplace.
        </p>
      )}
    </div>
  );
}
