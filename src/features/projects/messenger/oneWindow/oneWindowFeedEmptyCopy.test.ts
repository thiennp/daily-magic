import { describe, expect, it } from "vitest";

import { resolveOneWindowEmptyCopy } from "@/features/projects/messenger/oneWindow/oneWindowFeedEmptyCopy";

describe("resolveOneWindowEmptyCopy", () => {
  it("gives each filter its own empty state", () => {
    expect(resolveOneWindowEmptyCopy("all").title).toBe("No messages yet");
    expect(resolveOneWindowEmptyCopy("needs").title).toBe("Nothing needs you");
    expect(resolveOneWindowEmptyCopy("approvals").title).toBe(
      "No approvals waiting",
    );
  });

  it("never repeats the title in the body", () => {
    for (const filter of ["all", "needs", "approvals"] as const) {
      const { title, body } = resolveOneWindowEmptyCopy(filter);
      expect(body).not.toContain(title);
    }
  });
});
