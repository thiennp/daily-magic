"use client";

import { useMemo, useState } from "react";

import {
  buildProjectTaskPeopleOptions,
  filterProjectTaskRecordsByPeople,
} from "@/features/projects/tasks/utils/projectTaskPeopleFilter";
import { useProjectTaskSeats } from "@/features/projects/tasks/useProjectTaskSeats";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** Creator / Assignee filters for the board and list (client-side, meta only). */
export const useProjectTaskPeopleFilter = (
  projectId: string,
  records: readonly ProjectTaskRecord[],
) => {
  const seats = useProjectTaskSeats(projectId);
  const [creatorId, setCreatorId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const options = useMemo(
    () => buildProjectTaskPeopleOptions(records, seats ?? []),
    [records, seats],
  );
  const filtered = useMemo(
    () => filterProjectTaskRecordsByPeople(records, { creatorId, assigneeId }),
    [records, creatorId, assigneeId],
  );
  return {
    creatorId,
    setCreatorId,
    assigneeId,
    setAssigneeId,
    options,
    filtered,
  };
};
