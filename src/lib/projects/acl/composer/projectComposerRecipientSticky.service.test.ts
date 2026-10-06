import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
const actor = vi.hoisted(() => ({
  ok: true as boolean,
  code: "forbidden" as string,
  ownerUserId: "owner-1",
}));
const assistants = vi.hoisted(() => ({
  seats: [
    { membershipId: "mem-a", displayName: "Ada", memberKind: "bot" as const },
    { membershipId: "mem-b", displayName: "Boris", memberKind: "bot" as const },
  ],
}));
const notify = vi.hoisted(() => vi.fn(async () => undefined));

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock(
  "@/lib/projects/acl/composer/resolveComposerRecipientStickyActor",
  () => ({
    resolveComposerRecipientStickyActor: async () =>
      actor.ok
        ? {
            ok: true,
            projectId: "proj-1",
            actorUserId: "owner-1",
            ownerUserId: actor.ownerUserId,
          }
        : { ok: false, code: actor.code },
  }),
);
vi.mock(
  "@/lib/projects/acl/composer/loadActiveComposerRecipientAssistants",
  () => ({
    loadActiveComposerRecipientAssistants: async () => assistants.seats,
  }),
);
vi.mock(
  "@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema",
  () => ({
    ensureProjectComposerRecipientStickySchema: async () => undefined,
  }),
);
vi.mock(
  "@/lib/projects/acl/composer/notifyComposerRecipientStickyCleared",
  () => ({
    notifyComposerRecipientStickyCleared: notify,
  }),
);

import { clearStickyOnMembershipLeave } from "@/lib/projects/acl/composer/clearStickyOnMembershipLeave";
import { deleteProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/deleteProjectComposerRecipientSticky";
import { getProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/getProjectComposerRecipientSticky";
import { putProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/putProjectComposerRecipientSticky";

describe("projectComposerRecipientSticky service", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    notify.mockClear();
    actor.ok = true;
    actor.code = "forbidden";
    assistants.seats = [
      { membershipId: "mem-a", displayName: "Ada", memberKind: "bot" },
      { membershipId: "mem-b", displayName: "Boris", memberKind: "bot" },
    ];
  });

  it("GET returns sticky when membership still active", async () => {
    sqlMock.mockResolvedValueOnce([
      {
        mode: "membership",
        membership_id: "mem-a",
        updated_at: "2026-10-06T00:00:00.000Z",
      },
    ]);
    const result = await getProjectComposerRecipientSticky({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(result).toMatchObject({
      ok: true,
      sticky: { mode: "membership", membershipId: "mem-a" },
      cleared: false,
      singleAssistant: null,
    });
  });

  it("GET auto-clears inactive membership sticky and notifies", async () => {
    sqlMock
      .mockResolvedValueOnce([
        {
          mode: "membership",
          membership_id: "mem-gone",
          updated_at: "2026-10-06T00:00:00.000Z",
        },
      ])
      .mockResolvedValueOnce([{ actor_user_id: "owner-1" }]);
    const result = await getProjectComposerRecipientSticky({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(result).toMatchObject({
      ok: true,
      sticky: null,
      cleared: true,
      clearedReason: "membership_inactive",
    });
    expect(notify).toHaveBeenCalledOnce();
  });

  it("GET exposes singleAssistant and clears leftover sticky", async () => {
    assistants.seats = [
      { membershipId: "mem-only", displayName: "Solo", memberKind: "bot" },
    ];
    sqlMock
      .mockResolvedValueOnce([
        {
          mode: "all",
          membership_id: null,
          updated_at: "2026-10-06T00:00:00.000Z",
        },
      ])
      .mockResolvedValueOnce([{ actor_user_id: "owner-1" }]);
    const result = await getProjectComposerRecipientSticky({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(result).toMatchObject({
      ok: true,
      sticky: null,
      cleared: true,
      clearedReason: "single_assistant",
      singleAssistant: { membershipId: "mem-only", displayName: "Solo" },
    });
  });

  it("PUT all persists; PUT membership rejects inactive; single_assistant blocks", async () => {
    sqlMock.mockResolvedValueOnce([
      {
        mode: "all",
        membership_id: null,
        updated_at: "2026-10-06T00:00:00.000Z",
      },
    ]);
    expect(
      await putProjectComposerRecipientSticky({
        projectId: "proj-1",
        actorUserId: "owner-1",
        body: { mode: "all" },
      }),
    ).toMatchObject({ ok: true, sticky: { mode: "all", membershipId: null } });

    sqlMock.mockResolvedValueOnce([]); // inactive check
    expect(
      await putProjectComposerRecipientSticky({
        projectId: "proj-1",
        actorUserId: "owner-1",
        body: { mode: "membership", membershipId: "mem-x" },
      }),
    ).toEqual({ ok: false, code: "membership_inactive" });

    assistants.seats = [
      { membershipId: "mem-only", displayName: "Solo", memberKind: "bot" },
    ];
    expect(
      await putProjectComposerRecipientSticky({
        projectId: "proj-1",
        actorUserId: "owner-1",
        body: { mode: "all" },
      }),
    ).toEqual({ ok: false, code: "single_assistant" });
  });

  it("DELETE clears; leave hook clears + notifies actors", async () => {
    sqlMock.mockResolvedValueOnce([{ actor_user_id: "owner-1" }]);
    expect(
      await deleteProjectComposerRecipientSticky({
        projectId: "proj-1",
        actorUserId: "owner-1",
      }),
    ).toEqual({ ok: true, cleared: true });

    sqlMock.mockResolvedValueOnce([
      { actor_user_id: "owner-1" },
      { actor_user_id: "human-2" },
    ]);
    const left = await clearStickyOnMembershipLeave({
      projectId: "proj-1",
      membershipId: "mem-a",
      displayName: "Ada",
    });
    expect(left.clearedActorUserIds).toEqual(["owner-1", "human-2"]);
    expect(notify).toHaveBeenCalledTimes(2);
  });

  it("forbidden when actor gate fails", async () => {
    actor.ok = false;
    actor.code = "forbidden";
    expect(
      await getProjectComposerRecipientSticky({
        projectId: "proj-1",
        actorUserId: "x",
      }),
    ).toEqual({ ok: false, code: "forbidden" });
  });
});
