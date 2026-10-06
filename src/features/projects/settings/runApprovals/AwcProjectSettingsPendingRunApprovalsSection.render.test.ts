import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AwcProjectSettingsPendingRunApprovalsSection from "@/features/projects/settings/runApprovals/AwcProjectSettingsPendingRunApprovalsSection";
import { RUN_APPROVALS_COPY as C } from "@/features/projects/settings/runApprovals/runApprovalsCopy.constant";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

const hookState = vi.hoisted(() => ({
  current: {
    loadState: "ready" as "loading" | "ready" | "error",
    approvals: [] as Array<Record<string, unknown>>,
    busyRunId: null as string | null,
    actionError: null as string | null,
    actionErrorRunId: null as string | null,
    reload: () => undefined,
    respond: async () => undefined,
  },
}));

vi.mock(
  "@/features/projects/settings/runApprovals/useProjectPendingRunApprovals",
  () => ({
    useProjectPendingRunApprovals: () => hookState.current,
  }),
);

const render = (): string =>
  renderToStaticMarkup(
    createElement(AwcProjectSettingsPendingRunApprovalsSection, {
      projectId: "proj-1",
    }),
  ).replaceAll("&#x27;", "'");

describe("AwcProjectSettingsPendingRunApprovalsSection", () => {
  beforeEach(() => {
    hookState.current = {
      loadState: "ready",
      approvals: [],
      busyRunId: null,
      actionError: null,
      actionErrorRunId: null,
      reload: () => undefined,
      respond: async () => undefined,
    };
  });

  it("shows empty state copy", () => {
    const html = render();
    expect(html).toContain(C.heading);
    expect(html).toContain(C.empty);
  });

  it("lists a pending task with Approve and Deny", () => {
    hookState.current.approvals = [
      {
        runId: "run-1",
        projectId: "proj-1",
        requesterUserId: "u1",
        requesterLabel: "Sam",
        prompt: "Fix lint",
        tool: "claude-cli",
        computerName: "Studio Mac",
        projectFolder: "/Users/me/app",
        approvalExpiresAt: null,
        state: "pending",
      },
    ];
    const html = render();
    expect(html).toContain("Sam wants claude-cli to run a task on Studio Mac");
    expect(html).toContain("Folder: /Users/me/app");
    expect(html).toContain("Fix lint");
    expect(html).toContain(AWC_PENDING_APPROVAL_CARD_COPY.approve);
    expect(html).toContain(AWC_PENDING_APPROVAL_CARD_COPY.deny);
  });

  it("shows load error with retry", () => {
    hookState.current.loadState = "error";
    const html = render();
    expect(html).toContain(C.loadError);
    expect(html).toContain(C.retry);
  });
});
