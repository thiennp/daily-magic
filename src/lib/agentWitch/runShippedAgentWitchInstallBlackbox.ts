import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { AGENT_WITCH_LOCAL_INSTALL_ENTRY_POINTS } from "@/lib/agentWitch/agentWitchLocalInstallEntryPoints.constant";
import { extractAgentWitchInstallDownloadTargets } from "@/lib/agentWitch/extractAgentWitchInstallDownloadTargets";
import {
  fetchShippedAgentWitchInstallScripts,
  readShippedAgentWitchInstallScript,
} from "@/lib/agentWitch/fetchShippedAgentWitchInstallScripts";
import {
  findAgentWitchMockInstallLayoutIssues,
  materializeAgentWitchMockInstall,
  verifyAgentWitchMockInstallOnDisk,
} from "@/lib/agentWitch/verifyAgentWitchMockInstallLayout";
import { verifyShippedAgentWitchInstallModuleLoads } from "@/lib/agentWitch/verifyShippedAgentWitchInstallModuleLoads";

export type ShippedInstallBlackboxResult = {
  readonly bundleVersion: string;
  readonly downloadedScriptCount: number;
  readonly materializedScriptCount: number;
};

const readInstallBundleVersion = async (baseUrl: string): Promise<string> => {
  const response = await fetch(`${baseUrl}/install/agent-witch/version`);
  if (!response.ok) {
    throw new Error(`install version endpoint failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    readonly bundleVersion?: string;
  };
  const bundleVersion = payload.bundleVersion;
  if (bundleVersion === undefined || bundleVersion.length === 0) {
    throw new Error("install version endpoint did not return bundleVersion");
  }

  return bundleVersion;
};

const readUpdateInstallScript = async (baseUrl: string): Promise<string> => {
  const response = await fetch(`${baseUrl}/install/agent-witch-update.sh`);
  if (!response.ok) {
    throw new Error(`install update script failed with ${response.status}`);
  }

  return response.text();
};

export const runShippedAgentWitchInstallBlackbox = async (
  baseUrl: string,
): Promise<ShippedInstallBlackboxResult> => {
  const origin = baseUrl.replace(/\/$/, "");
  const bundleVersion = await readInstallBundleVersion(origin);
  const updateScript = await readUpdateInstallScript(origin);
  const layoutIssues = findAgentWitchMockInstallLayoutIssues({
    installBashScript: updateScript,
  });
  if (layoutIssues.length > 0) {
    throw new Error(
      `install script is missing shipped dependencies: ${JSON.stringify(layoutIssues)}`,
    );
  }

  const shippedScripts = await fetchShippedAgentWitchInstallScripts({
    baseUrl: origin,
    scriptNames: extractAgentWitchInstallDownloadTargets(updateScript),
  });
  const installDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "agent-witch-shipped-install-"),
  );

  try {
    materializeAgentWitchMockInstall({
      installDir,
      scriptNames: shippedScripts.keys(),
      readSource: (scriptName) =>
        readShippedAgentWitchInstallScript(shippedScripts, scriptName),
    });

    const onDiskIssues = verifyAgentWitchMockInstallOnDisk({
      installDir,
      entryPoints: [...AGENT_WITCH_LOCAL_INSTALL_ENTRY_POINTS],
      readSource: (scriptName) =>
        readShippedAgentWitchInstallScript(shippedScripts, scriptName),
    });
    if (onDiskIssues.length > 0) {
      throw new Error(
        `shipped install layout is incomplete on disk: ${JSON.stringify(onDiskIssues)}`,
      );
    }

    verifyShippedAgentWitchInstallModuleLoads({
      installDir,
      scriptName: "verifyAgentWitchReviveAfterKickstart.ts",
    });
    verifyShippedAgentWitchInstallModuleLoads({
      installDir,
      scriptName: "reviveAgentWitchWebSocket.ts",
    });

    return {
      bundleVersion,
      downloadedScriptCount: shippedScripts.size,
      materializedScriptCount: shippedScripts.size,
    };
  } finally {
    fs.rmSync(installDir, { recursive: true, force: true });
  }
};
