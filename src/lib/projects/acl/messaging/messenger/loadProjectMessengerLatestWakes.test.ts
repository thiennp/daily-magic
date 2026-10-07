import { describe, expect, it, vi } from "vitest";

const calls = vi.hoisted(() => [] as { text: string; values: unknown[] }[]);

vi.mock("@/lib/db", () => ({
  getSql:
    () =>
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      calls.push({ text: strings.join("?"), values });
      return [{ membership_id: "mem-a", result: "http_200" }];
    },
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

import { loadProjectMessengerLatestWakes } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerLatestWakes";

describe("loadProjectMessengerLatestWakes", () => {
  it("ignores skipped_by_policy rows so status kinds never mark a bot silent", async () => {
    const wakes = await loadProjectMessengerLatestWakes("proj-1");
    expect(wakes.get("mem-a")).toBe("http_200");
    expect(calls[0]?.text).toContain("a.result <> ?");
    expect(calls[0]?.values).toContain("skipped_by_policy");
  });
});
