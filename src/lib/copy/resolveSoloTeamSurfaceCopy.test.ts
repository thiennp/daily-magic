import { describe, expect, it } from "vitest";

import {
  resolveComposerApprovalHelper,
  resolveComposerApprovalWaitingLabel,
  resolveLibraryPageSubtitle,
  resolveLibrarySignedInEmptyBody,
  resolveReportsPageSubtitle,
  resolveReportsSignedInEmptyBody,
} from "@/lib/copy/resolveSoloTeamSurfaceCopy";

describe("resolveSoloTeamSurfaceCopy", () => {
  it("uses solo library copy when team nav is off", () => {
    expect(resolveLibraryPageSubtitle({ teamNavEnabled: false })).toContain(
      "for you alone",
    );
    expect(
      resolveLibrarySignedInEmptyBody({ teamNavEnabled: false }),
    ).toContain("Only you see and run these");
  });

  it("uses team library copy when team nav is on", () => {
    expect(resolveLibraryPageSubtitle({ teamNavEnabled: true })).toContain(
      "Shared workflows",
    );
    expect(resolveLibrarySignedInEmptyBody({ teamNavEnabled: true })).toContain(
      "Ownership is shared",
    );
  });

  it("uses solo vs team reports copy", () => {
    expect(resolveReportsPageSubtitle({ teamNavEnabled: false })).toContain(
      "you sent to your Mac",
    );
    expect(resolveReportsPageSubtitle({ teamNavEnabled: true })).toContain(
      "shared runners",
    );
    expect(resolveReportsSignedInEmptyBody({ teamNavEnabled: true })).toBe(
      "Team jobs and named approvals land here.",
    );
  });

  it("uses solo vs team composer approval helper", () => {
    expect(resolveComposerApprovalHelper({ teamNavEnabled: false })).toContain(
      "You'll be asked",
    );
    expect(resolveComposerApprovalHelper({ teamNavEnabled: true })).toContain(
      "named approver",
    );
  });

  it("uses solo vs team approval waiting chip copy", () => {
    expect(resolveComposerApprovalWaitingLabel({ teamNavEnabled: false })).toBe(
      "Approval needed — you",
    );
    expect(
      resolveComposerApprovalWaitingLabel({
        teamNavEnabled: true,
        approverName: "Alex Chen",
      }),
    ).toBe("Waiting on Alex Chen");
    expect(resolveComposerApprovalWaitingLabel({ teamNavEnabled: true })).toBe(
      "Waiting on approver",
    );
  });
});
