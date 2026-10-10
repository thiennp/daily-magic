"use client";

import { useState } from "react";

import type { AutoSkillsState } from "@/features/project-auto-skills/public-api/presentation";
import { AwcAutoSkillQuestionCard } from "@/features/projects/autoskills/public-api/presentation";
import AwcAutoSkillsActions from "@/features/projects/library/AwcAutoSkillsActions";
import AwcAutoSkillsAgentPicker from "@/features/projects/library/AwcAutoSkillsAgentPicker";
import AwcAutoSkillsDeeperScan from "@/features/projects/library/AwcAutoSkillsDeeperScan";
import AwcAutoSkillsHeader from "@/features/projects/library/AwcAutoSkillsHeader";
import AwcAutoSkillsStatusLine from "@/features/projects/library/AwcAutoSkillsStatusLine";
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

/** Library "Auto skills" card (owner, or a member the owner allows; the strip hides itself when the API refuses): switch, judge, manual scan, drafts to review. */
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
          <AwcAutoSkillsStatusLine
            status={status}
            detail={autoSkillsDetailParts(overview, nowMs).join(" · ")}
            note={overview.statusNote}
          />
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
          {auto.scanning ? null : (
            <AwcAutoSkillsDeeperScan
              total={overview.gitCommits}
              scanned={overview.gitScanned}
              busy={auto.busy}
              onScan={(commits) => void auto.scanCommits(commits)}
            />
          )}
          <AwcAutoSkillsActions
            busy={auto.busy}
            scanning={auto.scanning}
            scanningDocs={auto.scanningDocs}
            scanError={auto.scanError}
            waiting={waiting}
            open={open}
            onScan={() => void auto.scan()}
            onScanDocs={() => void auto.scanDocs()}
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
