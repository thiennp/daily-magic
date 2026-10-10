import { describe, expect, it } from "vitest";

import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/public-api/types";

const event = (
  type: ProjectActivityLogEvent["type"],
): ProjectActivityLogEvent => ({
  id: "e1",
  type,
  category: "access",
  at: "2026-10-06T11:00:00.000Z",
  actor: { kind: "owner", userId: "u1", displayName: null },
  target: null,
  detail: {},
});

describe("formatAccessLogEvent runs without approval (S0-2)", () => {
  it("renders ON and OFF as owner lines", () => {
    expect(
      formatAccessLogEvent(event("project.runs_without_approval_enabled")),
    ).toEqual({ line: C.runsWithoutApprovalOn, detail: null });
    expect(
      formatAccessLogEvent(event("project.runs_without_approval_disabled")),
    ).toEqual({ line: C.runsWithoutApprovalOff, detail: null });
  });
});
