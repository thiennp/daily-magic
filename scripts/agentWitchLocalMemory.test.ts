import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME } from "@/lib/projects/agentWitchProjectStorage.constants";
import {
  appendAgentWitchMemoryEntry,
  readAgentWitchMemoryEntries,
} from "./agentWitchLocalMemory";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import {
  AGENT_WITCH_APP_BUNDLE_FILE_NAME,
  AGENT_WITCH_APP_DIR_NAME,
} from "./agentWitchInstallApp.constants";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("agentWitchLocalMemory", () => {
  it("appends and reads project memory entries", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-memory-"));
    tempDirs.push(tempDir);
    const installDir = tempDir;
    const layout: AgentWitchLocalLayout = {
      installDir,
      appDir: path.join(installDir, AGENT_WITCH_APP_DIR_NAME),
      appBundlePath: path.join(
        installDir,
        AGENT_WITCH_APP_DIR_NAME,
        AGENT_WITCH_APP_BUNDLE_FILE_NAME,
      ),
      profileEmail: null,
      configPath: path.join(installDir, "config.json"),
      harnessRootDir: path.join(installDir, "harness"),
      harnessManifestPath: path.join(installDir, "harness", "manifest.json"),
      harnessSetsDir: path.join(installDir, "harness", "sets"),
      projectsDir: path.join(installDir, "projects"),
      logsDir: path.join(installDir, "logs"),
    };
    const projectFolderPath = path.join(tempDir, "project");

    appendAgentWitchMemoryEntry({
      layout,
      projectFolderPath,
      entry: {
        id: "memory-1",
        prompt: "Summarize the repo",
        output: "Done.",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    });

    const entries = readAgentWitchMemoryEntries(layout, projectFolderPath);

    expect(entries).toHaveLength(1);
    expect(entries[0]?.prompt).toBe("Summarize the repo");
    expect(
      fs.existsSync(
        path.join(
          projectFolderPath,
          ".agent-witch",
          "memory",
          AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME,
        ),
      ),
    ).toBe(true);
  });
});
