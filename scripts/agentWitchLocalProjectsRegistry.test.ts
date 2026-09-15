import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  addAgentWitchLocalProjectToRegistry,
  readAgentWitchLocalProjectsRegistry,
} from "./agentWitchLocalProjectsRegistry";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const tempRoots: string[] = [];

const makeLayout = (): AgentWitchLocalLayout => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aw-projects-"));
  tempRoots.push(root);
  return {
    profileEmail: "user@example.com",
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
    harnessRootDir: path.join(root, "harness"),
    harnessManifestPath: path.join(root, "harness", "manifest.json"),
    harnessSetsDir: path.join(root, "harness", "sets"),
  };
};

afterEach(() => {
  for (const root of tempRoots) {
    fs.rmSync(root, { recursive: true, force: true });
  }
  tempRoots.length = 0;
});

describe("agentWitchLocalProjectsRegistry", () => {
  it("adds and reads projects", () => {
    const layout = makeLayout();
    addAgentWitchLocalProjectToRegistry(layout, {
      projectFolderPath: "/Users/me/dev/app",
      name: "My App",
    });

    const projects = readAgentWitchLocalProjectsRegistry(layout);
    expect(projects).toHaveLength(1);
    expect(projects[0]?.name).toBe("My App");
  });
});
