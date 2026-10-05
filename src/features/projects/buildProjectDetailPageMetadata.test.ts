import { describe, expect, it } from "vitest";

import buildProjectDetailPageMetadata from "@/features/projects/buildProjectDetailPageMetadata";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

describe("buildProjectDetailPageMetadata", () => {
  it("builds owner-visible title with project name", () => {
    expect(buildProjectDetailPageMetadata("Demo")).toEqual({
      title: `Demo · Projects · ${AGENT_WITCH_PRODUCT_NAME}`,
    });
    expect(buildProjectDetailPageMetadata("  ")).toEqual({
      title: `Project · Projects · ${AGENT_WITCH_PRODUCT_NAME}`,
    });
  });
});
