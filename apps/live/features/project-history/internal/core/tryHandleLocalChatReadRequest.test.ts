import type http from "node:http";

import { describe, expect, it, vi } from "vitest";

import { tryHandleLocalChatReadRequest } from "./tryHandleLocalChatReadRequest";

vi.mock("@agent-witch/live-token-saver", () => ({
  loadNodeSqlite: () => ({
    ok: false as const,
    reason: "forced_off_for_test",
  }),
}));

vi.mock("./listLocalChatThreadKeys", () => ({
  listLocalChatThreadKeys: () => ({
    available: false,
    threadKeys: [] as string[],
    reason: "forced_off_for_test",
  }),
}));

vi.mock("./listLocalChatIndexPage", () => ({
  listLocalChatIndexPage: () => ({
    available: true,
    rows: [],
  }),
}));

vi.mock("./getLocalChatMessage", () => ({
  getLocalChatMessage: () => null,
}));

const sendJson = vi.fn();

describe("tryHandleLocalChatReadRequest", () => {
  it("returns 503 JSON when sqlite unavailable for chats list", () => {
    sendJson.mockClear();
    const handled = tryHandleLocalChatReadRequest({
      method: "GET",
      pathname: "/api/local/projects/p1/chats",
      requestUrl: "/api/local/projects/p1/chats",
      response: {} as http.ServerResponse,
      sendJson,
    });
    expect(handled).toBe(true);
    expect(sendJson).toHaveBeenCalledWith(
      expect.anything(),
      503,
      expect.objectContaining({
        ok: false,
        error: "index_unavailable",
        threadKeys: [],
      }),
    );
  });

  it("ignores unrelated paths", () => {
    sendJson.mockClear();
    expect(
      tryHandleLocalChatReadRequest({
        method: "GET",
        pathname: "/api/local/check-context",
        requestUrl: "/api/local/check-context",
        response: {} as http.ServerResponse,
        sendJson,
      }),
    ).toBe(false);
    expect(sendJson).not.toHaveBeenCalled();
  });
});
