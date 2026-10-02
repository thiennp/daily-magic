import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AWC_PROJECT_INBOX_COPY } from "@/features/projects/access/inbox/awcProjectInboxCopy.constant";
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

  it("binds Clear all confirm copy and scope=project fetch", () => {
    const section = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/inbox/AwcProjectInboxSection.tsx",
      ),
      "utf8",
    );
    const fetchSource = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/inbox/utils/fetchProjectInbox.ts",
      ),
      "utf8",
    );
    const modal = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/access/inbox/AwcProjectInboxClearConfirmModal.tsx",
      ),
      "utf8",
    );
    expect(AWC_PROJECT_INBOX_COPY.title).toBe("Messages");
    expect(AWC_PROJECT_INBOX_COPY.clearConfirmTitle).toBe(
      "Clear all project messages?",
    );
    expect(AWC_PROJECT_INBOX_COPY.clearConfirmBody).toContain(
      "This permanently deletes every message in this project",
    );
    expect(AWC_PROJECT_INBOX_COPY.clearConfirmCta).toBe("Clear all");
    expect(section).toContain("AwcProjectInboxClearConfirmModal");
    expect(section).toContain("AwcProjectInboxClearBar");
    expect(section).not.toContain("window.confirm");
    expect(modal).toContain("clearConfirmTitle");
    expect(fetchSource).toContain('params.set("scope", "project")');
  });
});
