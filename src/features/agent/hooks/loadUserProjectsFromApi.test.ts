import { afterEach, describe, expect, it, vi } from "vitest";

import loadUserProjectsFromApi from "@/features/agent/hooks/loadUserProjectsFromApi";

describe("loadUserProjectsFromApi", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns ok false when the API response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Server error" }),
      }),
    );

    const result = await loadUserProjectsFromApi("");

    expect(result.ok).toBe(false);
  });

  it("returns projects when the API response is valid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          projects: [
            {
              id: "p1",
              name: "Demo",
              folderPath: "/tmp/demo",
              deviceId: "d1",
              isDefault: false,
            },
          ],
          compositionCountsByProjectId: {},
        }),
      }),
    );

    const result = await loadUserProjectsFromApi("");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.projects).toHaveLength(1);
      expect(result.projects[0]?.name).toBe("Demo");
    }
  });
});
