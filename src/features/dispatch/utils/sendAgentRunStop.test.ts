import { afterEach, describe, expect, it, vi } from "vitest";

import { sendAgentRunStop } from "@/features/dispatch/utils/sendAgentRunStop";

describe("sendAgentRunStop", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("posts to the stop route for the active run", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    const result = await sendAgentRunStop("run-1");

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/agent-runs/run-1/stop",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("rejects an empty run id", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const result = await sendAgentRunStop("  ");

    expect(result).toEqual({
      ok: false,
      errorMessage: "No active run to stop.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
