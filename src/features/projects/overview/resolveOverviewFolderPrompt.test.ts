import { describe, expect, it } from "vitest";

import { resolveOverviewFolderPrompt } from "@/features/projects/overview/resolveOverviewFolderPrompt";

const ref = (machineOrDeviceRef: string) => ({ machineOrDeviceRef });

describe("resolveOverviewFolderPrompt", () => {
  it("asks for a first folder when there are none", () => {
    expect(
      resolveOverviewFolderPrompt({ folderRefs: [], thisDeviceId: null }),
    ).toBe("first");
    expect(
      resolveOverviewFolderPrompt({ folderRefs: [], thisDeviceId: "d1" }),
    ).toBe("first");
  });
  it("asks for this computer's folder when only other computers have one", () => {
    expect(
      resolveOverviewFolderPrompt({
        folderRefs: [ref("d2")],
        thisDeviceId: "d1",
      }),
    ).toBe("this_computer");
  });
  it("stays quiet when this computer has a folder or is unknown", () => {
    expect(
      resolveOverviewFolderPrompt({
        folderRefs: [ref("d1")],
        thisDeviceId: "d1",
      }),
    ).toBe("none");
    expect(
      resolveOverviewFolderPrompt({
        folderRefs: [ref("d2")],
        thisDeviceId: null,
      }),
    ).toBe("none");
  });
});
