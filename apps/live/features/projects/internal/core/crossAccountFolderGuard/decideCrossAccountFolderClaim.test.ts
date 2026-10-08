import { describe, expect, it } from "vitest";

import type { CrossAccountFolderClaim } from "./crossAccountFolderClaim.type";
import { decideCrossAccountFolderClaim } from "./decideCrossAccountFolderClaim";

describe("decideCrossAccountFolderClaim", () => {
  const baseIso = "2024-01-01T00:00:00.000Z";

  it("allows first claim", () => {
    const res = decideCrossAccountFolderClaim({
      claims: [],
      accountEmail: "a@a.com",
      projectId: "p1",
      folderRealPath: "/a",
      nowIso: baseIso,
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.nextClaims).toHaveLength(1);
    }
  });

  it("same account other project same folder ok", () => {
    const claims: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res = decideCrossAccountFolderClaim({
      claims,
      accountEmail: "A@A.COM",
      projectId: "p2",
      folderRealPath: "/a",
      nowIso: baseIso,
    });
    expect(res.ok).toBe(true);
  });

  it("other account same folder same project ok", () => {
    const claims: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res = decideCrossAccountFolderClaim({
      claims,
      accountEmail: "b@b.com",
      projectId: "p1",
      folderRealPath: "/a",
      nowIso: baseIso,
    });
    expect(res.ok).toBe(true);
  });

  it("other account same folder different project refused", () => {
    const claims: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res = decideCrossAccountFolderClaim({
      claims,
      accountEmail: "b@b.com",
      projectId: "p2",
      folderRealPath: "/a",
      nowIso: baseIso,
    });
    expect(res.ok).toBe(false);
  });

  it("other account same folder projectId null refused", () => {
    const claims: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res = decideCrossAccountFolderClaim({
      claims,
      accountEmail: "b@b.com",
      projectId: null,
      folderRealPath: "/a",
      nowIso: baseIso,
    });
    expect(res.ok).toBe(false);
  });

  it("other account nested child / parent folder refused", () => {
    const claims: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res1 = decideCrossAccountFolderClaim({
      claims,
      accountEmail: "b@b.com",
      projectId: "p1",
      folderRealPath: "/a/b",
      nowIso: baseIso,
    });
    expect(res1.ok).toBe(false);

    const claims2: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a/b",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res2 = decideCrossAccountFolderClaim({
      claims: claims2,
      accountEmail: "b@b.com",
      projectId: "p1",
      folderRealPath: "/a",
      nowIso: baseIso,
    });
    expect(res2.ok).toBe(false);
  });

  it("unrelated folders ok", () => {
    const claims: CrossAccountFolderClaim[] = [
      {
        accountEmail: "a@a.com",
        projectId: "p1",
        folderRealPath: "/a",
        claimedAt: baseIso,
        lastUsedAt: baseIso,
      },
    ];
    const res = decideCrossAccountFolderClaim({
      claims,
      accountEmail: "b@b.com",
      projectId: "p1",
      folderRealPath: "/b",
      nowIso: baseIso,
    });
    expect(res.ok).toBe(true);
  });
});
