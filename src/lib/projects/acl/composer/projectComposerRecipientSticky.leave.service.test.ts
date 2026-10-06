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
vi.mock("@/lib/projects/acl/composer/resolveComposerRecipientStickyActor", () => ({
  resolveComposerRecipientStickyActor: async () =>
    actor.ok
      ? {
          ok: true,
          projectId: "proj-1",
          actorUserId: "owner-1",
          ownerUserId: actor.ownerUserId,
        }
      : { ok: false, code: actor.code },
}));
vi.mock("@/lib/projects/acl/composer/loadActiveComposerRecipientAssistants", () => ({
  loadActiveComposerRecipientAssistants: async () => assistants.seats,
}));
vi.mock("@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema", () => ({
  ensureProjectComposerRecipientStickySchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/composer/notifyComposerRecipientStickyCleared", () => ({
  notifyComposerRecipientStickyCleared: notify,
}));

const reset = (): void => {
  sqlMock.mockReset();
  notify.mockClear();
  actor.ok = true;
  actor.code = "forbidden";
  assistants.seats = [
    { membershipId: "mem-a", displayName: "Ada", memberKind: "bot" },
    { membershipId: "mem-b", displayName: "Boris", memberKind: "bot" },
  ];
};


import { clearStickyOnMembershipLeave } from "@/lib/projects/acl/composer/clearStickyOnMembershipLeave";
import { deleteProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/deleteProjectComposerRecipientSticky";

describe("sticky DELETE + leave", () => {
  beforeEach(reset);

  it("DELETE clears; leave hook clears + notifies", async () => {
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
});
