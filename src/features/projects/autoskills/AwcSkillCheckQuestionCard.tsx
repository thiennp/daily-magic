"use client";

import type {
  SkillCheckAnswer,
  SkillCheckQuestion,
} from "@/features/project-auto-skills/public-api/types";

import { sanitizeSkillTextForDisplay } from "@/features/agent/utils/sanitizeSkillTextForDisplay";
import {
  OW_CARD_NEEDS_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";

interface AwcSkillCheckQuestionCardProps {
  readonly question: SkillCheckQuestion;
  readonly busy: boolean;
  readonly onAnswer: (answer: SkillCheckAnswer) => void;
}

/** "Use a better version of this skill?" owner question: new, old, or run both to compare. */
export default function AwcSkillCheckQuestionCard({
  question,
  busy,
  onAnswer,
}: AwcSkillCheckQuestionCardProps) {
  return (
    <article
      className={OW_CARD_NEEDS_CLASS}
      aria-label={`Improve skill ${question.skillName}`}
    >
      <span className="text-[12.5px] font-semibold uppercase tracking-wide text-awc-fg-subtle">
        Skill check
      </span>
      <h3 className="m-0 mt-1 text-[15px] font-semibold text-awc-fg">
        Use a better version of {question.skillName}?
      </h3>
      <p className="mt-1 text-[13px] text-awc-fg-muted">
        Checked after {question.usesAtCheck} uses of version{" "}
        {question.skillVersion}. {sanitizeSkillTextForDisplay(question.note)}
      </p>
      <details className="mt-2 text-[13px] text-awc-fg">
        <summary className="cursor-pointer font-medium">New version</summary>
        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-awc-bg/80 p-2 text-[12px] dark:bg-black/20">
          {sanitizeSkillTextForDisplay(question.proposedBody)}
        </pre>
      </details>
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
          Keep the old one
        </button>
        <button
          type="button"
          disabled={busy}
          className={OW_SECONDARY_BUTTON_CLASS}
          onClick={() => onAnswer("both")}
        >
          Run both and compare
        </button>
      </div>
    </article>
  );
}
