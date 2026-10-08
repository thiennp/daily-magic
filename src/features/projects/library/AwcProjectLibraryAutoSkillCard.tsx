"use client";

import type { AutoSkillSuggestion } from "@/features/project-auto-skills/public-api/types";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryAutoSkillCardProps {
  readonly suggestion: AutoSkillSuggestion;
  readonly busy: boolean;
  readonly onAnswer: (answer: "save" | "not_now" | "never") => void;
}

/** One owner question: "You have run this kind of task N times. Save it as a skill?" */
export default function AwcProjectLibraryAutoSkillCard({
  suggestion,
  busy,
  onAnswer,
}: AwcProjectLibraryAutoSkillCardProps) {
  return (
    <li className="flex flex-col gap-2 rounded-xl border border-awc-border bg-awc-tile px-3 py-3 dark:border-gray-800 dark:bg-white/[0.03]">
      <p className="text-[14px] font-semibold text-awc-fg dark:text-white">
        You have run this kind of task {suggestion.occurrences} times. Save it
        as a skill?
      </p>
      <p className="line-clamp-3 text-[13px] text-awc-fg-muted dark:text-gray-400">
        {suggestion.prompt}
      </p>
      {suggestion.matches.length > 0 ? (
        <ul className="text-[12.5px] text-awc-fg-muted dark:text-gray-400">
          {suggestion.matches.slice(0, 4).map((match) => (
            <li key={match.runId} className="truncate">
              {new Date(match.completedAt).toLocaleDateString()} ·{" "}
              {match.summary}
            </li>
          ))}
        </ul>
      ) : null}
      <details className="text-[13px] text-awc-fg dark:text-gray-200">
        <summary className="cursor-pointer font-medium">
          Draft skill: {suggestion.draftName}
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-awc-bg/80 p-2 text-[12px] dark:bg-black/20">
          {suggestion.draftBody}
        </pre>
      </details>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          className={PANEL_BUTTON_PRIMARY_CLASS}
          onClick={() => onAnswer("save")}
        >
          Save as skill
        </button>
        <button
          type="button"
          disabled={busy}
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={() => onAnswer("not_now")}
        >
          Not now
        </button>
        <button
          type="button"
          disabled={busy}
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={() => onAnswer("never")}
        >
          Never for this task
        </button>
      </div>
    </li>
  );
}
