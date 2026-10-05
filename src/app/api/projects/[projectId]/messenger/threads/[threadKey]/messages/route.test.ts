import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("@/lib/auth/requireAuth", () => ({
  requireAuth: async () => ({
    error: null,
    actor: { id: "user-sam", email: "sam@example.com" },
  }),
}));
vi.mock(
  "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend",
  () => ({
    orchestrateProjectMessengerSend: (input: unknown) => sendMock(input),
  }),
);

import { POST } from "@/app/api/projects/[projectId]/messenger/threads/[threadKey]/messages/route";

const post = (body: string) =>
  POST(
    new Request(
      "http://localhost/api/projects/proj-trip/messenger/threads/whole/messages",
      {
        method: "POST",
        body,
      },
    ),
    { params: Promise.resolve({ projectId: "proj-trip", threadKey: "whole" }) },
  );

describe("POST messenger thread messages", () => {
  beforeEach(() => sendMock.mockReset());

  it("viewer send is 403 viewer_read_only", async () => {
    sendMock.mockResolvedValue({ ok: false, code: "viewer_read_only" });
    const response = await post(JSON.stringify({ text: "hi" }));
    expect(response.status).toBe(403);
    expect(await response.json()).toMatchObject({
      ok: false,
      code: "viewer_read_only",
    });
  });

  it("passes the body and thread key through; 200 on success", async () => {
    sendMock.mockResolvedValue({
      ok: true,
      messageId: "m-1",
      threadKey: "whole",
      recipientCount: 2,
      watchedCount: 0,
    });
    const response = await post(
      JSON.stringify({ text: "hi", needsReply: true }),
    );
    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledWith({
      projectId: "proj-trip",
      actorUserId: "user-sam",
      threadKey: "whole",
      body: { text: "hi", needsReply: true },
    });
  });

  it("rate limit is 429 with the dispatch fields; bad JSON reaches the parser as null", async () => {
    sendMock.mockResolvedValue({
      ok: false,
      code: "rate_limited",
      reason: "hourly",
      detail: "rate_limited_hourly",
      retryAfterSeconds: 60,
      retryAfterAt: "2026-10-05T09:00:00.000Z",
      message: "Try later.",
    });
    const response = await post("{");
    expect(response.status).toBe(429);
    expect(await response.json()).toMatchObject({
      retryAfterSeconds: 60,
      errorMessage: "Try later.",
    });
    expect(sendMock.mock.calls[0]?.[0]).toMatchObject({ body: null });
  });
});
