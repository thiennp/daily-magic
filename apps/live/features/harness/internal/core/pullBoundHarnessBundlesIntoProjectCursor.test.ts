import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { pullBoundHarnessBundlesIntoProjectCursor } from "./pullBoundHarnessBundlesIntoProjectCursor";

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const createLayout = (): {
  readonly layout: AgentWitchLocalLayout;
  readonly projectDir: string;
} => {
  const root = fs.mkdtempSync(
    path.join(os.homedir(), ".agent-witch-bound-pull-test-"),
  );
  tempRoots.push(root);
  const projectDir = path.join(root, "repo");
  fs.mkdirSync(projectDir, { recursive: true });
  const harnessRootDir = path.join(root, "harness");

  return {
    projectDir,
    layout: {
      profileEmail: null,
      installDir: root,
      appDir: path.join(root, "app"),
      appBundlePath: path.join(root, "app", "agent-witch.js"),
      projectsDir: path.join(root, "projects"),
      projectDataDir: path.join(root, "project-data"),
      logsDir: path.join(root, "logs"),
      mainLogPath: path.join(root, "logs", "agent-witch.log"),
      errorLogPath: path.join(root, "logs", "agent-witch.error.log"),
      reportsDir: path.join(root, "reports"),
      deviceKeypairPath: path.join(root, "device-keypair.json"),
      configPath: path.join(root, "config.json"),
      harnessRootDir,
      harnessManifestPath: path.join(harnessRootDir, "manifest.json"),
      harnessSetsDir: path.join(harnessRootDir, "sets"),
    },
  };
};

describe("pullBoundHarnessBundlesIntoProjectCursor", () => {
  it("writes a cloud playbook into .cursor when nothing is installed locally (MARKETPLACE-009)", () => {
    const { layout, projectDir } = createLayout();
    const result = pullBoundHarnessBundlesIntoProjectCursor({
      layout,
      projectFolderPath: projectDir,
      bundles: [
        {
          name: "Freelancer client proposal harness",
          slug: "template-freelancer-client-proposal",
          items: [
            {
              id: "scope-rule",
              kind: "rule",
              title: "Scope the proposal",
              content: "# Scope only what the brief asks\n",
              setSlugs: ["template-freelancer-client-proposal"],
            },
          ],
        },
      ],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.writtenFileCount).toBeGreaterThan(0);
    const written = fs
      .readdirSync(path.join(projectDir, ".cursor"), { recursive: true })
      .map((entry) => String(entry));
    expect(written.some((entry) => entry.endsWith(".mdc"))).toBe(true);
  });
});
