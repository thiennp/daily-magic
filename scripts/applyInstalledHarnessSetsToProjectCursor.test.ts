import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { applyInstalledHarnessSetsToProjectCursor } from "./applyInstalledHarnessSetsToProjectCursor";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const createHarnessLayout = (): {
  readonly layout: AgentWitchLocalLayout;
  readonly projectDir: string;
} => {
  const root = fs.mkdtempSync(
    path.join(os.homedir(), ".agent-witch-harness-apply-test-"),
  );
  tempRoots.push(root);

  const harnessRootDir = path.join(root, "harness");
  const harnessSetsDir = path.join(harnessRootDir, "sets");
  const harnessManifestPath = path.join(harnessRootDir, "manifest.json");
  const itemRelativePath = "shared/items/rule-1/rules/demo.mdc";
  const itemAbsolutePath = path.join(harnessRootDir, itemRelativePath);
  fs.mkdirSync(path.dirname(itemAbsolutePath), { recursive: true });
  fs.writeFileSync(itemAbsolutePath, "# demo rule\n");

  const manifest = {
    version: 1,
    hostname: "test",
    updatedAt: new Date().toISOString(),
    activeSetSlugs: ["demo"],
    sets: {
      demo: {
        slug: "demo",
        name: "Demo set",
        version: 1,
        updatedAt: new Date().toISOString(),
        items: [
          {
            id: "rule-1",
            kind: "rule",
            title: "Demo rule",
            path: itemRelativePath,
          },
        ],
      },
    },
  };
  fs.writeFileSync(
    harnessManifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  const projectDir = path.join(root, "my-repo");
  fs.mkdirSync(projectDir, { recursive: true });

  const layout: AgentWitchLocalLayout = {
    profileEmail: null,
    installDir: root,
    appDir: path.join(root, AGENT_WITCH_APP_DIR_NAME),
    appBundlePath: path.join(
      root,
      AGENT_WITCH_APP_DIR_NAME,
      AGENT_WITCH_APP_BUNDLE_FILE_NAME,
    ),
    projectsDir: path.join(root, "projects"),
    logsDir: path.join(root, "logs"),
    mainLogPath: path.join(root, "logs", "agent-witch.log"),
    errorLogPath: path.join(root, "logs", "agent-witch.error.log"),
    reportsDir: path.join(root, "reports"),
    deviceKeypairPath: path.join(root, "device-keypair.json"),
    configPath: path.join(root, "config.json"),
    harnessRootDir,
    harnessManifestPath,
    harnessSetsDir,
  };

  return { layout, projectDir };
};

describe("applyInstalledHarnessSetsToProjectCursor", () => {
  it("copies harness files into project .cursor and records link meta", () => {
    const { layout, projectDir } = createHarnessLayout();

    const result = applyInstalledHarnessSetsToProjectCursor({
      layout,
      projectFolderPath: projectDir,
      setSlugs: ["demo"],
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error(result.errorMessage);
    }

    expect(result.writtenFileCount).toBe(1);
    const cursorRulePath = path.join(
      projectDir,
      ".cursor",
      "rules",
      "demo.mdc",
    );
    expect(fs.readFileSync(cursorRulePath, "utf8")).toContain("# demo rule");

    const metaPath = path.join(projectDir, ".agent-witch", "project.json");
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as {
      harnessSetSlugs?: string[];
    };
    expect(meta.harnessSetSlugs).toEqual(["demo"]);
  });
});
