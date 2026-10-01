import { buildAgentWitchLocalWriterSessionsPageBody } from "@agent-witch/live-memory/presentation";
import {
  buildAgentWitchLocalHeartbeatElapsedMarkup,
  buildAgentWitchReviveAwlStatusSection,
} from "@agent-witch/live-status-health/presentation";
import { buildAgentWitchLocalWriterApiPageBody } from "@agent-witch/live-writer-settings/presentation";

import { AWL_STORYBOOK_NOW } from "@/utils/storybook/awl/awlStorybookShared.constant";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import { withAwlStorybookShell } from "@/utils/storybook/awl/withAwlStorybookShell";

export const AWL_STATUS_WRITER_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] =
  [
    withAwlStorybookShell({
      id: "status",
      title: "Status",
      path: "/status",
      activePath: "/status",
      statuses: ["ready", "empty", "error"],
      buildBody: (status) => {
        const heartbeat =
          status === "empty"
            ? buildAgentWitchLocalHeartbeatElapsedMarkup(null)
            : buildAgentWitchLocalHeartbeatElapsedMarkup(AWL_STORYBOOK_NOW);
        const lede =
          status === "empty"
            ? "No heartbeat yet — empty connection state in this Storybook preview."
            : status === "error"
              ? "Bridge stale in story fixture."
              : "Bridge healthy in story fixture.";
        return `<section class="card">
        <p class="eyebrow">Connection</p>
        <h1>Status</h1>
        <p class="lede">${lede}</p>
        ${heartbeat}
      </section>${buildAgentWitchReviveAwlStatusSection({ installDir: "/Users/storybook/.agent-witch" })}`;
      },
    }),
    withAwlStorybookShell({
      id: "writer-api",
      title: "Writer API",
      path: "/writer-api",
      activePath: "/writer-api",
      statuses: ["ready", "error"],
      buildBody: (status) =>
        buildAgentWitchLocalWriterApiPageBody({
          writerExecutionBackend: "cli",
          secrets: {},
          flashMessage: status === "ready" ? "Settings saved (fixture)." : null,
        }),
    }),
    withAwlStorybookShell({
      id: "writer-sessions",
      title: "Transcripts",
      path: "/writer-sessions",
      activePath: "/writer-sessions",
      statuses: ["ready", "empty"],
      buildBody: (status) =>
        buildAgentWitchLocalWriterSessionsPageBody({
          sessions:
            status === "empty"
              ? []
              : [
                  {
                    sessionId: "sess-storybook-1",
                    writerAgent: "cursor",
                    projectFolderPath: "/Users/storybook/code/daily-magic",
                    turns: [
                      {
                        id: "turn-1",
                        userPrompt: "Hello from Storybook",
                        assistantOutput: "Fixture transcript output.",
                        createdAt: AWL_STORYBOOK_NOW,
                      },
                    ],
                    createdAt: AWL_STORYBOOK_NOW,
                    updatedAt: AWL_STORYBOOK_NOW,
                  },
                ],
        }),
    }),
  ];
