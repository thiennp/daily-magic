import { describe, expect, it } from "vitest";

import parseSyncProjectHarnessBindingsBody from "@/lib/projects/parseSyncProjectHarnessBindingsBody";

describe("parseSyncProjectHarnessBindingsBody", () => {
  it("parses harnessSetSlugs array", () => {
    expect(
      parseSyncProjectHarnessBindingsBody({
        harnessSetSlugs: [" demo ", "fsa-architecture"],
      }),
    ).toEqual(["demo", "fsa-architecture"]);
  });

  it("rejects invalid body", () => {
    expect(parseSyncProjectHarnessBindingsBody(null)).toBeNull();
  });
});
