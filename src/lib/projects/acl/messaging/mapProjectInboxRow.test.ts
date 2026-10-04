import { describe, expect, it } from "vitest";

import { mapProjectInboxRow } from "@/lib/projects/acl/messaging/mapProjectInboxRow";

const row = (result: unknown) => ({
  id: "msg-1",
  kind: "task.assign",
  summary: "wake me",
  refs: {},
  sender_membership_id: null,
  created_at: "2026-10-04T08:00:00.000Z",
  acked_at: null,
  grok_wake_result: result,
  webhook_url: "https://secret.example/hook",
  bearer_retained: "sekret-bearer",
});

describe("mapProjectInboxRow", () => {
  it("keeps allowlisted wake results and drops anything else", () => {
    expect(mapProjectInboxRow(row("http_204")).grokWakeResult).toBe("http_204");
    expect(mapProjectInboxRow(row("fetch_failed")).grokWakeResult).toBe(
      "fetch_failed",
    );
    expect(mapProjectInboxRow(row("not_postable")).grokWakeResult).toBe(
      "not_postable",
    );
    expect(mapProjectInboxRow(row(null)).grokWakeResult).toBeNull();
    const dropped = mapProjectInboxRow(row("https://secret.example/hook"));
    expect(dropped.grokWakeResult).toBeNull();
    const body = JSON.stringify(dropped);
    expect(body).not.toContain("secret.example");
    expect(body).not.toContain("sekret-bearer");
  });
});
