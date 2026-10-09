import { buildAgentWitchLocalHomePageBody } from "@agent-witch/live-home/presentation";
import { buildAgentWitchLocalTaskPageBody } from "@agent-witch/live-tasks/presentation";

import { AWL_STORYBOOK_NOW } from "@/utils/storybook/awl/awlStorybookShared.constant";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import { withAwlStorybookShell } from "@/utils/storybook/awl/withAwlStorybookShell";

export const AWL_HOME_AND_TASK_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] =
  [
    withAwlStorybookShell({
      id: "home",
      title: "Home",
      path: "/",
      activePath: "/",
      statuses: ["ready", "empty", "error"],
      buildBody: (status) =>
        buildAgentWitchLocalHomePageBody({
          wsConnected: status !== "error",
          lastHeartbeatAt: status === "empty" ? null : AWL_STORYBOOK_NOW,
          installBundleVersion: "200",
          harnessSetCount: status === "empty" ? 0 : 2,
          knowledgeChunkCount: status === "empty" ? 0 : 12,
          trafficEntryCount: status === "empty" ? 0 : 4,
          errorLogByteSize: status === "error" ? 120 : 0,
          errorLogExists: status === "error",
          wakeError:
            status === "error" ? "Bridge offline in story fixture." : null,
        }),
    }),
    withAwlStorybookShell({
      id: "task",
      title: "Task",
      path: "/task",
      activePath: "/task",
      statuses: ["ready", "empty", "error"],
      buildBody: (status) =>
        buildAgentWitchLocalTaskPageBody({
          defaultWorkspace:
            status === "empty" ? "" : "/Users/storybook/code/agentwitch",
          wsConnected: status !== "error",
          flashError:
            status === "error" ? "Task failed in story fixture." : null,
        }),
    }),
  ];
