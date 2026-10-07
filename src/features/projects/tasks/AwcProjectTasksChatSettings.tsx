"use client";

import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import { PANEL_HEADING_CLASS } from "@/features/projects/projectPagePanelChrome.constant";

const OPTIONS: readonly {
  readonly value: ProjectTasksChatVisibility;
  readonly label: string;
}[] = [
  { value: "show_in_chat", label: C.showInChat },
  { value: "tasks_tab_only", label: C.tasksTabOnly },
  { value: "compact_chips", label: C.compactChips },
];

/** Screen E — chat stays clean; default lean Tasks tab only. */
export default function AwcProjectTasksChatSettings({
  value,
  onChange,
}: {
  readonly value: ProjectTasksChatVisibility;
  readonly onChange: (v: ProjectTasksChatVisibility) => void;
}) {
  return (
    <fieldset className="rounded-xl border border-awc-border bg-awc-surface-2 px-3 py-2.5 dark:border-gray-700 dark:bg-white/[0.03]">
      <legend className={`${PANEL_HEADING_CLASS} px-1 text-[13px]`}>
        {C.chatSettingTitle}
      </legend>
      <div className="mt-1 flex flex-col gap-1.5">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 text-[13px] text-awc-fg dark:text-gray-200"
          >
            <input
              type="radio"
              name="awc-tasks-chat-vis"
              checked={value === opt.value}
              onChange={() => {
                onChange(opt.value);
              }}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
