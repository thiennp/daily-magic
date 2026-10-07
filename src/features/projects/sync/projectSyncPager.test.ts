import { describe, expect, it } from "vitest";

import {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
} from "@/features/projects/sync/projectSync.types";
import {
  loadPage,
  mergeProjectSyncEntries,
} from "@/features/projects/sync/projectSyncPager";

type Entry = { readonly id: string; readonly createdAt: string; readonly src: string };

const entry = (id: string, createdAt: string, src: string): Entry => ({
  id,
  createdAt,
  src,
});

const encodeCursor = (c: { t: string; id: string }): string =>
  Buffer.from(JSON.stringify(c), "utf8").toString("base64url");

describe("mergeProjectSyncEntries / loadPage", () => {
  it("prefers local over neon over idb on the same key", () => {
    const merged = mergeProjectSyncEntries({
      idbEntries: [entry("a", "2026-10-07T01:00:00.000Z", "idb")],
      neonEntries: [entry("a", "2026-10-07T01:00:00.000Z", "neon")],
      localEntries: [entry("a", "2026-10-07T01:00:00.000Z", "local")],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged).toHaveLength(1);
    expect(merged[0]?.src).toBe("local");
  });

  it("prefers neon over idb when local absent", () => {
    const merged = mergeProjectSyncEntries({
      idbEntries: [entry("a", "2026-10-07T01:00:00.000Z", "idb")],
      neonEntries: [entry("a", "2026-10-07T01:00:00.000Z", "neon")],
      localEntries: [],
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
    });
    expect(merged[0]?.src).toBe("neon");
  });

  it("sorts newest-first by createdAt then id", () => {
    const result = loadPage({
      idbEntries: [entry("a", "2026-10-07T01:00:00.000Z", "idb")],
      localEntries: [entry("c", "2026-10-07T03:00:00.000Z", "local")],
      localHasMore: false,
      neonEntries: [entry("b", "2026-10-07T02:00:00.000Z", "neon")],
      neonHasMore: false,
      localLive: true,
      beforeRequested: false,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor,
    });
    expect(result.entries.map((e) => e.id)).toEqual(["c", "b", "a"]);
    expect(result.page.source).toBe("mixed");
  });

  it("marks source idb when only idb contributes", () => {
    const result = loadPage({
      idbEntries: [entry("a", "2026-10-07T01:00:00.000Z", "idb")],
      localEntries: [],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: false,
      beforeRequested: false,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor,
    });
    expect(result.page.source).toBe("idb");
  });

  it("errors when load-older is empty and computer offline", () => {
    const result = loadPage({
      idbEntries: [],
      localEntries: [],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor,
    });
    expect(result.error).toEqual(PROJECT_SYNC_COMPUTER_OFFLINE_ERROR);
    expect(result.error?.message).toBe(
      "Connection to the project computer was lost.",
    );
    expect(result.error?.code).toBe("project_computer_offline");
    expect(result.page.source).toBe("exhausted");
  });

  it("does not error on empty first page", () => {
    const result = loadPage({
      idbEntries: [],
      localEntries: [],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: false,
      beforeRequested: false,
      limit: 50,
      keyOf: (e) => e.id,
      createdAtOf: (e) => e.createdAt,
      encodeCursor,
    });
    expect(result.error).toBeUndefined();
    expect(result.page.source).toBe("exhausted");
  });
});
