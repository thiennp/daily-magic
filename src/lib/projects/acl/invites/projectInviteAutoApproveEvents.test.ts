import { beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectInvite } from "@/lib/projects/acl/invites/createProjectInvite";
import { listProjectInviteAutoApproveEvents } from "@/lib/projects/acl/invites/listProjectInviteAutoApproveEvents";
import { updateProjectInviteAutoApprove } from "@/lib/projects/acl/invites/updateProjectInviteAutoApprove";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { listProjectPeersBaseProject } from "@/lib/projects/acl/messaging/listProjectPeers.fixtures";

const sqlMock = vi.fn();
const stored: Record<string, unknown>[] = [];

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => listProjectPeersBaseProject),
}));
vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

const inviteRow = (overrides: Record<string, unknown> = {}) => ({
  id: "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  token_hash: "hash",
  team_label: null,
  scopes: ["acl:self"],
  max_uses: 1,
  uses_remaining: 1,
  expires_at: "2026-10-09T00:00:00.000Z",
  revoked_at: null,
  created_at: "2026-10-06T00:00:00.000Z",
  auto_approve: false,
  ...overrides,
});

describe("project invite auto-approve durable events", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    stored.length = 0;
    resetProjectAclSchemaEnsureForTests();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE") || q.includes("CREATE INDEX") || q.includes("ALTER TABLE")) {
        return [];
      }
      if (q.includes("INSERT INTO project_invites")) {
        const row = inviteRow({
          auto_approve: values[9] === true,
          id: String(values[0]),
        });
        return [row];
      }
      if (
        q.includes("UPDATE project_invites") &&
        q.includes("auto_approve IS DISTINCT FROM")
      ) {
        const next = values[0] === true;
        const id = String(values[1]);
        const projectId = String(values[2]);
        // Simulate prior auto_approve=false unless we find a stored toggle state
        const priorIdx = stored.findIndex(
          (e) => e._kind === "invite_state" && e.id === id,
        );
        const prior =
          priorIdx >= 0
            ? (stored[priorIdx] as { auto_approve?: boolean })
            : undefined;
        const prev = prior?.auto_approve === true;
        if (prev === next) {
          return [];
        }
        const row = inviteRow({ id, project_id: projectId, auto_approve: next });
        const state = { _kind: "invite_state", id, auto_approve: next };
        if (priorIdx >= 0) {
          stored[priorIdx] = state;
        } else {
          stored.push(state);
        }
        return [row];
      }
      if (q.includes("SELECT * FROM project_invites") && q.includes("WHERE id =")) {
        const id = String(values[0]);
        const prior = stored.find(
          (e) => e._kind === "invite_state" && e.id === id,
        ) as { auto_approve?: boolean } | undefined;
        return [
          inviteRow({
            id,
            project_id: String(values[1]),
            auto_approve: prior?.auto_approve === true,
          }),
        ];
      }
      if (q.includes("INSERT INTO project_invite_auto_approve_events")) {
        stored.push({
          _kind: "event",
          id: String(values[0]),
          project_id: String(values[1]),
          invite_id: String(values[2]),
          invite_label: String(values[3]),
          event: String(values[4]),
          actor_user_id: values[5] ?? null,
          membership_id: values[6] ?? null,
          member_display_name: values[7] ?? null,
          created_at: new Date().toISOString(),
        });
        return [];
      }
      if (q.includes("FROM project_invite_auto_approve_events")) {
        // Newest-first (push order is chronological).
        return stored
          .filter((e) => e._kind === "event" && e.project_id === values[0])
          .reverse();
      }
      return [];
    });
  });

  it("create with autoApprove on writes enabled", async () => {
    const created = await createProjectInvite({
      projectId: "proj-1",
      ownerUserId: "owner-1",
      autoApprove: true,
    });
    expect(created.ok).toBe(true);
    if (!created.ok) return;
    const events = await listProjectInviteAutoApproveEvents("proj-1");
    expect(events.map((e) => e.event)).toEqual(["enabled"]);
    expect(events[0]?.inviteId).toBe(created.invite.id);
    expect(events[0]?.inviteLabel).toBe(created.invite.id.slice(0, 8));
    expect(events[0]?.actorUserId).toBe("owner-1");
  });

  it("toggle on then off writes 2 rows; same value writes nothing", async () => {
    stored.push({
      _kind: "invite_state",
      id: "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee",
      auto_approve: false,
    });
    const on = await updateProjectInviteAutoApprove({
      projectId: "proj-1",
      inviteId: "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee",
      ownerUserId: "owner-1",
      autoApprove: true,
    });
    expect(on.ok).toBe(true);
    const again = await updateProjectInviteAutoApprove({
      projectId: "proj-1",
      inviteId: "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee",
      ownerUserId: "owner-1",
      autoApprove: true,
    });
    expect(again.ok).toBe(true);
    const off = await updateProjectInviteAutoApprove({
      projectId: "proj-1",
      inviteId: "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee",
      ownerUserId: "owner-1",
      autoApprove: false,
    });
    expect(off.ok).toBe(true);
    const events = await listProjectInviteAutoApproveEvents("proj-1");
    expect(events.map((e) => e.event)).toEqual(["disabled", "enabled"]);
  });
});
