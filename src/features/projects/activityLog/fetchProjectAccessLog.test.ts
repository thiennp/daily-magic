import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildProjectAccessLogUrl,
  fetchProjectAccessLog,
} from "@/features/projects/activityLog/fetchProjectAccessLog";

const respond = (status: number, body: unknown) =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify(body), { status }),
  );

describe("fetchProjectAccessLog", () => {
  afterEach(() => vi.restoreAllMocks());

  it("builds the owner Access log URL with paging + filter", () => {
    expect(buildProjectAccessLogUrl({ projectId: "p 1" })).toBe("/api/projects/p%201/activity");
    expect(
      buildProjectAccessLogUrl({ projectId: "p", cursor: "abc", limit: 20, category: "wake" }),
    ).toBe("/api/projects/p/activity?limit=20&cursor=abc&category=wake");
  });

  it("returns typed data on 200", async () => {
    const body = { ok: true, projectId: "p", events: [], nextCursor: null, retention: { maxEvents: 500, maxAgeDays: 180 } };
    respond(200, body);
    expect(await fetchProjectAccessLog({ projectId: "p" })).toEqual({ ok: true, data: body });
  });

  it("maps 403 owner_only and 401", async () => {
    respond(403, { ok: false, error: "owner_only" });
    expect(await fetchProjectAccessLog({ projectId: "p" })).toEqual({ ok: false, status: 403, error: "owner_only" });
    respond(401, { error: "Unauthorized" });
    expect(await fetchProjectAccessLog({ projectId: "p" })).toEqual({ ok: false, status: 401, error: "unauthorized" });
  });

  it("never throws on network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    expect(await fetchProjectAccessLog({ projectId: "p" })).toEqual({ ok: false, status: 0, error: "network" });
  });
});
