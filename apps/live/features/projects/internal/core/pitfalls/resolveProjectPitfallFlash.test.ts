import { describe, expect, it } from "vitest";

import resolveProjectPitfallFlash from "./resolveProjectPitfallFlash";

describe("resolveProjectPitfallFlash", () => {
  it("maps known codes and ignores unknown ones", () => {
    expect(resolveProjectPitfallFlash("saved")).toEqual({
      message: "Pitfall saved.",
      error: null,
    });
    expect(resolveProjectPitfallFlash("limit")?.error).toContain(
      "already has 64 active pitfalls, the most allowed",
    );
    expect(resolveProjectPitfallFlash("toString")).toBeNull();
    expect(resolveProjectPitfallFlash(null)).toBeNull();
  });
});
