import { describe, expect, it } from "vitest";

import { filterProjectLibraryCapabilitiesForRole } from "@/lib/capabilities/filterProjectLibraryCapabilitiesForRole";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const cap = (
  id: string,
  status: "draft" | "published",
): PublishedCapabilityRecord =>
  ({
    id,
    ownerUserId: "o",
    groupId: null,
    type: "agent",
    name: id,
    description: "",
    exampleRequest: "",
    visibility: "private",
    status,
    dispatchPolicyOverride: null,
    harnessSetSlug: null,
    currentVersionId: null,
    workflowFields: [],
    workflowOutputFields: [],
    operatorSteps: [],
    forkedFromCapabilityId: null,
    projectId: "p1",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  }) as PublishedCapabilityRecord;

describe("filterProjectLibraryCapabilitiesForRole", () => {
  const all = [
    cap("draft-1", CapabilityStatus.DRAFT),
    cap("pub-1", CapabilityStatus.PUBLISHED),
  ];

  it("owner sees drafts + published", () => {
    expect(filterProjectLibraryCapabilitiesForRole(all, "owner")).toHaveLength(
      2,
    );
  });

  it("member and viewer see published only", () => {
    expect(filterProjectLibraryCapabilitiesForRole(all, "member")).toEqual([
      all[1],
    ]);
    expect(filterProjectLibraryCapabilitiesForRole(all, "viewer")).toEqual([
      all[1],
    ]);
  });
});
