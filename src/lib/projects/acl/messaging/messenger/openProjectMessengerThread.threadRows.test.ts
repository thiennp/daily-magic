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
  () => ({ ensureProjectMessengerSchema: async () => undefined }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots",
  () => ({
    loadProjectMessengerBots: async () => [],
  }),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/detectProjectMessengerLocalLive",
  () => ({ detectProjectMessengerLocalLive: async () => false }),
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
  () => ({ markProjectMessengerThreadRead: async () => undefined }),
);

import { openProjectMessengerThread } from "@/lib/projects/acl/messaging/messenger/openProjectMessengerThread";
import {
  THREAD_ROWS_NEON_PAGE,
  THREAD_ROWS_PARENT as PARENT,
  threadRowsViewer as viewer,
} from "@/lib/projects/acl/messaging/messenger/openProjectMessengerThread.threadRows.fixtures";

describe("openProjectMessengerThread notice / bot↔bot / grouped rows", () => {
  beforeEach(() => {
    viewerMock.mockReset();
    neonPageMock.mockReset();
    neonPageMock.mockResolvedValue(THREAD_ROWS_NEON_PAGE);
  });

  it("asks Neon for owner notices and returns the new row fields", async () => {
    viewerMock.mockResolvedValue(viewer(true));
    const result = await openProjectMessengerThread({
      projectId: "proj-1",
      actorUserId: "owner-1",
      threadKey: "whole",
    });
    expect(neonPageMock).toHaveBeenCalledWith(
      expect.objectContaining({ notices: "owner", includeBotToBot: true }),
    );
    if (!result.ok) throw new Error("expected ok");
    const [notice, b2b, parent] = result.entries;
    expect(notice).toMatchObject({
      windowKind: "notice",
      parentMessageId: PARENT,
      replyIds: [],
      archived: null,
    });
    expect(b2b).toMatchObject({
      windowKind: "bot_to_bot",
      parentMessageId: null,
    });
    expect(parent).toMatchObject({
      windowKind: "task",
      parentMessageId: null,
      replyIds: ["notice-1"],
      archived: { at: "2026-10-07T20:00:00.000Z", byUserId: "owner-1" },
    });
  });

  it("a member asks for member notices only", async () => {
    viewerMock.mockResolvedValue(viewer(false));
    await openProjectMessengerThread({
      projectId: "proj-1",
      actorUserId: "member-1",
      threadKey: "whole",
    });
    expect(neonPageMock).toHaveBeenCalledWith(
      expect.objectContaining({ notices: "member", includeBotToBot: false }),
    );
  });
});
