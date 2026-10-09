"use client";

import AwcProjectTasksChatSettings from "@/features/projects/tasks/AwcProjectTasksChatSettings";
import useProjectTasksChatVisibility from "@/features/projects/tasks/useProjectTasksChatVisibility";
import { writeProjectTasksChatVisibility } from "@/features/projects/tasks/projectTasksChatVisibility";
import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import { PROJECT_PAGE_TASKS_COPY as C } from "@/features/projects/tasks/projectPageTasksCopy.constant";
import { PROJECT_PANEL_CARD_CLASS as CARD } from "@/features/projects/projectPanelCardClasses.constant";

/** Screen E inset on project Settings — default keeps chat uncluttered. */
export default function AwcProjectSettingsTasksChatRow({
  projectId,
}: {
  readonly projectId: string;
}) {
  const value = useProjectTasksChatVisibility(projectId);
  const onChange = (v: ProjectTasksChatVisibility): void => {
    writeProjectTasksChatVisibility(projectId, v);
  };
  return (
    <section
      className={`flex flex-col gap-3 ${CARD}`}
      aria-labelledby="p-set-tasks-chat-h"
    >
      <h3
        id="p-set-tasks-chat-h"
        className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
      >
        {C.chatSettingTitle}
      </h3>
      <AwcProjectTasksChatSettings value={value} onChange={onChange} />
    </section>
  );
}
