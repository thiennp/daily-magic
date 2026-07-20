import { describe, expect, it } from "vitest";

import buildDefaultProjectFolderPath from "@/lib/projects/buildDefaultProjectFolderPath";
import { AGENT_WITCH_PROJECTS_HOME_PATH } from "@/lib/projects/constants";

describe("buildDefaultProjectFolderPath", () => {
  it("places new projects under the Agent Witch projects directory", () => {
    expect(buildDefaultProjectFolderPath("Daily Magic")).toBe(
      `${AGENT_WITCH_PROJECTS_HOME_PATH}/daily-magic`,
    );
  });
});
