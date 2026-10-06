import { describe, expect, it } from "vitest";

import {
  countProjectLibraryItems,
  filterProjectLibraryItems,
  mapProjectLibraryCapabilities,
  mapProjectLibrarySkills,
} from "@/features/projects/library/utils/buildProjectLibraryItems";
import type { ProjectSkillView } from "@/features/project-skill-share/public-api/types";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const cap = (
  over: Partial<PublishedCapabilityRecord>,
): PublishedCapabilityRecord =>
  ({
    id: "c1",
    name: "Cap",
    type: "agent",
    status: "published",
    description: "d",
    exampleRequest: "",
    projectId: "p1",
    updatedAt: "2026-10-01T00:00:00Z",
    ...over,
  }) as PublishedCapabilityRecord;

const skill = (over: Partial<ProjectSkillView>): ProjectSkillView =>
  ({
    skillId: "s1",
    name: "Skill",
    description: null,
    state: "draft",
    updatedAt: "2026-10-02T00:00:00Z",
    ...over,
  }) as ProjectSkillView;

describe("buildProjectLibraryItems", () => {
  it("keeps this project's non-archived capabilities; agent → playbook", () => {
    const items = mapProjectLibraryCapabilities(
      [
        cap({}),
        cap({ id: "c2", type: "workflow", status: "draft" }),
        cap({ id: "c3", projectId: "p2" }),
        cap({ id: "c4", status: "archived" }),
        cap({ id: "c5", projectId: null }),
      ],
      "p1",
    );
    expect(items.map((item) => [item.id, item.kind, item.state])).toEqual([
      ["c1", "playbook", "published"],
      ["c2", "workflow", "draft"],
    ]);
  });

  it("maps skills with a skill: id and drops revoked", () => {
    const items = mapProjectLibrarySkills([
      skill({}),
      skill({ skillId: "s2", state: "revoked" }),
    ]);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: "skill:s1",
      kind: "skill",
      skillId: "s1",
    });
  });

  it("filters by chip + name search and counts per chip", () => {
    const items = [
      ...mapProjectLibraryCapabilities([cap({ name: "Deploy" })], "p1"),
      ...mapProjectLibrarySkills([skill({ name: "Review" })]),
    ];
    expect(filterProjectLibraryItems(items, "skill", "")).toHaveLength(1);
    expect(filterProjectLibraryItems(items, "all", "dep")).toHaveLength(1);
    expect(filterProjectLibraryItems(items, "workflow", "")).toHaveLength(0);
    expect(countProjectLibraryItems(items)).toEqual({
      all: 2,
      playbook: 1,
      workflow: 0,
      skill: 1,
    });
  });
});
