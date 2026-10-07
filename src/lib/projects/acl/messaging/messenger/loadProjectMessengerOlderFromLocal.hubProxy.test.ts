import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AWC_HOSTED_DEVICE_HUB_PROXY_ENV,
  AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV,
} from "@/lib/projects/acl/messaging/messenger/hostedDeviceHubProxyFlag";

vi.mock(
  "@/lib/projects/acl/messaging/messenger/requestProjectHistoryPageFromDevice",
  () => ({
    requestProjectHistoryPageFromDevice: vi.fn(),
  }),
);

import { requestProjectHistoryPageFromDevice } from "@/lib/projects/acl/messaging/messenger/requestProjectHistoryPageFromDevice";
import { loadProjectMessengerOlderFromLocal } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerOlderFromLocal";

const mockedRequest = vi.mocked(requestProjectHistoryPageFromDevice);

describe("loadProjectMessengerOlderFromLocal hub proxy wiring", () => {
  afterEach(() => {
    delete process.env[AWC_HOSTED_DEVICE_HUB_PROXY_ENV];
    delete process.env[AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV];
    mockedRequest.mockReset();
  });

  it("flag off → old in-process path (no hub request)", async () => {
    await loadProjectMessengerOlderFromLocal({
      projectId: "proj-no-local-history",
      threadKey: "whole",
      limit: 10,
      ownerUserId: "owner-1",
    });
    expect(mockedRequest).not.toHaveBeenCalled();
  });

  it("flag on + same-host → in-process (no hub request)", async () => {
    process.env[AWC_HOSTED_DEVICE_HUB_PROXY_ENV] = "1";
    process.env[AWC_HOSTED_DEVICE_HUB_PROXY_SAME_HOST_ENV] = "1";
    await loadProjectMessengerOlderFromLocal({
      projectId: "proj-no-local-history",
      threadKey: "whole",
      limit: 10,
      ownerUserId: "owner-1",
    });
    expect(mockedRequest).not.toHaveBeenCalled();
  });

  it("flag on → hub proxy; page returned", async () => {
    process.env[AWC_HOSTED_DEVICE_HUB_PROXY_ENV] = "1";
    mockedRequest.mockResolvedValue({
      kind: "page",
      page: {
        entries: [
          {
            messageId: "m1",
            createdAt: "2026-10-07T10:00:00.000Z",
            author: {
              kind: "owner",
              membershipId: null,
              displayName: null,
            },
            kind: "chat.note",
            text: "hub",
            needsReply: false,
            inReplyTo: null,
            states: [],
          },
        ],
        nextBeforeCursor: null,
        hasMore: false,
      },
    });
    const page = await loadProjectMessengerOlderFromLocal({
      projectId: "proj-1",
      threadKey: "whole",
      limit: 10,
      ownerUserId: "owner-1",
    });
    expect(mockedRequest).toHaveBeenCalledOnce();
    expect(page.entries[0]?.text).toBe("hub");
  });

  it("I6-path: soft_degrade → empty local (fall through Neon)", async () => {
    process.env[AWC_HOSTED_DEVICE_HUB_PROXY_ENV] = "1";
    mockedRequest.mockResolvedValue({
      kind: "soft_degrade",
      reason: "expired",
    });
    const page = await loadProjectMessengerOlderFromLocal({
      projectId: "proj-1",
      threadKey: "whole",
      limit: 10,
      ownerUserId: "owner-1",
    });
    expect(page).toEqual({
      entries: [],
      nextBeforeCursor: null,
      hasMore: false,
    });
  });
});
