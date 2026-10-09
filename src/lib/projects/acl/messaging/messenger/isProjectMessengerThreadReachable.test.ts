import { beforeEach, describe, expect, it, vi } from "vitest";

const botsMock = vi.hoisted(() => vi.fn());
const closedMock = vi.hoisted(() => vi.fn());
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots",
  () => ({
    loadProjectMessengerBots: botsMock,
  }),
);
vi.mock("@/lib/projects/acl/messaging/messenger/loadClosedBotSeats", () => ({
  loadClosedBotSeats: closedMock,
}));

import { isProjectMessengerThreadReachable } from "@/lib/projects/acl/messaging/messenger/isProjectMessengerThreadReachable";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";

const ask = (threadKey: string, viewerUserId = "me") =>
  isProjectMessengerThreadReachable({
    projectId: "p1",
    threadKey,
    viewerUserId,
  });

describe("isProjectMessengerThreadReachable", () => {
  beforeEach(() => {
    botsMock.mockResolvedValue([
      { membershipId: "b1" },
      { membershipId: "b2" },
    ]);
    closedMock.mockResolvedValue(new Map([["b1", "alice"]]));
  });

  it("hides a closed assistant from everyone but the person who invited it", async () => {
    expect(await ask("b1", "me")).toBe(false);
    expect(await ask("b1", "owner")).toBe(false);
    expect(await ask("b1", "alice")).toBe(true);
    expect(await ask("b2")).toBe(true);
  });

  it("rejects an unknown thread", async () => {
    expect(await ask("nope")).toBe(false);
  });

  it("opens Whole project unless every assistant is closed to the viewer", async () => {
    expect(await ask(PROJECT_MESSENGER_WHOLE_THREAD_KEY)).toBe(true);
    botsMock.mockResolvedValue([{ membershipId: "b1" }]);
    expect(await ask(PROJECT_MESSENGER_WHOLE_THREAD_KEY)).toBe(false);
    botsMock.mockResolvedValue([]);
    expect(await ask(PROJECT_MESSENGER_WHOLE_THREAD_KEY)).toBe(true);
  });
});
