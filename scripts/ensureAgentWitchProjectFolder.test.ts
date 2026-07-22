import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_PROJECT_META_DIR_NAME } from "@/lib/projects/agentWitchProjectStorage.constants";
import { ensureAgentWitchProjectFolder } from "./ensureAgentWitchProjectFolder";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

describe("ensureAgentWitchProjectFolder", () => {
  it("creates project storage directories and metadata", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-project-"));
    tempDirs.push(tempDir);
    const projectFolderPath = path.join(tempDir, "my-app");

    const result = ensureAgentWitchProjectFolder({
      projectFolderPath,
      projectId: "project-1",
      projectName: "My App",
    });

    expect(result.ok).toBe(true);
    expect(
      fs.existsSync(
        path.join(projectFolderPath, AGENT_WITCH_PROJECT_META_DIR_NAME, "rag"),
      ),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(
          projectFolderPath,
          AGENT_WITCH_PROJECT_META_DIR_NAME,
          "memory",
        ),
      ),
    ).toBe(true);
    expect(
      fs.existsSync(
        path.join(
          projectFolderPath,
          AGENT_WITCH_PROJECT_META_DIR_NAME,
          "project.json",
        ),
      ),
    ).toBe(true);
  });
});
