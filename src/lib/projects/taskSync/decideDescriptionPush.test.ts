import { describe, expect, it } from "vitest";

import { decideDescriptionPush } from "@/lib/projects/taskSync/decideDescriptionPush";
import { hashDescription } from "@/lib/projects/taskSync/hashTaskSyncFields";

describe("decideDescriptionPush", () => {
  it("sends normally when Linear's description is not clipped", () => {
    expect(
      decideDescriptionPush({ clippedDescriptionHash: null, description: "a" }),
    ).toEqual({ send: true, nextClippedHash: null });
  });

  it("omits the description while AW still matches the clipped baseline", () => {
    const baseline = hashDescription("kept");
    expect(
      decideDescriptionPush({
        clippedDescriptionHash: baseline,
        description: "kept",
      }),
    ).toEqual({ send: false, nextClippedHash: baseline });
  });

  it("sends after an AW-side edit and clears the marker", () => {
    expect(
      decideDescriptionPush({
        clippedDescriptionHash: hashDescription("kept"),
        description: "edited",
      }),
    ).toEqual({ send: true, nextClippedHash: null });
  });
});
