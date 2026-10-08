import { describe, expect, it } from "vitest";

import {
  linearIssueCreateFixture,
  linearIssueRemoveFixture,
  linearIssueUpdateFixture,
} from "@/lib/projects/taskSync/linearWebhookPayloads.fixtures";
import { parseLinearWebhook } from "@/lib/projects/taskSync/parseLinearWebhook";

describe("parseLinearWebhook with Linear's documented Issue payload shape", () => {
  it("create: state type, team id, empty labels, url", () => {
    const parsed = parseLinearWebhook(linearIssueCreateFixture);
    expect(parsed.kind).toBe("upsert");
    if (parsed.kind !== "upsert") return;
    expect(parsed.fields.status).toBe("in_progress");
    expect(parsed.fields.priority).toBe("p1");
    expect(parsed.teamId).toBe("7f3a1c9e-0000-4000-8000-0000000000aa");
    expect(parsed.labelsKnown).toBe(true);
    expect(parsed.ref).toEqual({
      externalId: "539068e2-ae88-4d09-bd75-22eb4a59612f",
      identifier: "LIN-1778",
      url: "https://linear.app/company/issue/LIN-1778/fix-the-bug",
    });
  });

  it("update: Blocked label objects make the task blocked", () => {
    const parsed = parseLinearWebhook(linearIssueUpdateFixture);
    expect(parsed.kind === "upsert" && parsed.fields.status).toBe("blocked");
  });

  it("update: teamId alone is enough when the team object is absent", () => {
    const data = { ...linearIssueUpdateFixture.data, team: undefined };
    const parsed = parseLinearWebhook({ ...linearIssueUpdateFixture, data });
    expect(parsed.kind === "upsert" && parsed.teamId).toBe(
      linearIssueUpdateFixture.data.teamId,
    );
  });

  it("remove: unlinks by external id", () => {
    expect(parseLinearWebhook(linearIssueRemoveFixture)).toEqual({
      kind: "unlink",
      externalId: "539068e2-ae88-4d09-bd75-22eb4a59612f",
    });
  });

  it("archived update (archivedAt set, action update) unlinks", () => {
    const parsed = parseLinearWebhook({
      ...linearIssueUpdateFixture,
      data: {
        ...linearIssueUpdateFixture.data,
        archivedAt: "2023-02-10T18:45:00.000Z",
      },
    });
    expect(parsed.kind).toBe("unlink");
  });
});
