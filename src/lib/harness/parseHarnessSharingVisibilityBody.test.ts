import { describe, expect, it } from "vitest";

import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import { parseHarnessSharingVisibilityBody } from "@/lib/harness/parseHarnessSharingVisibilityBody";

describe("parseHarnessSharingVisibilityBody", () => {
  it("parses valid visibility values", () => {
    expect(
      parseHarnessSharingVisibilityBody({
        visibility: HarnessSharingVisibility.PUBLIC,
      }),
    ).toBe(HarnessSharingVisibility.PUBLIC);
  });

  it("returns undefined for invalid payloads", () => {
    expect(parseHarnessSharingVisibilityBody(null)).toBeUndefined();
    expect(
      parseHarnessSharingVisibilityBody({ visibility: "hidden" }),
    ).toBeUndefined();
  });
});
