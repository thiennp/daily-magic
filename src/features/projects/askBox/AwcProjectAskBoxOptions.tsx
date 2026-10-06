"use client";

import AwcProjectAskBoxTaskFields from "@/features/projects/askBox/AwcProjectAskBoxTaskFields";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";
import type { AskBoxDraft } from "@/features/projects/askBox/resolveAskBoxSend";

const CHECK_ROW = "flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100";
const CHECK_INPUT = "h-4 w-4 accent-gray-900 dark:accent-white";

interface AwcProjectAskBoxOptionsProps {
  readonly disabled: boolean;
  readonly draft: AskBoxDraft;
  readonly onUpdate: (patch: Partial<AskBoxDraft>) => void;
  readonly onAssignAsTask: (checked: boolean) => void;
}

/** Collapsible "Send options": Needs a reply (default on) + Assign as a specific task. */
export default function AwcProjectAskBoxOptions({
  disabled,
  draft,
  onUpdate,
  onAssignAsTask,
}: AwcProjectAskBoxOptionsProps) {
  const copy = PROJECT_ASK_BOX_COPY;
  return (
    <details className="group border-t border-gray-200 pt-2 dark:border-white/10">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[13.5px] font-medium text-gray-500 dark:text-gray-400 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="inline-block text-base leading-none transition-transform group-open:rotate-90">
          ›
        </span>
        {copy.sendOptions}
      </summary>
      <div className="mt-2.5 flex flex-col gap-2.5">
        <label className={CHECK_ROW}>
          <input
            type="checkbox"
            className={CHECK_INPUT}
            checked={draft.needsReply}
            disabled={disabled}
            onChange={(event) => {
              onUpdate({ needsReply: event.target.checked });
            }}
          />
          {copy.needsReply}
          <span className="text-gray-500 dark:text-gray-400">{copy.needsReplyHint}</span>
        </label>
        <label className={CHECK_ROW}>
          <input
            type="checkbox"
            className={CHECK_INPUT}
            checked={draft.assignAsTask}
            disabled={disabled}
            onChange={(event) => {
              onAssignAsTask(event.target.checked);
            }}
          />
          {copy.assignAsTask}
          <span className="text-gray-500 dark:text-gray-400">{copy.assignAsTaskHint}</span>
        </label>
        {draft.assignAsTask ? (
          <AwcProjectAskBoxTaskFields
            disabled={disabled}
            kind={draft.kind}
            refs={draft.refs}
            onKind={(kind) => {
              onUpdate({ kind });
            }}
            onRefs={(refs) => {
              onUpdate({ refs });
            }}
          />
        ) : null}
      </div>
    </details>
  );
}
