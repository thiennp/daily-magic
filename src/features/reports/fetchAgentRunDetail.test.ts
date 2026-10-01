import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const sampleRun = { id: "run-1" } as EnrichedAgentRunRecord;

describe("fetchAgentRunDetail", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns ok when run payload is present", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ run: sampleRun }),
      }),
    );

    const outcome = await fetchAgentRunDetail("run-1");
    expect(outcome).toEqual({ status: "ok", run: sampleRun });
  });

  it("returns not_found for 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: "Not found" }),
      }),
    );

    const outcome = await fetchAgentRunDetail("missing");
    expect(outcome).toEqual({ status: "not_found" });
  });

  it("returns error for 500", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      }),
    );

    const outcome = await fetchAgentRunDetail("run-1");
    expect(outcome).toEqual({ status: "error" });
  });

  it("returns error when response body is invalid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ unexpected: true }),
      }),
    );

    const outcome = await fetchAgentRunDetail("run-1");
    expect(outcome).toEqual({ status: "error" });
  });
});
