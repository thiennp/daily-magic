import { describe, expect, it } from "vitest";

import {
  buildProjectGrokRoutineWakeBody,
  PROJECT_GROK_ROUTINE_WAKE_EVENT,
} from "@/lib/projects/acl/webhooks/buildProjectGrokRoutineWakeBody";

describe("buildProjectGrokRoutineWakeBody", () => {
  it("whitelists only this project + triggering message fields", () => {
    const parsed = JSON.parse(
      buildProjectGrokRoutineWakeBody({
        projectId: "proj-1",
        projectName: "Daily Magic",
        messageId: "msg-1",
        summary: "hello from this project",
        fromMembershipId: "mem-s",
        fromProjectDisplayName: "Probe",
      }),
    );
    expect(parsed).toEqual({
      projectId: "proj-1",
      projectName: "Daily Magic",
      messageId: "msg-1",
      event: PROJECT_GROK_ROUTINE_WAKE_EVENT,
      body: "hello from this project",
      summary: "hello from this project",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Probe",
    });
    expect(Object.keys(parsed).sort()).toEqual(
      [
        "body",
        "event",
        "fromMembershipId",
        "fromProjectDisplayName",
        "messageId",
        "projectId",
        "projectName",
        "summary",
      ].sort(),
    );
  });

  it("allows null projectName without injecting other-project fields", () => {
    const raw = buildProjectGrokRoutineWakeBody({
      projectId: "proj-2",
      projectName: null,
      messageId: "msg-2",
      summary: "ping",
      fromMembershipId: null,
      fromProjectDisplayName: null,
    });
    expect(raw).not.toMatch(/status|tips|EN-PASS|briefing/i);
    expect(JSON.parse(raw).projectName).toBeNull();
  });
});
