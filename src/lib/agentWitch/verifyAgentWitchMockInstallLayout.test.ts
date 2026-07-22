import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

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
  ])(
    "AGENT-058: %s script downloads every dependency required by local entry points",
    (_label, installScript) => {
      const issues = findAgentWitchMockInstallLayoutIssues({
        installBashScript: installScript,
      });

      expect(issues).toEqual([]);
    },
  );

  it("AGENT-058: flags missing wake helpers that would crash revive on a real Mac", () => {
    const installScript = renderInstallAgentWitchScript(
      "https://www.agentwitch.com",
    );
    const downloadedScripts =
      extractAgentWitchInstallDownloadTargets(installScript);
    const incompleteDownloads = [...downloadedScripts].filter(
      (scriptName) => scriptName !== "verifyAgentWitchReviveAfterKickstart.ts",
    );

    const issues = findAgentWitchMockInstallLayoutIssues({
      installBashScript: incompleteDownloads
        .map((scriptName) => `-o "\${INSTALL_DIR}/${scriptName}"`)
        .join("\n"),
    });

    expect(issues).toContainEqual({
      entryPoint: "agent-witch-watchdog.ts",
      missingDependency: "verifyAgentWitchReviveAfterKickstart.ts",
    });
  });

  it("materializes a mock ~/.agent-witch layout on disk before shipping", () => {
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
      entryPoints: ["agent-witch-watchdog.ts", "agent-witch-wake-cli.ts"],
      readSource: (scriptName) =>
        fs.readFileSync(path.join(installDir, scriptName), "utf8"),
    });

    expect(onDiskIssues).toEqual([]);
    expect(
      fs.existsSync(
        path.join(installDir, "verifyAgentWitchReviveAfterKickstart.ts"),
      ),
    ).toBe(true);
  });
});
