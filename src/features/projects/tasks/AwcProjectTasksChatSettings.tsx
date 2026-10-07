"use client";

import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import { PANEL_HEADING_CLASS } from "@/features/projects/projectPagePanelChrome.constant";

const OPTIONS: readonly {
  readonly value: ProjectTasksChatVisibility;
  readonly label: string;
  readonly hint?: string;
}[] = [
  { value: "show_in_chat", label: C.showInChat },
  {
    value: "tasks_tab_only",
    label: C.tasksTabOnly,
    hint: C.chatSettingHint,
  },
  {
    value: "compact_chips",
    label: C.compactChips,
    hint: C.compactHint,
  },
];

/**
 * Screen E — chat stays clean by default (tasks_tab_only).
 * Prefer Open in Tasks over long in-chat rows.
 */
export default function AwcProjectTasksChatSettings({
  value,
  onChange,
}: {
  readonly value: ProjectTasksChatVisibility;
  readonly onChange: (v: ProjectTasksChatVisibility) => void;
}) {
  return (
    <fieldset
      className="rounded-xl border border-awc-border bg-awc-surface-2 px-3 py-2.5 dark:border-gray-700 dark:bg-white/[0.03]"
      aria-label={C.chatSettingTitle}
    >
      <legend className={`${PANEL_HEADING_CLASS} px-1 text-[13px]`}>
        {C.chatSettingTitle}
      </legend>
      <p className="mt-0.5 text-[12px] text-awc-fg-muted dark:text-gray-400">
        {C.chatSettingHint}
      </p>
      <div className="mt-2 flex flex-col gap-1.5" role="radiogroup">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-start gap-2 text-[13px] text-awc-fg dark:text-gray-200"
          >
            <input
              type="radio"
              name="awc-tasks-chat-vis"
              className="mt-0.5"
              checked={value === opt.value}
              onChange={() => {
                onChange(opt.value);
              }}
            />
            <span>
              <span className="font-medium">{opt.label}</span>
              {opt.hint !== undefined && opt.value !== "tasks_tab_only" ? (
                <span className="mt-0.5 block text-[12px] font-normal text-awc-fg-muted">
                  {opt.hint}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
