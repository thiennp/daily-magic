import { describe, expect, it } from "vitest";

import { HarnessSharingVisibility } from "@/lib/harness/HarnessSharingVisibility.constant";
import { parseHarnessSetSharingBody } from "@/lib/harness/parseHarnessSetSharingBody";

describe("parseHarnessSetSharingBody", () => {
  it("parses valid per-set visibility values", () => {
    expect(
      parseHarnessSetSharingBody({
        setSlug: "agentwitch",
        visibility: HarnessSharingVisibility.GROUP,
      }),
    ).toEqual({
      setSlug: "agentwitch",
      visibility: HarnessSharingVisibility.GROUP,
    });
  });

  it("rejects inherit and invalid payloads", () => {
    expect(
      parseHarnessSetSharingBody({
        setSlug: "agentwitch",
        visibility: "inherit",
      }),
    ).toBeNull();
    expect(parseHarnessSetSharingBody(null)).toBeNull();
    expect(
      parseHarnessSetSharingBody({ setSlug: "", visibility: "private" }),
    ).toBeNull();
  });
});
