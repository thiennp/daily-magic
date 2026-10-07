import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  joinProjectHistoryOffPurgeTarget,
  listProjectHistoryOffPurgeTargetPaths,
  resolveProjectHistoryOffPurgeTargets,
} from "./projectHistoryOffPurgeTargets";

describe("joinProjectHistoryOffPurgeTarget", () => {
  const root = path.join(path.sep, "tmp", "project-data", "p1");

  it("joins a non-empty segment under the project data dir", () => {
    expect(joinProjectHistoryOffPurgeTarget(root, "skillgen")).toBe(
      path.join(root, "skillgen"),
    );
  });

  it("joins nested non-empty segments", () => {
    expect(joinProjectHistoryOffPurgeTarget(root, "skills", "_drafts")).toBe(
      path.join(root, "skills", "_drafts"),
    );
  });

  it("rejects an empty segment so it cannot become the project data dir", () => {
    expect(() => joinProjectHistoryOffPurgeTarget(root, "")).toThrow(
      "empty_purge_path_segment",
    );
  });

  it("rejects a whitespace-only segment", () => {
    expect(() => joinProjectHistoryOffPurgeTarget(root, "   ")).toThrow(
      "empty_purge_path_segment",
    );
    expect(() => joinProjectHistoryOffPurgeTarget(root, "\t")).toThrow(
      "empty_purge_path_segment",
    );
  });

  it("rejects empty among otherwise valid segments", () => {
    expect(() =>
      joinProjectHistoryOffPurgeTarget(root, "skills", ""),
    ).toThrow("empty_purge_path_segment");
    expect(() =>
      joinProjectHistoryOffPurgeTarget(root, "", "_drafts"),
    ).toThrow("empty_purge_path_segment");
  });

  it("never returns the project data dir as a delete target", () => {
    // Empty segment would have collapsed via path.join(root, "") === root.
    expect(() => joinProjectHistoryOffPurgeTarget(root, "")).toThrow(
      "empty_purge_path_segment",
    );
    const targets = listProjectHistoryOffPurgeTargetPaths(root);
    for (const target of targets) {
      expect(target).not.toBe(root);
      expect(path.resolve(target)).not.toBe(path.resolve(root));
      expect(target.startsWith(root + path.sep)).toBe(true);
    }
  });
});

describe("resolveProjectHistoryOffPurgeTargets", () => {
  it("resolves learning-only targets strictly under the project data dir", () => {
    const root = path.join(path.sep, "data", "proj");
    const targets = resolveProjectHistoryOffPurgeTargets(root);
    expect(targets).toEqual({
      drafts: path.join(root, "skills", "_drafts"),
      skillgen: path.join(root, "skillgen"),
      outcomes: path.join(root, "outcomes"),
    });
    for (const target of Object.values(targets)) {
      expect(target).not.toBe(root);
      expect(target.startsWith(root + path.sep)).toBe(true);
    }
  });
});
