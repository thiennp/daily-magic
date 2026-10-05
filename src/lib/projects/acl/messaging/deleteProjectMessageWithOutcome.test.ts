import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const outcomes: unknown[] = [];

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/acl/messaging/isComputerAckSatisfiedForCloudDelete", () => ({
  isComputerAckSatisfiedForCloudDelete: vi.fn(async () => true),
}));

import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";
import { readProjectGrokWakeResult } from "@/lib/projects/acl/messaging/readProjectGrokWakeResult";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

describe("deleteProjectMessageWithOutcome + owner wake result", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    outcomes.length = 0;
    resetProjectAclSchemaEnsureForTests();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
  });

  it("writes outcome then deletes; owner wake-result still works from outcome", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
      if (q.includes("DELETE FROM project_messages") && q.includes("make_interval")) {
        return [];
      }
      if (q.includes("FROM project_messages m") && q.includes("grok_wake_result")) {
        return [
          {
            id: "msg-1",
            project_id: "proj-1",
            to_user_id: "bot-1",
            to_membership_id: "mem-1",
            created_at: "2026-10-05T07:00:00.000Z",
            read_at: "2026-10-05T08:00:00.000Z",
            grok_wake_result: "http_200",
          },
        ];
      }
      if (q.includes("FROM project_message_deliveries")) {
        return [{ b2b_state: "done" }];
      }
      if (q.includes("INSERT INTO project_message_outcomes")) {
        outcomes.push({
          message_id: values[0],
          project_id: values[1],
          recipient_user_id: values[2],
          recipient_membership_id: values[3],
          final_b2b_state: values[4],
          grok_wake_result: values[5],
          deleted_reason: values[6],
        });
        return [];
      }
      if (q.includes("DELETE FROM project_messages") && !q.includes("make_interval")) {
        return [];
      }
      // After delete: live wake join finds nothing
      if (q.includes("project_grok_routine_wake_attempts") && q.includes("INNER JOIN")) {
        return [];
      }
      if (q.includes("FROM project_message_outcomes")) {
        const row = outcomes[0] as Record<string, unknown> | undefined;
        if (row === undefined) return [];
        return [
          {
            message_id: row.message_id,
            membership_id: row.recipient_membership_id,
            result: row.grok_wake_result,
          },
        ];
      }
      return [];
    });

    const deleted = await deleteProjectMessageWithOutcome({
      messageId: "msg-1",
      deletedReason: "delete_on_read",
    });
    expect(deleted).toEqual({ ok: true, messageId: "msg-1" });
    expect(outcomes).toEqual([
      {
        message_id: "msg-1",
        project_id: "proj-1",
        recipient_user_id: "bot-1",
        recipient_membership_id: "mem-1",
        final_b2b_state: "done",
        grok_wake_result: "http_200",
        deleted_reason: "delete_on_read",
      },
    ]);

    const wake = await readProjectGrokWakeResult({
      projectId: "proj-1",
      messageId: "msg-1",
      actorUserId: "owner-1",
    });
    expect(wake).toEqual({
      ok: true,
      messageId: "msg-1",
      membershipId: "mem-1",
      result: "http_200",
    });
  });
});
