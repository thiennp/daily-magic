import {
  handleInviteAutoApproveEventInsert,
  handleInviteAutoApproveUpdate,
} from "@/lib/projects/acl/invites/projectInviteAutoApproveEvents.handlers";
import { inviteAutoApproveRow } from "@/lib/projects/acl/invites/projectInviteAutoApproveEvents.row";

type Stored = Record<string, unknown>;

type SqlMock = {
  mockImplementation: (fn: (...args: never[]) => unknown) => unknown;
};

/** SQL stub for create/toggle + list durable auto-approve events. */
export const installAutoApproveEventsSqlStub = (input: {
  readonly sqlMock: SqlMock;
  readonly stored: Stored[];
}): void => {
  input.sqlMock.mockImplementation(
    (async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (
        q.includes("CREATE TABLE") ||
        q.includes("CREATE INDEX") ||
        q.includes("ALTER TABLE")
      ) {
        return [];
      }
      if (q.includes("INSERT INTO project_invites")) {
        return [
          inviteAutoApproveRow({
            auto_approve: values[9] === true,
            id: String(values[0]),
          }),
        ];
      }
      if (
        q.includes("UPDATE project_invites") &&
        q.includes("auto_approve IS DISTINCT FROM")
      ) {
        return handleInviteAutoApproveUpdate(input.stored, values);
      }
      if (
        q.includes("SELECT * FROM project_invites") &&
        q.includes("WHERE id =")
      ) {
        const id = String(values[0]);
        const prior = input.stored.find(
          (e) => e._kind === "invite_state" && e.id === id,
        ) as { auto_approve?: boolean } | undefined;
        return [
          inviteAutoApproveRow({
            id,
            project_id: String(values[1]),
            auto_approve: prior?.auto_approve === true,
          }),
        ];
      }
      if (q.includes("INSERT INTO project_invite_auto_approve_events")) {
        return handleInviteAutoApproveEventInsert(input.stored, values);
      }
      if (q.includes("FROM project_invite_auto_approve_events")) {
        return input.stored
          .filter((e) => e._kind === "event" && e.project_id === values[0])
          .reverse();
      }
      return [];
    }) as never,
  );
};
