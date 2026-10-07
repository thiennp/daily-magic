import { beforeEach, describe, expect, it, vi } from "vitest";

const wakeMock = vi.fn();
vi.mock("@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks", () => ({
  wakeProjectGrokRoutineWebhooks: (input: unknown) => wakeMock(input),
}));

import { wakeProjectMessageGrokRoutines } from "@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines";

const base = {
  projectId: "proj-1",
  messageId: "msg-1",
  kind: "task.assign",
  summary: "hello",
  recipientMembershipIds: ["mem-a"],
};

describe("wakeProjectMessageGrokRoutines", () => {
  beforeEach(() => {
    wakeMock.mockReset();
  });

  it("passes the sender display name and returns the wake results", async () => {
    wakeMock.mockResolvedValue([{ membershipId: "mem-a", result: "http_200" }]);
    const results = await wakeProjectMessageGrokRoutines({
      ...base,
      senderMembershipId: "mem-s",
      senderProjectDisplayName: "Sender",
    });
    expect(results).toEqual([{ membershipId: "mem-a", result: "http_200" }]);
    expect(wakeMock).toHaveBeenCalledWith({
      projectId: "proj-1",
      messageId: "msg-1",
      summary: "hello",
      fromMembershipId: "mem-s",
      fromProjectDisplayName: "Sender",
      recipientMembershipIds: ["mem-a"],
    });
  });

  it("names the owner when there is no sender membership or name", async () => {
    wakeMock.mockResolvedValue([]);
    await wakeProjectMessageGrokRoutines({ ...base, senderMembershipId: null });
    expect(wakeMock.mock.calls[0]?.[0]).toMatchObject({
      fromMembershipId: null,
      fromProjectDisplayName: "Owner",
    });
  });

  it("names the owner when there is no sender membership and the name is empty", async () => {
    wakeMock.mockResolvedValue([]);
    await wakeProjectMessageGrokRoutines({
      ...base,
      senderMembershipId: null,
      senderProjectDisplayName: "",
    });
    expect(wakeMock.mock.calls[0]?.[0]).toMatchObject({
      fromProjectDisplayName: "Owner",
    });
  });

  it("keeps a given name when there is no sender membership", async () => {
    wakeMock.mockResolvedValue([]);
    await wakeProjectMessageGrokRoutines({
      ...base,
      senderMembershipId: null,
      senderProjectDisplayName: "System",
    });
    expect(wakeMock.mock.calls[0]?.[0]).toMatchObject({
      fromMembershipId: null,
      fromProjectDisplayName: "System",
    });
  });

  it("uses null when a member sender has no display name", async () => {
    wakeMock.mockResolvedValue([]);
    await wakeProjectMessageGrokRoutines({
      ...base,
      senderMembershipId: "mem-s",
    });
    expect(wakeMock.mock.calls[0]?.[0]).toMatchObject({
      fromProjectDisplayName: null,
    });
  });

  it("returns no results when the wake throws", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    wakeMock.mockRejectedValue(new Error("wake_down"));
    const results = await wakeProjectMessageGrokRoutines({
      ...base,
      senderMembershipId: "mem-s",
    });
    expect(results).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      "project grok routine webhook wake failed",
      { messageId: "msg-1", error: "wake_down" },
    );
    errorSpy.mockRestore();
  });
});
