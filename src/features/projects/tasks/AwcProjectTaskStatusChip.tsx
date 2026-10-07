import type { ProjectTaskDisplayStatus } from "@/features/projects/tasks/projectTaskDisplayStatus";
import {
  PROJECT_TASK_TONE_CLASS,
  projectTaskStatusChip,
} from "@/features/projects/tasks/projectTaskStatusTone";

export default function AwcProjectTaskStatusChip({
  status,
}: {
  readonly status: ProjectTaskDisplayStatus;
}) {
  const chip = projectTaskStatusChip(status);
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${PROJECT_TASK_TONE_CLASS[chip.tone]}`}
    >
      {chip.label}
    </span>
  );
}
