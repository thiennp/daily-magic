import { beforeEach, describe, expect, it, vi } from "vitest";

const viewerMock = vi.fn();
const neonPageMock = vi.fn();

vi.mock(
  "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerViewer",
  () => ({
    resolveProjectMessengerViewer: (input: unknown) => viewerMock(input),
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/ensureProjectMessengerSchema",
  () => ({
    ensureProjectMessengerSchema: async () => undefined,
  }),
);
vi.mock("@/lib/projects/acl/messaging/messenger/loadClosedBotSeats", () => ({
  loadClosedBotSeats: async () => new Map(),
}));
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots",
  () => ({
    loadProjectMessengerBots: async () => [],
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/detectProjectMessengerLocalLive",
  () => ({
    detectProjectMessengerLocalLive: async () => false,
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerOlderFromLocal",
  () => ({
    loadProjectMessengerOlderFromLocal: async () => ({
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    }),
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerNeonThreadPage",
  () => ({
    loadProjectMessengerNeonThreadPage: (input: unknown) => neonPageMock(input),
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/markProjectMessengerThreadRead",
  () => ({
    markProjectMessengerThreadRead: async () => undefined,
  }),
);

import { openProjectMessengerThread } from "@/lib/projects/acl/messaging/messenger/openProjectMessengerThread";

const viewer = (isOwner: boolean) => ({
  ok: true,
  projectId: "proj-1",
  ownerUserId: "owner-1",
  viewerUserId: isOwner ? "owner-1" : "member-1",
  canSend: true,
  isOwner,
});

describe("openProjectMessengerThread bot↔bot gate (DF-023)", () => {
  beforeEach(() => {
    viewerMock.mockReset();
    neonPageMock.mockReset();
    neonPageMock.mockResolvedValue({ entries: [], hasMore: false });
  });

  it("asks Neon for bot↔bot rows when the viewer is the owner", async () => {
    viewerMock.mockResolvedValue(viewer(true));
    const result = await openProjectMessengerThread({
      projectId: "proj-1",
      actorUserId: "owner-1",
      threadKey: "whole",
    });
    expect(result.ok).toBe(true);
    expect(neonPageMock).toHaveBeenCalledWith(
      expect.objectContaining({ threadKey: "whole", includeBotToBot: true }),
    );
  });

  it("never asks for bot↔bot rows for a non-owner member", async () => {
    viewerMock.mockResolvedValue(viewer(false));
    await openProjectMessengerThread({
      projectId: "proj-1",
      actorUserId: "member-1",
      threadKey: "whole",
    });
    expect(neonPageMock).toHaveBeenCalledWith(
      expect.objectContaining({ includeBotToBot: false }),
    );
  });

  it("forbidden viewers get no page at all", async () => {
    viewerMock.mockResolvedValue({ ok: false, code: "forbidden" });
    const result = await openProjectMessengerThread({
      projectId: "proj-1",
      actorUserId: "stranger",
      threadKey: "whole",
    });
    expect(result).toEqual({ ok: false, code: "forbidden" });
    expect(neonPageMock).not.toHaveBeenCalled();
  });
});
