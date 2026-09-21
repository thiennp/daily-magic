import { describe, expect, it } from "vitest";

import { buildLibraryPlaybookRemoveConfirmMessage } from "@/features/library/libraryPlaybookRemoveConfirmMessage";

describe("buildLibraryPlaybookRemoveConfirmMessage", () => {
  it("asks to remove the named playbook from the library", () => {
    expect(buildLibraryPlaybookRemoveConfirmMessage("PR summary")).toBe(
      'Remove "PR summary" from your library?',
    );
  });
});
