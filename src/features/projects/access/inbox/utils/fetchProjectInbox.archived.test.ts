import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProjectInbox } from "@/features/projects/access/inbox/utils/fetchProjectInbox";

describe("fetchProjectInbox Archived filter", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("adds archived=1 and parses archivedCount + canRestore", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).toContain("scope=project");
      expect(url).toContain("archived=1");
      return new Response(
        JSON.stringify({
          ok: true,
          messages: [],
          archivedCount: 3,
          canRestore: false,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchProjectInbox({ projectId: "p1", archived: true });
    expect(result).toMatchObject({
      ok: true,
      archivedCount: 3,
      canRestore: false,
    });
  });

  it("Inbox fetch omits archived param", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      expect(url).not.toContain("archived=");
      return new Response(JSON.stringify({ ok: true, messages: [] }), {
        status: 200,
      });
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchProjectInbox({ projectId: "p1" });
    expect(result).toMatchObject({
      ok: true,
      archivedCount: 0,
      canRestore: false,
    });
  });
});
