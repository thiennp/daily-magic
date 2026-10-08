"use client";

import { useState } from "react";

import type { AutoSkillJudgePref } from "@/features/project-auto-skills/public-api/types";
import type { AutoSkillsState } from "@/features/project-auto-skills/public-api/presentation";
import AwcAutoSkillQuestionCard from "@/features/projects/autoskills/AwcAutoSkillQuestionCard";
import { formatAutoSkillsStatus } from "@/features/projects/library/utils/formatAutoSkillsStatus";
import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_INPUT_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

interface AwcProjectLibraryAutoSkillsProps {
  readonly auto: AutoSkillsState;
  /** Refresh the skill list after "Save as skill". */
  readonly onSaved: () => void;
}

const JUDGES: readonly { value: AutoSkillJudgePref; label: string }[] = [
  { value: "auto", label: "Judge: automatic" },
  { value: "ollama", label: "Judge: Ollama (local)" },
  { value: "agent", label: "Judge: My coding agent" },
  { value: "bot", label: "Judge: Project bot (not available yet)" },
];

/** Library "Auto skills" strip (owner only): toggle, status, judge, questions. */
export default function AwcProjectLibraryAutoSkills({
  auto,
  onSaved,
}: AwcProjectLibraryAutoSkillsProps) {
  const [open, setOpen] = useState(false);
  // Fixed at mount: "last checked" is minute-granular and reloads on every action.
  const [nowMs] = useState(() => Date.now());
  const overview = auto.overview;
  if (overview === null) {
    return null;
  }
  const status = formatAutoSkillsStatus(overview, nowMs);
  const waiting = overview.pending.length;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-awc-border bg-awc-bg/80 px-3 py-2 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          role="status"
          className={`text-[13px] ${status.paused ? "text-awc-fg" : "text-awc-fg-muted"} dark:text-gray-300`}
        >
          {status.line}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {waiting > 0 ? (
            <button
              type="button"
              className={PANEL_BUTTON_SECONDARY_CLASS}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              Review drafts ({waiting})
            </button>
          ) : null}
          <label className="flex items-center gap-2 text-[13px] text-awc-fg dark:text-gray-200">
            <input
              type="checkbox"
              checked={overview.enabled}
              disabled={auto.busy}
              onChange={(event) => void auto.setEnabled(event.target.checked)}
            />
            Create skills automatically
          </label>
        </div>
      </div>
      {overview.enabled ? (
        <select
          aria-label="Judge"
          className={`${PANEL_INPUT_CLASS} max-w-[260px]`}
          value={overview.judgePref}
          disabled={auto.busy}
          onChange={(event) =>
            void auto.setJudgePref(event.target.value as AutoSkillJudgePref)
          }
        >
          {JUDGES.map((j) => (
            <option key={j.value} value={j.value}>
              {j.label}
            </option>
          ))}
        </select>
      ) : null}
      {overview.statusNote !== null && overview.enabled ? (
        <p className="text-[12.5px] text-awc-fg-muted dark:text-gray-400">
          {overview.statusNote}
        </p>
      ) : null}
      {open && waiting > 0 ? (
        <ul className="flex flex-col gap-2">
          {overview.pending.map((suggestion) => (
            <li key={suggestion.id}>
              <AwcAutoSkillQuestionCard
                suggestion={suggestion}
                busy={auto.busy}
                onAnswer={(answer) => {
                  void auto.answer(suggestion.id, answer).then((ok) => {
                    if (ok && answer === "save") onSaved();
                  });
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
