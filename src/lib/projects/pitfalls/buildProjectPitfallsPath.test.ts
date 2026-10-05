import { describe, expect, it } from "vitest";

import buildProjectPitfallsPath from "@/lib/projects/pitfalls/buildProjectPitfallsPath";

describe("buildProjectPitfallsPath", () => {
  it("targets the contract route", () => {
    expect(buildProjectPitfallsPath(" p 1 ")).toBe(
      "/api/agent-witch/projects/p%201/pitfalls?includeRetired=0",
    );
    expect(buildProjectPitfallsPath("p", { includeRetired: true })).toBe(
      "/api/agent-witch/projects/p/pitfalls?includeRetired=1",
    );
  });
});
