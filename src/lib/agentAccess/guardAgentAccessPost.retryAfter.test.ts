import { beforeEach, describe, expect, it, vi } from "vitest";

const consumeBucket = vi.hoisted(() => vi.fn());
const readRetryAfter = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  consumeAgentAccessBucket: consumeBucket,
}));
vi.mock(
  "@/lib/agentAccess/readAgentAccessBucketRetryAfterSeconds",
  async (importOriginal) => ({
    ...(await importOriginal<object>()),
    readAgentAccessBucketRetryAfterSeconds: readRetryAfter,
  }),
);

import {
  agentAccessRateLimitedResponse,
  guardAgentAccessPost,
} from "@/lib/agentAccess/guardAgentAccessPost";

const request = () =>
  new Request("https://www.agentwitch.com/api/agent-access/invoke", {
    method: "POST",
    headers: { "x-forwarded-for": "203.0.113.7" },
  });

describe("guardAgentAccessPost Retry-After (DF-026)", () => {
  beforeEach(() => {
    consumeBucket.mockReset();
    readRetryAfter.mockReset();
  });

  it("passes when the per-IP bucket has room", async () => {
    consumeBucket.mockResolvedValue(true);
    expect(await guardAgentAccessPost(request())).toBeNull();
    expect(readRetryAfter).not.toHaveBeenCalled();
  });

  it("429 carries retryAfterSeconds in the body and a Retry-After header", async () => {
    consumeBucket.mockResolvedValue(false);
    readRetryAfter.mockResolvedValue(120);
    const response = await guardAgentAccessPost(request());
    expect(response?.status).toBe(429);
    expect(response?.headers.get("Retry-After")).toBe("120");
    const body = (await response?.json()) as Record<string, unknown>;
    expect(body).toMatchObject({
      ok: false,
      code: "rate_limited",
      retryAfterSeconds: 120,
    });
    expect(typeof body.retryAfterAt).toBe("string");
    expect(readRetryAfter).toHaveBeenCalledWith(
      expect.objectContaining({ bucket: "post" }),
    );
  });

  it("the bare response helper defaults to a 60s Retry-After", async () => {
    const response = agentAccessRateLimitedResponse();
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(
      ((await response.json()) as { retryAfterSeconds: number })
        .retryAfterSeconds,
    ).toBe(60);
  });
});
