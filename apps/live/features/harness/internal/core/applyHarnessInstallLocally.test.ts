import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { applyHarnessInstallLocally } from "./applyHarnessInstallLocally";

describe("applyHarnessInstallLocally", () => {
  it("writes harness files and manifest", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "aw-harness-"));
    const layout = {
      profileEmail: null,
      installDir: root,
      appDir: root,
      appBundlePath: root,
      harnessRootDir: path.join(root, "harness"),
      harnessManifestPath: path.join(root, "harness", "manifest.json"),
      harnessSetsDir: path.join(root, "harness", "sets"),
      configPath: path.join(root, "config.json"),
      logsDir: path.join(root, "logs"),
      projectsDir: path.join(root, "projects"),
      reportsDir: path.join(root, "reports"),
      deviceKeypairPath: path.join(root, "device.json"),
      mainLogPath: path.join(root, "logs", "main.log"),
      errorLogPath: path.join(root, "logs", "error.log"),
    };

    const result = applyHarnessInstallLocally({
      layout,
      bundle: {
        name: "Demo",
        slug: "demo",
        items: [
          {
            id: "item-1",
            kind: "rule",
            title: "Demo rule",
            content: "Hello harness.",
            setSlugs: ["demo"],
          },
        ],
      },
    });

    expect(result.ok).toBe(true);
    expect(fs.existsSync(layout.harnessManifestPath)).toBe(true);
    const manifest = JSON.parse(
      fs.readFileSync(layout.harnessManifestPath, "utf8"),
    ) as { sets: Record<string, unknown> };
    expect(manifest.sets.demo).toBeDefined();
  });
});
