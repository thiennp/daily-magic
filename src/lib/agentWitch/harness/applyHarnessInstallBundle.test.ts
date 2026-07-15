import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import applyHarnessInstallBundle from "./applyHarnessInstallBundle";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("applyHarnessInstallBundle", () => {
  it("writes shared item files and manifest.json under the harness root", () => {
    const harnessRootDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "harness-install-"),
    );
    tempDirs.push(harnessRootDir);

    const manifestPath = path.join(harnessRootDir, "manifest.json");
    const result = applyHarnessInstallBundle({
      harnessRootDir,
      harnessManifestPath: manifestPath,
      hostname: "test-mac",
      bundle: {
        name: "Assistant bundle",
        slug: "assistant",
        items: [
          {
            id: "rule-1",
            kind: "rule",
            title: "Prefer Const",
            content: "Prefer const.",
            setSlugs: ["assistant"],
          },
        ],
      },
    });

    expect(result).toEqual({ ok: true, writtenItemCount: 1 });
    expect(
      fs.readFileSync(
        path.join(harnessRootDir, "shared/items/rule-1/rules/prefer-const.mdc"),
        "utf8",
      ),
    ).toBe("Prefer const.");

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
      activeSetSlugs: string[];
    };
    expect(manifest.activeSetSlugs).toEqual(["assistant"]);
  });
});
