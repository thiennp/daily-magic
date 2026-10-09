"use client";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import useAwcProjectDevicePresentation from "@/features/projects/hooks/useAwcProjectDevicePresentation";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";
import countImportantProjectPitfalls from "@/features/projects/pitfalls/countImportantProjectPitfalls";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import useAwcProjectTasks from "@/features/projects/tasks/useAwcProjectTasks";
import { countOpenProjectTasks } from "@/features/projects/tasks/utils/groupProjectTasks";
import { projectHasOwnerComputer } from "@/features/projects/utils/projectHasOwnerComputer";
import resolveProjectHeaderStatus from "@/features/projects/utils/resolveProjectHeaderStatus";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Project page data: computer presentation, header status, threads, safety rules. */
const useAwcProjectDetailPanelData = (project: UserProjectRecord) => {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const device = useAwcProjectDevicePresentation({
    project,
    devices,
    displayNameById,
    localTokenHash,
  });
  const headerStatus = resolveProjectHeaderStatus(device);
  const messengerThreads = useAwcProjectMessengerThreads(project.id);
  const pitfalls = useAwcProjectPitfalls(project.id);
  const rulesImportantCount =
    pitfalls.status === "ready"
      ? countImportantProjectPitfalls(pitfalls.items)
      : 0;
  const tasks = useAwcProjectTasks(project.id, {
    hasOwnerComputer: projectHasOwnerComputer(project),
  });
  const openTasksCount = countOpenProjectTasks(tasks.allTasks);
  return {
    deviceDisplayName: device.deviceDisplayName,
    editCta: device.editCta,
    headerStatus,
    messengerThreads,
    pitfalls,
    rulesImportantCount,
    openTasksCount,
  };
};

export default useAwcProjectDetailPanelData;
