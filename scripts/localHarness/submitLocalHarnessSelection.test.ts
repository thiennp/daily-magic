import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { AgentWitchLocalLayout } from "../resolveAgentWitchLocalLayout";
import { submitLocalHarnessSelection } from "./submitLocalHarnessSelection";

const buildTempLayout = (root: string): AgentWitchLocalLayout => {
  const harnessRootDir = path.join(root, "harness");
  return {
    profileEmail: "test@example.com",
    installDir: root,
    appDir: path.join(root, "app"),
    appBundlePath: path.join(root, "app", "agent-witch.js"),
    projectsDir: path.join(root, "projects"),
    logsDir: path.join(root, "logs"),
    mainLogPath: path.join(root, "logs", "agent-witch.log"),
    errorLogPath: path.join(root, "logs", "agent-witch.error.log"),
    reportsDir: path.join(root, "reports"),
    deviceKeypairPath: path.join(root, "device-keypair.json"),
    configPath: path.join(root, "config.json"),
    harnessRootDir,
    harnessManifestPath: path.join(harnessRootDir, "manifest.json"),
    harnessSetsDir: path.join(harnessRootDir, "sets"),
  };
};

describe("submitLocalHarnessSelection", () => {
  it("AGENT-066: writes manifest and shared items for included selections", () => {
    const tempRoot = fs.mkdtempSync(
      path.join(os.homedir(), ".agent-witch-test-submit-"),
    );
    const sourceFile = path.join(tempRoot, "demo-rule.mdc");
    fs.writeFileSync(sourceFile, "rule body");

    const layout = buildTempLayout(tempRoot);
    const result = submitLocalHarnessSelection({
      layout,
      hostname: "test-host",
      sets: [
        {
          slug: "demo-set",
          name: "Demo Set",
          items: [
            {
              id: "local-demo",
              kind: "rule",
              title: "Demo Rule",
              sourcePath: sourceFile,
              include: true,
            },
          ],
        },
      ],
    });

    expect(result.ok).toBe(true);
    expect(fs.existsSync(layout.harnessManifestPath)).toBe(true);
    const manifest = JSON.parse(
      fs.readFileSync(layout.harnessManifestPath, "utf8"),
    ) as { sets: Record<string, { items: unknown[] }> };
    expect(manifest.sets["demo-set"]?.items.length).toBe(1);
    expect(
      fs.existsSync(
        path.join(
          layout.harnessRootDir,
          "shared/items/local-demo/rules/demo-rule.mdc",
        ),
      ),
    ).toBe(true);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });
});
