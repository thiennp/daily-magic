import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";
import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";
import { extractAgentWitchInstallDownloadTargets } from "@/lib/agentWitch/extractAgentWitchInstallDownloadTargets";
import {
  findAgentWitchMockInstallLayoutIssues,
  materializeAgentWitchMockInstall,
  verifyAgentWitchMockInstallOnDisk,
} from "@/lib/agentWitch/verifyAgentWitchMockInstallLayout";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const createTempInstallDir = (): string => {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "agent-witch-mock-install-"),
  );
  tempDirs.push(tempDir);
  return tempDir;
};

describe("verifyAgentWitchMockInstallLayout", () => {
  it.each([
    [
      "fresh install",
      renderInstallAgentWitchScript("https://www.agentwitch.com"),
    ],
    ["local update", renderUpdateAgentWitchScript("http://localhost:3000")],
  ])("%s script downloads the bundled Mac client", (_label, installScript) => {
    const issues = findAgentWitchMockInstallLayoutIssues({
      installBashScript: installScript,
    });

    expect(issues).toEqual([]);
  });

  it("flags a missing bundled client download", () => {
    const issues = findAgentWitchMockInstallLayoutIssues({
      installBashScript: '-o "${INSTALL_DIR}/run.sh"',
    });

    expect(issues).toContainEqual({
      entryPoint: AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath,
      missingDependency: AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath,
    });
  });

  it("materializes a mock ~/.agent-witch/app layout on disk before shipping", () => {
    const installScript = renderInstallAgentWitchScript(
      "https://www.agentwitch.com",
    );
    const downloadedScripts =
      extractAgentWitchInstallDownloadTargets(installScript);
    const installDir = createTempInstallDir();

    materializeAgentWitchMockInstall({
      installDir,
      scriptNames: downloadedScripts,
    });

    const onDiskIssues = verifyAgentWitchMockInstallOnDisk({
      installDir,
      entryPoints: [AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath],
    });

    expect(onDiskIssues).toEqual([]);
    expect(
      fs.existsSync(
        path.join(installDir, AGENT_WITCH_INSTALL_BUNDLE_ARTIFACT.relativePath),
      ),
    ).toBe(true);
  });
});
