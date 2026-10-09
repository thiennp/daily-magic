import { describe, expect, it } from "vitest";

import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import { buildAgentWitchProjectsHomePath } from "@/lib/projects/buildAgentWitchProjectsHomePath";

describe("buildDefaultProjectFolderPath", () => {
  it("builds a profile-scoped default folder path", () => {
    expect(
      buildDefaultProjectFolderPath("Agent Witch", "owner@example.com"),
    ).toBe(
      `${buildAgentWitchProjectsHomePath("owner@example.com")}/agent-witch`,
    );
  });
});
