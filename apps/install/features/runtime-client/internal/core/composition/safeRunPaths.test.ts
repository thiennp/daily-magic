import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import materializeRunScopedCompositionOverlay from "./materializeRunScopedCompositionOverlay";
import removeRunCompositionOverlay from "./removeRunCompositionOverlay";
import resolveComponentStoreBlobPath from "./resolveComponentStoreBlobPath";
import { isSafeRunId, isSha256Hex, resolveInside } from "./safeRunPaths";

const SHA = "a".repeat(64);

describe("safe run paths", () => {
  it("accepts plain ids and hashes only", () => {
    expect(isSafeRunId("0f8c2a1e-7b1d-4c2a-9d31-aaaaaaaaaaaa")).toBe(true);
    for (const bad of ["../..", "a/b", "", "a b", "x".repeat(101)]) {
      expect(isSafeRunId(bad)).toBe(false);
    }
    expect(isSha256Hex(SHA)).toBe(true);
    expect(isSha256Hex("../../../../.ssh/id_rsa")).toBe(false);
  });

  it("keeps a path inside its root", () => {
    expect(resolveInside("/r", "a/b.md")).toBe(path.resolve("/r/a/b.md"));
    expect(resolveInside("/r", "../x")).toBeNull();
    expect(resolveInside("/r", "a/../../x")).toBeNull();
  });

  it("a hash that is not hex never names a real file", () => {
    const blob = resolveComponentStoreBlobPath("/i", "../../../../etc/passwd");
    expect(blob).toBe(path.join("/i", "components", "store", "invalid-hash"));
  });

  it("refuses a run id or component path that would leave the run folder", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-overlay-"));
    const layout = { installDir } as never;
    const blob = path.join(installDir, "components", "store", "aa", SHA);
    fs.mkdirSync(path.dirname(blob), { recursive: true });
    fs.writeFileSync(blob, "x");
    const snapshot = (relativePath: string) =>
      ({
        entries: [
          {
            scope: "run",
            items: [{ contentSha256: SHA, relativePath, itemKey: "k" }],
          },
        ],
      }) as never;
    expect(
      materializeRunScopedCompositionOverlay(
        layout,
        "../../x",
        snapshot("a.md"),
      ),
    ).toMatchObject({ ok: false });
    expect(
      materializeRunScopedCompositionOverlay(
        layout,
        "run1",
        snapshot("../../../escape.md"),
      ),
    ).toMatchObject({ ok: false });
    expect(fs.existsSync(path.join(installDir, "..", "escape.md"))).toBe(false);
    expect(
      materializeRunScopedCompositionOverlay(
        layout,
        "run1",
        snapshot("skills/a.md"),
      ),
    ).toEqual({ ok: true });
    // an unsafe id deletes nothing
    removeRunCompositionOverlay(layout, "..");
    expect(fs.existsSync(path.join(installDir, "components"))).toBe(true);
    removeRunCompositionOverlay(layout, "run1");
    expect(fs.existsSync(path.join(installDir, "runs", "run1"))).toBe(false);
  });
});
