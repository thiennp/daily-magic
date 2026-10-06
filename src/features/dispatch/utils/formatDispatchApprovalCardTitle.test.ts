import { describe, expect, it } from "vitest";

import { DISPATCH_APPROVAL_CARD_COPY as C } from "@/features/dispatch/dispatchApprovalCardCopy.constant";
import {
  formatDispatchApprovalCardTitle,
  formatDispatchApprovalFolderLine,
  hasRichDispatchApprovalCard,
} from "@/features/dispatch/utils/formatDispatchApprovalCardTitle";

describe("formatDispatchApprovalCardTitle (richer live card)", () => {
  it("falls back to S0-2 title when tool or computer is missing", () => {
    expect(
      formatDispatchApprovalCardTitle({
        requester: "Sam",
        tool: null,
        computerName: "Studio Mac",
      }),
    ).toBe(C.title);
    expect(
      formatDispatchApprovalCardTitle({
        requester: "Sam",
        tool: "claude-cli",
        computerName: "  ",
      }),
    ).toBe(C.title);
    expect(hasRichDispatchApprovalCard({ tool: "x", computerName: null })).toBe(
      false,
    );
  });

  it("names the requester, tool, and computer when rich", () => {
    expect(
      formatDispatchApprovalCardTitle({
        requester: "Sam",
        tool: "claude-cli",
        computerName: "Studio Mac",
      }),
    ).toBe("Sam wants claude-cli to run a task on Studio Mac");
  });

  it("uses the no-requester rich title otherwise", () => {
    expect(
      formatDispatchApprovalCardTitle({
        requester: null,
        tool: "claude-cli",
        computerName: "Studio Mac",
      }),
    ).toBe(
      "Someone in this project wants claude-cli to run a task on Studio Mac",
    );
  });

  it("formats the folder line only when present", () => {
    expect(formatDispatchApprovalFolderLine(null)).toBeNull();
    expect(formatDispatchApprovalFolderLine("  ")).toBeNull();
    expect(formatDispatchApprovalFolderLine("/Users/me/app")).toBe(
      "Folder: /Users/me/app",
    );
  });

  it("has no jargon in new card strings", () => {
    for (const key of ["richTitle", "richTitleNoRequester", "folderLine"] as const) {
      expect(C[key]).not.toMatch(/agent|dispatch|machine/i);
    }
  });
});
