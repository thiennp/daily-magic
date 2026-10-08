"use client";

import AwcBotName from "@/features/projects/bots/AwcBotName";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { useAwcProjectTasksAssignForm } from "@/features/projects/tasks/useAwcProjectTasksAssignForm";

type AssignForm = ReturnType<typeof useAwcProjectTasksAssignForm>;

const ROW = "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left";

/** Radio cards: each bot or coding tool on a computer is its own named agent. */
export default function AwcProjectTasksAssignAgentPicker({
  form,
}: {
  readonly form: AssignForm;
}) {
  const { agentOptions, optionId, setOptionId, peersLoading, pending } = form;
  if (peersLoading || agentOptions.length === 0) {
    return (
      <p className="mb-3.5 text-[13px] text-awc-fg-muted">
        {peersLoading ? C.assignPeersLoading : C.assignPeersEmpty}
      </p>
    );
  }
  return (
    <div className="mb-3.5 grid gap-1.5">
      <span className="text-[13px] font-semibold text-awc-fg">
        {C.assignAssistant}
      </span>
      <div
        role="radiogroup"
        aria-label={C.assignAssistant}
        className="grid gap-2"
      >
        {agentOptions.map((o) => (
          <button
            key={o.optionId}
            type="button"
            role="radio"
            aria-checked={o.optionId === optionId}
            data-agent-option={o.optionId}
            disabled={pending || o.disabled}
            onClick={() => setOptionId(o.optionId)}
            className={`${ROW} ${
              o.optionId === optionId
                ? "border-awc-border-strong bg-awc-surface-2"
                : "border-awc-border bg-awc-surface"
            } ${o.disabled ? "opacity-50" : ""}`}
          >
            <span className="grid min-w-0 flex-1">
              <AwcBotName
                name={o.name}
                kindHint={o.writerAgent}
                className="text-[13px] font-semibold text-awc-fg"
              />
              <span className="truncate text-xs text-awc-fg-muted">
                {o.subtitle}
              </span>
            </span>
            {o.statusLabel !== null ? (
              <span className="text-[11px] text-awc-fg-muted">
                {o.statusLabel}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
