import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchUserProjectsForLoader } from "@/features/agent/hooks/utils/fetchUserProjectsForLoader";

describe("fetchUserProjectsForLoader", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not surface load failure on silent refresh (PROJECTS-LOAD-001)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Server error" }),
      }),
    );

    const setLoadFailed = vi.fn();
    const setIsLoading = vi.fn();
    const loadGenerationRef = { current: 1 };

    await fetchUserProjectsForLoader({
      deviceId: "",
      generation: 1,
      showLoading: false,
      loadGenerationRef,
      setProjects: vi.fn(),
      setCompositionCountsByProjectId: vi.fn(),
      setLoadFailed,
      setIsLoading,
    });

    expect(setLoadFailed).not.toHaveBeenCalled();
    expect(setIsLoading).not.toHaveBeenCalled();
  });

  it("surfaces load failure when showLoading is true", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: "Server error" }),
      }),
    );

    const setLoadFailed = vi.fn();
    const setIsLoading = vi.fn();
    const loadGenerationRef = { current: 1 };

    await fetchUserProjectsForLoader({
      deviceId: "",
      generation: 1,
      showLoading: true,
      loadGenerationRef,
      setProjects: vi.fn(),
      setCompositionCountsByProjectId: vi.fn(),
      setLoadFailed,
      setIsLoading,
    });

    expect(setIsLoading).toHaveBeenCalledWith(true);
    expect(setLoadFailed).toHaveBeenCalledWith(true);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
});
