import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_INBOX_POLL_MS } from "@/features/projects/access/inbox/awcProjectInboxPolling.constant";

describe("AwcProjectInboxSection wiring", () => {
  it("polls while enabled and pauses on hidden tabs", () => {
    const pollSource = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/inbox/hooks/useAwcProjectInboxLivePoll.ts",
      ),
      "utf8",
    );
    expect(AWC_PROJECT_INBOX_POLL_MS).toBeGreaterThanOrEqual(15_000);
    expect(AWC_PROJECT_INBOX_POLL_MS).toBeLessThanOrEqual(30_000);
    expect(pollSource).toContain("document.visibilityState");
    expect(pollSource).toContain("setInterval");
  });

  it("is folded into Access panel body, not Detail orphan", () => {
    const body = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/AwcProjectAccessPanelBody.tsx",
      ),
      "utf8",
    );
    const detail = readFileSync(
      join(process.cwd(), "src/features/projects/AwcProjectDetailPanel.tsx"),
      "utf8",
    );
    expect(body).toContain("AwcProjectInboxSection");
    expect(detail).not.toContain("AwcProjectInboxSection");
  });
});
