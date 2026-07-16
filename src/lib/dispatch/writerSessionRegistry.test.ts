import { afterEach, describe, expect, it } from "vitest";

import {
  authorizeWriterSessionPublisher,
  clearWriterSessionsForTests,
  createWriterSession,
} from "@/lib/dispatch/writerSessionRegistry";

describe("writerSessionRegistry", () => {
  afterEach(() => {
    clearWriterSessionsForTests();
  });

  it("authorizes only the executor device for a writer session", () => {
    const session = createWriterSession({
      ownerUserId: "owner-1",
      executorUserId: "executor-1",
      deviceId: "device-1",
      writerAgent: "cursor",
      dashboardClientId: "dash-1",
    });

    expect(
      authorizeWriterSessionPublisher(
        {
          id: "agent-1",
          role: "agent",
          userId: "executor-1",
          deviceId: "device-1",
          send: () => undefined,
        },
        session.writerSessionId,
      )?.writerSessionId,
    ).toBe(session.writerSessionId);

    expect(
      authorizeWriterSessionPublisher(
        {
          id: "agent-2",
          role: "agent",
          userId: "intruder-1",
          deviceId: "device-1",
          send: () => undefined,
        },
        session.writerSessionId,
      ),
    ).toBeUndefined();
  });

  it("authorizes the executor when the session has a device but the agent omits deviceId", () => {
    const session = createWriterSession({
      ownerUserId: "owner-1",
      executorUserId: "executor-1",
      deviceId: "device-1",
      writerAgent: "claude-cli",
      dashboardClientId: "dash-1",
    });

    expect(
      authorizeWriterSessionPublisher(
        {
          id: "agent-1",
          role: "agent",
          userId: "executor-1",
          send: () => undefined,
        },
        session.writerSessionId,
      )?.writerSessionId,
    ).toBe(session.writerSessionId);
  });

  it("rejects a different device when both session and agent specify deviceId", () => {
    const session = createWriterSession({
      ownerUserId: "owner-1",
      executorUserId: "executor-1",
      deviceId: "device-1",
      writerAgent: "claude-cli",
      dashboardClientId: "dash-1",
    });

    expect(
      authorizeWriterSessionPublisher(
        {
          id: "agent-1",
          role: "agent",
          userId: "executor-1",
          deviceId: "device-2",
          send: () => undefined,
        },
        session.writerSessionId,
      ),
    ).toBeUndefined();
  });
});
