"use client";

import { AWC_TASKS_INPUT_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { useAwcProjectTasksAssignForm } from "@/features/projects/tasks/useAwcProjectTasksAssignForm";
import { ASSIGN_CODING_TOOL_OPTIONS } from "@/features/projects/tasks/utils/codingToolLabels.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

type AssignForm = ReturnType<typeof useAwcProjectTasksAssignForm>;

/** Assign dialog: which coding tool the computer runs the task with. */
export default function AwcProjectTasksAssignCodingTool({
  form,
}: {
  readonly form: AssignForm;
}) {
  const { writerAgent, setWriterAgent, readyWriters } = form.writer;
  const { pending } = form;
  const known = ASSIGN_CODING_TOOL_OPTIONS.some((o) => o.value === writerAgent);
  return (
    <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
      <span>{C.assignCodingTool}</span>
      <select
        aria-label={C.assignCodingTool}
        className={AWC_TASKS_INPUT_CLASS}
        value={known ? writerAgent : "claude-cli"}
        disabled={pending}
        onChange={(e) => {
          setWriterAgent(e.target.value as HarnessWriterAgent);
        }}
      >
        {ASSIGN_CODING_TOOL_OPTIONS.filter(
          (o) => readyWriters === undefined || readyWriters.includes(o.value),
        ).map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
