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
vi.mock("@/lib/projects/acl/messaging/messenger/loadClosedBotSeats", () => ({
  loadClosedBotSeats: async () => new Map(),
}));
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

import { getProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/getProjectComposerRecipientSticky";

describe("sticky GET inactive", () => {
  beforeEach(reset);

  it("auto-clears inactive membership sticky and notifies", async () => {
    sqlMock
      .mockResolvedValueOnce([
        {
          mode: "membership",
          membership_id: "mem-gone",
          updated_at: "2026-10-06T00:00:00.000Z",
        },
      ])
      .mockResolvedValueOnce([{ actor_user_id: "owner-1" }]);
    expect(
      await getProjectComposerRecipientSticky({
        projectId: "proj-1",
        actorUserId: "owner-1",
      }),
    ).toMatchObject({
      ok: true,
      sticky: null,
      cleared: true,
      clearedReason: "membership_inactive",
    });
    expect(notify).toHaveBeenCalledOnce();
  });
});
