"use client";

import AwcProjectTasksAssignAgentPicker from "@/features/projects/tasks/AwcProjectTasksAssignAgentPicker";
import AwcProjectTasksSkillSuggestions from "@/features/projects/tasks/AwcProjectTasksSkillSuggestions";
import AwcProjectTasksAssignCodingTool from "@/features/projects/tasks/AwcProjectTasksAssignCodingTool";
import { AWC_TASKS_INPUT_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import type { useAwcProjectTasksAssignForm } from "@/features/projects/tasks/useAwcProjectTasksAssignForm";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

type AssignForm = ReturnType<typeof useAwcProjectTasksAssignForm>;

/** Assign dialog: assistant picker + task prompt with counter. */
export default function AwcProjectTasksAssignTaskFields({
  form,
}: {
  readonly form: AssignForm;
}) {
  const { pending, trimmedPrompt } = form;
  const { prompt } = form.fields;
  const { setPrompt } = form.setters;
  return (
    <>
      <AwcProjectTasksAssignAgentPicker form={form} />
      {form.writer.needsToolSelect ? (
        <AwcProjectTasksAssignCodingTool form={form} />
      ) : null}
      <label className="mb-3.5 grid gap-1.5 text-[13px] font-semibold text-awc-fg">
        <span>{C.assignPrompt}</span>
        <textarea
          className={`${AWC_TASKS_INPUT_CLASS} min-h-[5rem] font-normal`}
          value={prompt}
          disabled={pending}
          maxLength={PROJECT_MESSAGE_SUMMARY_MAX_CHARS}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <span className="text-[12px] font-normal text-awc-fg-subtle">
          {C.assignSummaryCounter(trimmedPrompt.length)}
        </span>
      </label>
      <AwcProjectTasksSkillSuggestions
        skills={form.skillSuggestions}
        prompt={prompt}
        disabled={pending}
        onAdd={(line) =>
          setPrompt(`${prompt.trimEnd()}\n\n${line}`.trimStart())
        }
      />
    </>
  );
}
