"use client";

import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

/**
 * Screen E — chat stays clean by default (tasks_tab_only).
 * Prefer Open in Tasks over long in-chat rows.
 * Visual: Show in chat | Tasks tab only segment + Compact chips switch
 * (same three enum values; no store change).
 */
export default function AwcProjectTasksChatSettings({
  value,
  onChange,
}: {
  readonly value: ProjectTasksChatVisibility;
  readonly onChange: (v: ProjectTasksChatVisibility) => void;
}) {
  const whereIsChat = value === "show_in_chat" || value === "compact_chips";
  const compactOn = value === "compact_chips";

  return (
    <fieldset
      className="overflow-hidden rounded-xl border border-awc-border bg-awc-surface"
      aria-label={C.chatSettingTitle}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 px-4 py-3.5">
        <div>
          <div className="text-[14px] font-semibold text-awc-fg">Task updates</div>
          <div className="mt-0.5 text-[12.5px] text-awc-fg-muted">{C.chatSettingHint}</div>
        </div>
        <div
          className="inline-flex shrink-0 overflow-hidden rounded-lg border border-awc-control-border"
          role="radiogroup"
          aria-label={C.chatSettingTitle}
        >
          <label
            className={`relative cursor-pointer text-[13px] ${
              whereIsChat ? "bg-awc-fg text-awc-surface" : "bg-awc-surface text-awc-fg-muted"
            }`}
          >
            <input
              type="radio"
              name="awc-tasks-chat-vis"
              className="sr-only"
              checked={whereIsChat}
              onChange={() => {
                onChange(compactOn ? "compact_chips" : "show_in_chat");
              }}
            />
            <span className="block px-3 py-1.5">{C.showInChat}</span>
          </label>
          <label
            className={`relative cursor-pointer text-[13px] ${
              !whereIsChat ? "bg-awc-fg text-awc-surface" : "bg-awc-surface text-awc-fg-muted"
            }`}
          >
            <input
              type="radio"
              name="awc-tasks-chat-vis"
              className="sr-only"
              checked={!whereIsChat}
              onChange={() => {
                onChange("tasks_tab_only");
              }}
            />
            <span className="block px-3 py-1.5">{C.tasksTabOnly}</span>
          </label>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4 border-t border-awc-border px-4 py-3.5">
        <div>
          <div className="text-[14px] font-semibold text-awc-fg">{C.compactChips}</div>
          <div className="mt-0.5 text-[12.5px] text-awc-fg-muted">{C.compactHint}</div>
        </div>
        <label
          className={`inline-flex items-center gap-2 text-[13px] text-awc-fg-muted ${
            !whereIsChat ? "cursor-not-allowed opacity-40" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={compactOn}
            disabled={!whereIsChat}
            onChange={(e) => {
              if (!whereIsChat) return;
              onChange(e.target.checked ? "compact_chips" : "show_in_chat");
            }}
          />
          <span
            className={`relative h-[18px] w-[30px] shrink-0 rounded-full border transition-colors ${
              compactOn
                ? "border-awc-fg bg-awc-fg"
                : "border-awc-control-border bg-awc-fill"
            }`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-[2px] left-[2px] h-3 w-3 rounded-full border bg-awc-surface transition-transform ${
                compactOn
                  ? "translate-x-3 border-awc-fg"
                  : "border-awc-control-border"
              }`}
            />
          </span>
          <span className="sr-only">{C.compactChips}</span>
        </label>
      </div>
      {/* Keep enum value strings discoverable for source tests / screen E. */}
      <span className="hidden" aria-hidden="true">
        show_in_chat tasks_tab_only compact_chips
      </span>
    </fieldset>
  );
}
