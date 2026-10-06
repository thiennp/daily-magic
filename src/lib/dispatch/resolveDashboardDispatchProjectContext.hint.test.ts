import { describe, expect, it, vi } from "vitest";

import { PROJECT_REQUIRED_DISPATCH_HINT } from "@/lib/dispatch/projectRequiredDispatchHint.constant";
import { readDispatchErrorMessageWithHint } from "@/lib/dispatch/readDispatchErrorMessageWithHint";
import { resolveDashboardDispatchProjectContext } from "@/lib/dispatch/resolveDashboardDispatchProjectContext";

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: vi.fn(),
}));

describe("resolveDashboardDispatchProjectContext project_required", () => {
  it("keeps project_required (400) and adds a fix hint", async () => {
    const result = await resolveDashboardDispatchProjectContext({
      body: { prompt: "run" },
      requesterUserId: "u1",
      targetDeviceId: "mac-1",
      requestId: "req-1",
    });

    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.status).toBe(400);
    expect(result.code).toBe("project_required");
    expect(result.message.payload).toMatchObject({
      errorMessage: "project_id is required.",
      errorCode: "project_required",
      httpStatus: 400,
      hint: PROJECT_REQUIRED_DISPATCH_HINT,
    });
    expect(readDispatchErrorMessageWithHint(result.message, "x")).toBe(
      `project_id is required. ${PROJECT_REQUIRED_DISPATCH_HINT}`,
    );
  });
});
