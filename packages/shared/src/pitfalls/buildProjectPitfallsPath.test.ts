import { describe, expect, it } from "vitest";

import {
  buildProjectPitfallHitPath,
  buildProjectPitfallsPath,
} from "./buildProjectPitfallsPath";

describe("buildProjectPitfallsPath", () => {
  it("encodes spaces and rejects slash or .. segments", () => {
    expect(buildProjectPitfallsPath("proj space")).toBe(
      "/api/agent-witch/projects/proj%20space/pitfalls",
    );
    expect(buildProjectPitfallHitPath("proj space", "id/with/slash")).toBeNull();
    expect(buildProjectPitfallHitPath("proj", "id..bad")).toBeNull();
    expect(buildProjectPitfallHitPath("../proj", "ok")).toBeNull();
    expect(buildProjectPitfallHitPath("proj", "arch-max-lines")).toBe(
      "/api/agent-witch/projects/proj/pitfalls/arch-max-lines/hit",
    );
  });
});
