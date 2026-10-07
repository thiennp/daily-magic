import { describe, expect, it } from "vitest";

import { isProjectChatHash } from "@/features/projects/utils/isProjectChatHash";

describe("isProjectChatHash (P1-S1)", () => {
  it("opens Chat for #chat (New task) and retired #activity bookmarks", () => {
    expect(isProjectChatHash("#chat?mode=task")).toBe(true);
    expect(isProjectChatHash("#chat")).toBe(true);
    expect(isProjectChatHash("#activity?mode=task")).toBe(true);
    expect(isProjectChatHash("#activity")).toBe(true);
  });

  it("ignores real tabs and empty hashes", () => {
    expect(isProjectChatHash("#overview")).toBe(false);
    expect(isProjectChatHash("#library?item=c1")).toBe(false);
    expect(isProjectChatHash("")).toBe(false);
  });
});
