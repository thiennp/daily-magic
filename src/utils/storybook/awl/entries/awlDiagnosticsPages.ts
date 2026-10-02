import { buildAgentWitchLocalErrorLogPageBody } from "@agent-witch/live-diagnostics/presentation";

import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import { withAwlStorybookShell } from "@/utils/storybook/awl/withAwlStorybookShell";

export const AWL_DIAGNOSTICS_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] = [
  withAwlStorybookShell({
    id: "knowledge",
    title: "Knowledge",
    path: "/knowledge",
    activePath: "/knowledge",
    statuses: ["ready", "empty"],
    buildBody: (status) =>
      status === "empty"
        ? `<section class="card stack"><h1>Knowledge</h1><p class="empty">No chunks indexed yet.</p></section>`
        : `<section class="card stack"><h1>Knowledge</h1><p>12 chunks indexed (fixture).</p></section>`,
  }),
  withAwlStorybookShell({
    id: "history",
    title: "History",
    path: "/history",
    activePath: "/history",
    statuses: ["ready", "empty"],
    buildBody: (status) =>
      status === "empty"
        ? `<section class="card"><h1>Estimate history</h1><p class="empty">No runs recorded yet.</p></section>`
        : `<section class="card"><h1>Estimate history</h1><div class="table-wrap"><table><thead><tr><th>Task</th><th>Writer</th><th>Estimate</th><th>Actual</th></tr></thead><tbody><tr><td>Storybook fixture</td><td>Cursor</td><td>2m</td><td>1m 48s</td></tr></tbody></table></div></section>`,
  }),
  withAwlStorybookShell({
    id: "errors",
    title: "Errors",
    path: "/errors",
    activePath: "/errors",
    statuses: ["ready", "empty", "error"],
    buildBody: (status) =>
      buildAgentWitchLocalErrorLogPageBody({
        errorLogPath:
          "/Users/storybook/.agent-witch/logs/agent-witch.error.log",
        content:
          status === "empty"
            ? ""
            : "2026-10-01T12:00:00.000Z story fixture stack trace",
        exists: status !== "empty",
        truncated: false,
        byteSize: status === "empty" ? 0 : 48,
        cleared: status === "error",
      }),
  }),
  withAwlStorybookShell({
    id: "traffic",
    title: "Traffic",
    path: "/traffic",
    activePath: "/traffic",
    statuses: ["ready", "empty"],
    buildBody: (status) =>
      status === "empty"
        ? `<section class="card"><h1>WS traffic log</h1><p class="empty">No traffic yet.</p></section>`
        : `<section class="card"><h1>WS traffic log</h1><div class="table-wrap"><table><thead><tr><th>At</th><th>Type</th></tr></thead><tbody><tr><td>just now</td><td><code>heartbeat</code></td></tr></tbody></table></div></section>`,
  }),
];
