import { describe, expect, it } from "vitest";

import {
  buildProjectUpdatedSummary,
  filterProjectUpdatedSummaryFields,
  isProjectUpdatedSummaryField,
} from "@/lib/projects/acl/messaging/buildProjectUpdatedSummary";
import {
  PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
  PROJECT_MESSAGE_LIFECYCLE_KINDS,
  PROJECT_MESSAGE_SUMMARY_MAX_CHARS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";
import {
  PROJECT_UPDATED_DEBOUNCE_MS,
  PROJECT_UPDATED_SUMMARY_FIELDS,
} from "@/lib/projects/acl/messaging/projectUpdated.constants";

describe("project.updated summary + kind", () => {
  it("adds project.updated to lifecycle kinds (hourly-cap excluded)", () => {
    expect(PROJECT_MESSAGE_KIND_PROJECT_UPDATED).toBe("project.updated");
    expect(PROJECT_MESSAGE_LIFECYCLE_KINDS).toContain(
      PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
    );
    expect(PROJECT_MESSAGE_LIFECYCLE_KINDS).toContain("peer.joined");
    expect(PROJECT_UPDATED_DEBOUNCE_MS).toBe(5_000);
  });

  it("allowlists knowledge|folder_refs|repo_urls|project_info|definition_of_done only", () => {
    expect([...PROJECT_UPDATED_SUMMARY_FIELDS]).toEqual([
      "knowledge",
      "folder_refs",
      "repo_urls",
      "project_info",
      "definition_of_done",
    ]);
    expect(isProjectUpdatedSummaryField("folder_refs")).toBe(true);
    expect(isProjectUpdatedSummaryField("secret")).toBe(false);
    expect(
      filterProjectUpdatedSummaryFields([
        "folder_refs",
        "secret",
        "repo_urls",
        "folder_refs",
        " knowledge ",
      ]),
    ).toEqual(["folder_refs", "repo_urls", "knowledge"]);
  });

  it("builds a thin summary ≤200 chars", () => {
    expect(buildProjectUpdatedSummary(["folder_refs", "repo_urls"])).toBe(
      "project updated: folder_refs,repo_urls",
    );
    expect(buildProjectUpdatedSummary(["nope"])).toBeNull();
    expect(buildProjectUpdatedSummary([])).toBeNull();
    const long = buildProjectUpdatedSummary([...PROJECT_UPDATED_SUMMARY_FIELDS]);
    expect(long).not.toBeNull();
    expect(long!.length).toBeLessThanOrEqual(PROJECT_MESSAGE_SUMMARY_MAX_CHARS);
  });
});
