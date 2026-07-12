import { HARNESS_WRITER_OPTIONS } from "@/features/harness/constants/harnessFormOptions";
import listHarnessManifestSets from "@/lib/agentWitch/harness/listHarnessManifestSets";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

interface HarnessSetManagerProps {
  readonly localManifest: HarnessManifest | null;
  readonly newSetName: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly canCreateSet: boolean;
  readonly onNewSetNameChange: (value: string) => void;
  readonly onWriterAgentChange: (value: HarnessWriterAgent) => void;
  readonly onCreateSet: () => void;
}

export default function HarnessSetManager({
  localManifest,
  newSetName,
  writerAgent,
  canCreateSet,
  onNewSetNameChange,
  onWriterAgentChange,
  onCreateSet,
}: HarnessSetManagerProps) {
  const existingSets = listHarnessManifestSets(localManifest);

  return (
    <div className="mt-5 space-y-4">
      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <label className="block text-sm">
          <span className="font-medium text-gray-800 dark:text-white/90">
            New bundle
          </span>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={newSetName}
              onChange={(event) => {
                onNewSetNameChange(event.target.value);
              }}
              placeholder="Frontend rules"
              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
            <button
              type="button"
              disabled={!canCreateSet}
              onClick={onCreateSet}
              className="inline-flex h-[46px] shrink-0 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
            >
              Create set
            </button>
          </div>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-gray-800 dark:text-white/90">
            Writer agent
          </span>
          <select
            value={writerAgent}
            onChange={(event) => {
              onWriterAgentChange(event.target.value as HarnessWriterAgent);
            }}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          >
            {HARNESS_WRITER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {existingSets.length > 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-white/[0.02]">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            Your bundles
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {existingSets.map((set) => (
              <li
                key={set.slug}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              >
                {set.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No bundles yet. Create one, then attach rules, skills, and other items
          to it.
        </p>
      )}
    </div>
  );
}
