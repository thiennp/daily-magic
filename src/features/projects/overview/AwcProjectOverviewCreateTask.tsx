"use client";

import { useState } from "react";

import { OVERVIEW_CTA_PRIMARY_SM_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import AwcProjectTaskCreateDialog from "@/features/projects/tasks/AwcProjectTaskCreateDialog";
import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";

/** Overview "Create task": the Tasks-tab dialog; on success open the Tasks tab. */
export default function AwcProjectOverviewCreateTask({
  projectId,
  onCreated,
}: {
  readonly projectId: string;
  readonly onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={OVERVIEW_CTA_PRIMARY_SM_CLASS}
        onClick={() => setOpen(true)}
      >
        {B.createTask}
      </button>
      {open ? (
        <AwcProjectTaskCreateDialog
          projectId={projectId}
          reload={onCreated}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
