"use client";

import type {
  SkillComparisonAnswer,
  SkillComparisonView,
} from "@/features/project-auto-skills/public-api/types";

import {
  OW_CARD_NEEDS_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";

interface AwcSkillComparisonCardProps {
  readonly comparison: SkillComparisonView;
  readonly busy: boolean;
  readonly onAnswer: (answer: SkillComparisonAnswer) => void;
}

const tally = (done: number, runs: number): string =>
  `${done} of ${runs} runs succeeded`;

/** Two versions of a skill ran in turn: pick one once both have enough runs, else show progress. */
export default function AwcSkillComparisonCard({
  comparison,
  busy,
  onAnswer,
}: AwcSkillComparisonCardProps) {
  const lines = [
    `Version ${comparison.oldVersion} (current): ${tally(comparison.oldDone, comparison.oldRuns)}.`,
    `Version ${comparison.newVersion} (new): ${tally(comparison.newDone, comparison.newRuns)}.`,
  ];
  if (!comparison.ready) {
    return (
      <p className="text-[13px] text-awc-fg-muted">
        Comparing {comparison.skillName}. {lines.join(" ")} Asking again after 3
        runs of each.
      </p>
    );
  }
  return (
    <article
      className={OW_CARD_NEEDS_CLASS}
      aria-label={`Pick a version of ${comparison.skillName}`}
    >
      <span className="text-[12.5px] font-semibold uppercase tracking-wide text-awc-fg-subtle">
        Skill comparison
      </span>
      <h3 className="m-0 mt-1 text-[15px] font-semibold text-awc-fg">
        Which version of {comparison.skillName} should stay?
      </h3>
      <p className="mt-1 text-[13px] text-awc-fg-muted">
        {lines.join(" ")} Tasks differ, so treat this as a hint, not proof.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={busy}
          className={OW_PRIMARY_BUTTON_CLASS}
          onClick={() => onAnswer("new")}
        >
          Use the new one
        </button>
        <button
          type="button"
          disabled={busy}
          className={OW_SECONDARY_BUTTON_CLASS}
          onClick={() => onAnswer("old")}
        >
          Keep the current one
        </button>
      </div>
    </article>
  );
}
