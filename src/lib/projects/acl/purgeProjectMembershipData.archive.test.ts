import { describe, expect, it, vi } from "vitest";

import { purgeProjectMembershipData } from "@/lib/projects/acl/purgeProjectMembershipData";

const queries: string[] = [];

vi.mock("@/lib/db", () => ({
  getSql: () => async (strings: TemplateStringsArray) => {
    queries.push(strings.join("?"));
    return [];
  },
}));

describe("purgeProjectMembershipData keeps Archived (Lead lock Q5)", () => {
  it("never removes archived messages or their deliveries on revoke", async () => {
    await purgeProjectMembershipData({
      projectId: "proj-1",
      membership: { id: "mem-1", userId: "user-1" },
    });
    const messageDelete = queries.find((q) =>
      /DELETE FROM project_messages\b/.test(q),
    );
    const deliveryDelete = queries.find((q) =>
      q.includes("DELETE FROM project_message_deliveries"),
    );
    expect(messageDelete).toContain("archived_at IS NULL");
    expect(deliveryDelete).toContain("a.archived_at IS NOT NULL");
  });
});
