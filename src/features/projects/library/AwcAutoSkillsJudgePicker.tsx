"use client";

import type { AutoSkillJudgePref } from "@/features/project-auto-skills/public-api/types";
import { AUTO_SKILL_JUDGES } from "@/features/projects/library/autoSkillsJudges.constant";

interface AwcAutoSkillsJudgePickerProps {
  readonly value: AutoSkillJudgePref;
  readonly busy: boolean;
  readonly onChange: (pref: AutoSkillJudgePref) => void;
}

/** Segmented control for who judges whether two steps are the same. */
export default function AwcAutoSkillsJudgePicker({
  value,
  busy,
  onChange,
}: AwcAutoSkillsJudgePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium uppercase tracking-wide text-awc-fg-subtle">
        Judge
      </span>
      <div
        role="radiogroup"
        aria-label="Judge"
        className="inline-flex max-w-full flex-wrap gap-1 self-start rounded-xl bg-gray-200/60 p-1 dark:bg-white/[0.06]"
      >
        {AUTO_SKILL_JUDGES.map((judge) => {
          const selected = value === judge.value;
          return (
            <button
              key={judge.value}
              type="button"
              role="radio"
              aria-checked={selected}
              title={judge.hint}
              disabled={busy || judge.disabled === true}
              onClick={() => onChange(judge.value)}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                selected
                  ? "bg-white text-awc-fg shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-awc-fg-muted hover:text-awc-fg dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {judge.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
