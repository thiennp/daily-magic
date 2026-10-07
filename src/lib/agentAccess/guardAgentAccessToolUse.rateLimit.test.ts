import { beforeEach, describe, expect, it, vi } from "vitest";

const consumeBucket = vi.hoisted(() => vi.fn());
const readRetryAfter = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  consumeAgentAccessBucket: consumeBucket,
}));
vi.mock("@/lib/agentAccess/readAgentAccessBucketRetryAfterSeconds", () => ({
  readAgentAccessBucketRetryAfterSeconds: readRetryAfter,
}));
vi.mock("@/lib/capabilities/capabilityQueries", () => ({
  listPublishedCapabilitiesForOwner: async () => [],
}));
vi.mock("@/lib/dispatch/listAgentRunsForUser", () => ({
  listAgentRunsForUser: async () => [],
}));

import { guardAgentAccessToolUse } from "@/lib/agentAccess/guardAgentAccessToolUse";

const guard = (name: string) =>
  guardAgentAccessToolUse({ name, token: "aw_test_token", userId: "bot-1" });

const parse = (result: { readonly text: string } | null) =>
  result === null ? null : (JSON.parse(result.text) as Record<string, unknown>);

describe("guardAgentAccessToolUse rate limits (DF-026)", () => {
  beforeEach(() => {
    consumeBucket.mockReset();
    readRetryAfter.mockReset();
    readRetryAfter.mockResolvedValue(42);
  });

  it.each(["list_project_inbox", "ack_project_message"])(
    "%s is exempt from the tool and mutate buckets",
    async (name) => {
      consumeBucket.mockResolvedValue(false);
      expect(await guard(name)).toBeNull();
      expect(consumeBucket).not.toHaveBeenCalled();
      expect(readRetryAfter).not.toHaveBeenCalled();
    },
  );

  it("a limited non-exempt tool returns rate_limited with retryAfterSeconds", async () => {
    consumeBucket.mockResolvedValue(false);
    const result = await guard("list_project_peers");
    expect(result?.isError).toBe(true);
    const body = parse(result);
    expect(body).toMatchObject({
      ok: false,
      code: "rate_limited",
      retryAfterSeconds: 42,
    });
    expect(typeof body?.retryAfterAt).toBe("string");
    expect(readRetryAfter).toHaveBeenCalledWith(
      expect.objectContaining({ bucket: "tool" }),
    );
  });

  it("a limited mutating tool reports the mutate bucket", async () => {
    consumeBucket.mockImplementation(
      async (input: { readonly bucket: string }) => input.bucket === "tool",
    );
    const body = parse(await guard("register_project_webhook"));
    expect(body).toMatchObject({ code: "rate_limited", retryAfterSeconds: 42 });
    expect(readRetryAfter).toHaveBeenCalledWith(
      expect.objectContaining({ bucket: "mutate" }),
    );
  });

  it("allowed non-exempt tools still consume the tool bucket", async () => {
    consumeBucket.mockResolvedValue(true);
    expect(await guard("list_project_peers")).toBeNull();
    expect(consumeBucket).toHaveBeenCalledTimes(1);
  });

  it("unknown tools are still rejected before any bucket", async () => {
    const body = parse(await guard("not_a_tool"));
    expect(body?.code).toBe("unknown_tool");
    expect(consumeBucket).not.toHaveBeenCalled();
  });
});
