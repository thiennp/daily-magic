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


import { putProjectComposerRecipientSticky } from "@/lib/projects/acl/composer/putProjectComposerRecipientSticky";

describe("sticky PUT", () => {
  beforeEach(reset);

  it("PUT all persists; inactive + single_assistant blocked", async () => {
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

    sqlMock.mockResolvedValueOnce([]);
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
});
