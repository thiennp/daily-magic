"use client";

import { useState } from "react";

import type { AutoSkillsState } from "@/features/project-auto-skills/public-api/presentation";
import AwcAutoSkillQuestionCard from "@/features/projects/autoskills/AwcAutoSkillQuestionCard";
import AwcAutoSkillsActions from "@/features/projects/library/AwcAutoSkillsActions";
import AwcAutoSkillsAgentPicker from "@/features/projects/library/AwcAutoSkillsAgentPicker";
import AwcAutoSkillsHeader from "@/features/projects/library/AwcAutoSkillsHeader";
import AwcAutoSkillsJudgePicker from "@/features/projects/library/AwcAutoSkillsJudgePicker";
import {
  autoSkillsDetailParts,
  formatAutoSkillsStatus,
} from "@/features/projects/library/utils/formatAutoSkillsStatus";

interface AwcProjectLibraryAutoSkillsProps {
  readonly auto: AutoSkillsState;
  /** Refresh the skill list after "Save as skill". */
  readonly onSaved: () => void;
}

/** Library "Auto skills" card (owner only): switch, judge, manual scan, drafts to review. */
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
    <section
      aria-label="Auto skills"
      className="flex flex-col gap-4 rounded-2xl border border-awc-border bg-awc-tile/60 p-4 dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <AwcAutoSkillsHeader
        on={overview.enabled}
        paused={status.paused}
        busy={auto.busy}
        onToggle={() => void auto.setEnabled(!overview.enabled)}
      />
      {overview.enabled ? (
        <>
          <p
            role="status"
            className={`rounded-lg px-3 py-2 text-[13px] ${
              status.paused
                ? "bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200"
                : "bg-white/70 text-awc-fg-muted dark:bg-white/[0.04] dark:text-gray-300"
            }`}
          >
            {status.paused
              ? status.line
              : autoSkillsDetailParts(overview, nowMs).join(" · ")}
            {overview.statusNote !== null ? (
              <span className="mt-0.5 block text-awc-fg dark:text-gray-200">
                {overview.statusNote}
              </span>
            ) : null}
          </p>
          <AwcAutoSkillsJudgePicker
            value={overview.judgePref}
            busy={auto.busy}
            onChange={(pref) => void auto.setJudgePref(pref)}
          />
          {overview.judgePref === "auto" || overview.judgePref === "agent" ? (
            <AwcAutoSkillsAgentPicker
              value={overview.judgeAgent}
              busy={auto.busy}
              onChange={(agent) => void auto.setJudgeAgent(agent)}
            />
          ) : null}
          <AwcAutoSkillsActions
            busy={auto.busy}
            scanning={auto.scanning}
            scanError={auto.scanError}
            waiting={waiting}
            open={open}
            onScan={() => void auto.scan()}
            onToggleDrafts={() => setOpen(!open)}
          />
        </>
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
    </section>
  );
}
