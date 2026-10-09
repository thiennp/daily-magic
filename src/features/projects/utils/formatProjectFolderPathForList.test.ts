import { describe, expect, it } from "vitest";

import formatProjectFolderPathForList from "@/features/projects/utils/formatProjectFolderPathForList";

describe("formatProjectFolderPathForList", () => {
  it("MF-02: middle-ellipsis preserves tail path segment", () => {
    const path =
      "~/.agent-witch/profiles/thien@agentwitch.com/repos/agentwitch";
    const { display, full } = formatProjectFolderPathForList(path, 40);
    expect(full).toBe(path);
    expect(display.endsWith("agentwitch")).toBe(true);
    expect(display.includes("…")).toBe(true);
    expect(display.length).toBeLessThanOrEqual(40);
  });

  it("returns full path when short enough", () => {
    const path = "~/repos/my-app";
    expect(formatProjectFolderPathForList(path)).toEqual({
      display: path,
      full: path,
    });
  });
});
