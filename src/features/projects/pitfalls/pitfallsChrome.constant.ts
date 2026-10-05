import {
  OVERVIEW_PILL_NEUTRAL_CLASS,
  OVERVIEW_SEVERITY_BLOCK_CLASS,
  OVERVIEW_SEVERITY_WARN_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import type { ProjectPitfallSeverity } from "@agent-witch/shared/pitfalls";

/** Gray/black Pitfalls tab chrome — severity pills reuse Overview classes. */
export const PITFALL_SEVERITY_PILL_CLASS: Readonly<
  Record<ProjectPitfallSeverity, string>
> = {
  block: OVERVIEW_SEVERITY_BLOCK_CLASS,
  warn: OVERVIEW_SEVERITY_WARN_CLASS,
  info: OVERVIEW_PILL_NEUTRAL_CLASS,
};

const CHIP_BASE =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40";

export const PITFALL_CHIP_ACTIVE_CLASS = `${CHIP_BASE} border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900`;

export const PITFALL_CHIP_IDLE_CLASS = `${CHIP_BASE} border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/60`;

export const PITFALL_SEARCH_INPUT_CLASS =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 sm:w-64";

export const PITFALL_EMPTY_CLASS =
  "rounded-xl border border-dashed border-gray-200 p-4 text-[13px] text-gray-500 dark:border-gray-700 dark:text-gray-400";

export const PITFALL_TRIGGER_CHIP_CLASS =
  "rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[11.5px] text-gray-700 dark:bg-white/10 dark:text-gray-300";

export const PITFALL_FIX_BOX_CLASS =
  "rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 dark:border-gray-800 dark:bg-white/[0.04] dark:text-gray-100";
