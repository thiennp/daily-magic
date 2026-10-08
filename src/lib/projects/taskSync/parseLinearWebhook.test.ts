import { describe, expect, it } from "vitest";

import { parseLinearWebhook } from "@/lib/projects/taskSync/parseLinearWebhook";

const issue = (data: Record<string, unknown>, action = "update") => ({
  type: "Issue",
  action,
  url: "https://linear.app/x/issue/ENG-1",
  data: {
    id: "i1",
    identifier: "ENG-1",
    title: " Fix it ",
    priority: 2,
    state: { type: "started" },
    team: { id: "t1" },
    labels: [],
    ...data,
  },
});

describe("parseLinearWebhook", () => {
  it("ignores non-issue and malformed payloads", () => {
    expect(parseLinearWebhook(null).kind).toBe("ignore");
    expect(
      parseLinearWebhook({ type: "Comment", data: { id: "c" } }).kind,
    ).toBe("ignore");
    expect(parseLinearWebhook(issue({ id: "" })).kind).toBe("ignore");
  });

  it("unlinks on remove and archive", () => {
    expect(parseLinearWebhook(issue({}, "remove"))).toEqual({
      kind: "unlink",
      externalId: "i1",
    });
    expect(
      parseLinearWebhook(issue({ archivedAt: "2026-01-01T00:00:00Z" })).kind,
    ).toBe("unlink");
  });

  it("maps fields, blocked label and truncates the description", () => {
    const parsed = parseLinearWebhook(
      issue({ labels: [{ name: "blocked" }], description: "d".repeat(300) }),
    );
    expect(parsed.kind).toBe("upsert");
    if (parsed.kind !== "upsert") return;
    expect(parsed.fields.status).toBe("blocked");
    expect(parsed.fields.priority).toBe("p1");
    expect(parsed.fields.title).toBe("Fix it");
    expect(parsed.fields.description).toHaveLength(200);
    expect(parsed.teamId).toBe("t1");
    expect(parsed.labelsKnown).toBe(true);
  });

  it("flags unknown labels when the payload has none", () => {
    const parsed = parseLinearWebhook(issue({ labels: undefined }));
    expect(parsed.kind === "upsert" && parsed.labelsKnown).toBe(false);
  });
});
