import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => rows,
}));

import { guardProjectKeyAckMessage } from "@/lib/agentAccess/guardProjectKeyAckMessage";

const ask = (messageId: unknown) =>
  guardProjectKeyAckMessage({
    name: "ack_project_message",
    args: { messageId },
    keyProjectId: "A",
  });

describe("guardProjectKeyAckMessage", () => {
  beforeEach(() => sqlMock.mockReset());

  it("lets a project key ack a message of its own project", async () => {
    sqlMock.mockResolvedValue([{ project_id: "A" }]);
    expect(await ask("m1")).toBeNull();
  });

  it("forbids acking a message of another project", async () => {
    sqlMock.mockResolvedValue([{ project_id: "B" }]);
    const result = await ask("m1");
    expect(result?.isError).toBe(true);
    expect(result?.text).toContain("forbidden");
  });

  it("leaves unknown or missing ids to the normal ack path", async () => {
    sqlMock.mockResolvedValue([]);
    expect(await ask("gone")).toBeNull();
    expect(await ask(undefined)).toBeNull();
  });
});
