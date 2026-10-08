"use client";

import type {
  AutoSkillAnswer,
  AutoSkillSuggestion,
} from "@/features/project-auto-skills/public-api/types";
import {
  OW_CARD_NEEDS_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";

interface AwcAutoSkillQuestionCardProps {
  readonly suggestion: AutoSkillSuggestion;
  readonly busy: boolean;
  readonly onAnswer: (answer: AutoSkillAnswer) => void;
  /** Home lists questions across projects: shows the project name. */
  readonly projectName?: string;
}

/**
 * "Save as skill?" owner question. The single card used by the Library
 * strip, Home attention, and the One window feed (approval-style).
 */
export default function AwcAutoSkillQuestionCard({
  suggestion,
  busy,
  onAnswer,
  projectName,
}: AwcAutoSkillQuestionCardProps) {
  return (
    <article
      className={OW_CARD_NEEDS_CLASS}
      aria-label={`Save as skill? ${suggestion.title}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[12.5px]">
        <span className="font-semibold uppercase tracking-wide text-awc-fg-subtle">
          Skill question
        </span>
        {projectName !== undefined ? (
          <span className="text-awc-fg-subtle">{projectName}</span>
        ) : null}
      </div>
      <h3 className="m-0 text-[15px] font-semibold text-awc-fg">
        Save as skill?
      </h3>
      <p className="mt-1 text-[13px] text-awc-fg-muted">
        {suggestion.moduleLabel !== null && suggestion.distinctPrompts !== null
          ? `This step appeared ${suggestion.occurrences} times in ${suggestion.distinctPrompts} ${suggestion.distinctPrompts === 1 ? "prompt" : "prompts"}.`
          : `You ran this kind of task ${suggestion.occurrences} times.`}
      </p>
      {suggestion.moduleLabel !== null ? (
        <p className="mt-1 text-[13px] font-medium text-awc-fg">
          {suggestion.moduleLabel}
        </p>
      ) : null}
      <p className="mt-1 line-clamp-3 text-[13px] text-awc-fg">
        {suggestion.prompt}
      </p>
      <details className="mt-2 text-[13px] text-awc-fg">
        <summary className="cursor-pointer font-medium">
          Draft skill: {suggestion.draftName}
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-awc-bg/80 p-2 text-[12px] dark:bg-black/20">
          {suggestion.draftBody}
        </pre>
      </details>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={busy}
          className={OW_PRIMARY_BUTTON_CLASS}
          onClick={() => onAnswer("save")}
        >
          Save as skill
        </button>
        <button
          type="button"
          disabled={busy}
          className={OW_SECONDARY_BUTTON_CLASS}
          onClick={() => onAnswer("not_now")}
        >
          Not now
        </button>
        <button
          type="button"
          disabled={busy}
          className={OW_SECONDARY_BUTTON_CLASS}
          onClick={() => onAnswer("never")}
        >
          Never for this task
        </button>
      </div>
    </article>
  );
}
