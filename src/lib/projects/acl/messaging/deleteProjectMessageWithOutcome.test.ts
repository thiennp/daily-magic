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

import {
  DELETE_ON_READ_EXPECTED_OUTCOME,
  DELETE_ON_READ_MESSAGE_ROW,
} from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome.fixtures";
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
        return [DELETE_ON_READ_MESSAGE_ROW];
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
    expect(outcomes).toEqual([DELETE_ON_READ_EXPECTED_OUTCOME]);

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
