import { describe, expect, it } from "vitest";

import { describeProjectFolderLinkError } from "./projectFolderLinkMessages";

describe("describeProjectFolderLinkError", () => {
  it("maps known codes to friendly words", () => {
    expect(describeProjectFolderLinkError("folder_required", "x")).toMatch(
      /full path/,
    );
    expect(describeProjectFolderLinkError("not_paired", null)).toMatch(
      /not connected/,
    );
    expect(describeProjectFolderLinkError("cloud_update_failed", null)).toMatch(
      /Cloud/,
    );
  });

  it("falls back to the server message, then a generic line", () => {
    expect(describeProjectFolderLinkError("weird", "Server said no.")).toBe(
      "Server said no.",
    );
    expect(describeProjectFolderLinkError(null, null)).toMatch(
      /AgentWitch Local/,
    );
  });
});
