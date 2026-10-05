import { beforeEach, describe, expect, it, vi } from "vitest";

import { RATE_LIMITED_CASES } from "@/lib/projects/acl/messaging/projectMessageRateLimited.fixtures";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const requireAuth = vi.hoisted(() => vi.fn());
const dispatchProjectMessageFromOwner = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));

vi.mock("@/lib/projects/acl/messaging/dispatchProjectMessageFromOwner", () => ({
  dispatchProjectMessageFromOwner,
}));

import { POST } from "@/app/api/projects/[projectId]/inbox/dispatch/route";

const callPost = () =>
  POST(
    new Request("http://localhost/api/projects/proj-1/inbox/dispatch", {
      method: "POST",
      body: JSON.stringify({ body: "hello" }),
    }),
    { params: Promise.resolve({ projectId: "proj-1" }) },
  );

describe("POST owner inbox dispatch on rate_limited", () => {
  beforeEach(() => {
    requireAuth.mockReset();
    dispatchProjectMessageFromOwner.mockReset();
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
  });

  it.each(RATE_LIMITED_CASES)(
    "answers 429 with every retry field for %s",
    async (_label, failure) => {
      dispatchProjectMessageFromOwner.mockResolvedValue(failure);
      const response = await callPost();
      expect(response.status).toBe(429);
      expect(await response.json()).toEqual({
        ok: false,
        errorMessage: failure.message,
        code: "rate_limited",
        reason: failure.reason,
        detail: failure.detail,
        retryAfterSeconds: failure.retryAfterSeconds,
        retryAfterAt: failure.retryAfterAt,
        message: failure.message,
      });
      expect(dispatchProjectMessageFromOwner).toHaveBeenCalledWith({
        projectId: "proj-1",
        ownerUserId: "owner-1",
        args: { body: "hello" },
      });
    },
  );

  it("keeps 400 for other failures", async () => {
    dispatchProjectMessageFromOwner.mockResolvedValue({
      ok: false,
      code: "invalid_arguments",
    });
    const response = await callPost();
    expect(response.status).toBe(400);
  });
});
