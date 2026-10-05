import { beforeEach, describe, expect, it, vi } from "vitest";

type Row = Record<string, unknown>;
const insertMock = vi.fn();
const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);

import { insertProjectProcessingReceipt } from "@/lib/projects/acl/messaging/insertProjectProcessingReceipt";

const members: Row[] = [
  { id: "mem-a", user_id: "user-a", project_display_name: "Sender Bot", role: "member" },
  { id: "mem-v", user_id: "user-v", project_display_name: null, role: "viewer" },
  { id: "mem-h", user_id: "user-h", project_display_name: "Alex", role: "member" },
];

const receipt = (peer: string) =>
  insertProjectProcessingReceipt({
    projectId: "proj-1",
    peer,
    sender: "mem-a",
    originalMessageId: `msg-${peer}`,
  });

describe("insertProjectProcessingReceipt for human seats", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    insertMock.mockReset();
    sqlMock.mockImplementation(
      async (strings: readonly string[], ...values: unknown[]) => {
        await Promise.resolve();
        if (strings.join("?").includes("FROM project_messages")) return [];
        const ids = values[1] as readonly string[];
        return members.filter((row) => ids.includes(String(row.id)));
      },
    );
    insertMock.mockResolvedValue({ messageId: "receipt-1", wakeResults: [] });
  });

  it("never posts a processing receipt as a viewer (wake path stays read-only)", async () => {
    await receipt("mem-v");
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("still posts for a member seat", async () => {
    await receipt("mem-h");
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock.mock.calls[0]?.[0]).toMatchObject({
      senderMembershipId: "mem-h",
      toMembershipId: "mem-a",
    });
  });

  it("reads role with the membership rows", async () => {
    await receipt("mem-h");
    const query = sqlMock.mock.calls
      .map((call) => (call[0] as readonly string[]).join("?"))
      .find((text) => text.includes("FROM project_memberships"));
    expect(query).toContain("role");
  });
});
