import { describe, expect, it } from "vitest";

import {
  canEditProjectRepoUrls,
  canViewProjectRepoUrls,
} from "@/features/projects/repoUrls/canViewProjectRepoUrls";

describe("canViewProjectRepoUrls", () => {
  it("allows owner", () => {
    expect(canViewProjectRepoUrls({ isOwner: true })).toBe(true);
  });

  it("allows active member", () => {
    expect(
      canViewProjectRepoUrls({ isOwner: false, isActiveMember: true }),
    ).toBe(true);
  });

  it("hides for non-member (match AuthZ — never show URLs)", () => {
    expect(canViewProjectRepoUrls({ isOwner: false })).toBe(false);
    expect(
      canViewProjectRepoUrls({ isOwner: false, isActiveMember: false }),
    ).toBe(false);
  });
});

describe("canEditProjectRepoUrls", () => {
  it("is owner-only in v1", () => {
    expect(canEditProjectRepoUrls({ isOwner: true })).toBe(true);
    expect(canEditProjectRepoUrls({ isOwner: false })).toBe(false);
  });
});
