import {
  PROJECT_TASK_STATUS_LABEL,
} from "@/features/projects/tasks/projectPageTasksCopy.constant";
import {
  PROJECT_TASK_TONE_CLASS,
  projectTaskStatusTone,
} from "@/features/projects/tasks/projectTaskStatusTone";
import type { ProjectTaskUiStatus } from "@/features/projects/sync/projectSync.types";

export default function AwcProjectTaskStatusChip({
  status,
}: {
  readonly status: ProjectTaskUiStatus;
}) {
  const tone = projectTaskStatusTone(status);
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${PROJECT_TASK_TONE_CLASS[tone]}`}
    >
      {PROJECT_TASK_STATUS_LABEL[status]}
    </span>
  );
}
