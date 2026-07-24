import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  isRemoteAgentWitchBundleVersionNewer,
  readAgentWitchInstallVersion,
  writeAgentWitchInstallVersion,
} from "./agentWitchInstallVersion";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { bootoutAgentWitchAuxiliaryLaunchAgents } from "./bootoutAgentWitchAuxiliaryLaunchAgents";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";
import {
  readActiveProfileEmailFromFile,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";
import { AGENT_WITCH_APP_BUNDLE_FILE_NAME } from "./agentWitchInstallApp.constants";
import {
  appendAgentWitchSelfUpdateLog,
  readAgentWitchSelfUpdateLogs,
} from "./agentWitchSelfUpdateLog";

const AGENT_WITCH_INSTALL_PACKAGE_JSON = `{
  "name": "agent-witch",
  "private": true,
  "type": "module",
  "dependencies": {
    "node-pty": "^1.1.0",
    "ws": "^8.18.3"
  },
  "allowScripts": {
    "fsevents": true,
    "node-pty": true
  }
}
`;

interface RemoteBundleManifest {
  readonly bundleVersion: string;
  readonly scripts: readonly string[];
}

export interface AgentWitchSelfUpdateResult {
  readonly ok: boolean;
  readonly updated: boolean;
  readonly message: string;
  readonly localBundleVersion: string | null;
  readonly remoteBundleVersion: string | null;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfigWsUrl = (installDir: string): string | null => {
  const profileEmail = readActiveProfileEmailFromFile(installDir);
  const layout =
    profileEmail === null
      ? resolveAgentWitchLocalLayout()
      : resolveAgentWitchLocalLayout(profileEmail);

  if (!fs.existsSync(layout.configPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(layout.configPath, "utf8"),
    );
    if (!isRecord(parsed) || typeof parsed.wsUrl !== "string") {
      return null;
    }

    return parsed.wsUrl;
  } catch {
    return null;
  }
};

const fetchRemoteBundleManifest = async (
  appOrigin: string,
): Promise<RemoteBundleManifest | null> => {
  const response = await fetch(`${appOrigin}/install/agent-witch/version`, {
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    return null;
  }

  const payload: unknown = await response.json();
  if (
    !isRecord(payload) ||
    typeof payload.bundleVersion !== "string" ||
    !Array.isArray(payload.scripts)
  ) {
    return null;
  }

  const scripts = payload.scripts.filter(
    (scriptName): scriptName is string => typeof scriptName === "string",
  );

  return {
    bundleVersion: payload.bundleVersion,
    scripts,
  };
};

const downloadInstallBundle = async (
  appOrigin: string,
  installDir: string,
  relativePath: string,
): Promise<void> => {
  const response = await fetch(
    `${appOrigin}/install/agent-witch/${relativePath}`,
    { signal: AbortSignal.timeout(60_000) },
  );

  if (!response.ok) {
    throw new Error(`Failed to download ${relativePath}.`);
  }

  const targetPath = path.join(installDir, relativePath);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, await response.text(), "utf8");
  if (relativePath.endsWith(".js")) {
    fs.chmodSync(targetPath, 0o755);
  }
};

const ensureInstallDependencies = (installDir: string): void => {
  const packageJsonPath = path.join(installDir, "package.json");
  const existingPackageJson = fs.existsSync(packageJsonPath)
    ? fs.readFileSync(packageJsonPath, "utf8")
    : "";
  const packageJsonChanged =
    existingPackageJson !== AGENT_WITCH_INSTALL_PACKAGE_JSON;
  if (packageJsonChanged) {
    fs.writeFileSync(packageJsonPath, AGENT_WITCH_INSTALL_PACKAGE_JSON, "utf8");
  }

  const wsPath = path.join(installDir, "node_modules", "ws", "package.json");
  if (!packageJsonChanged && fs.existsSync(wsPath)) {
    return;
  }

  execFileSync("npm", ["install", "--no-fund", "--no-audit"], {
    cwd: installDir,
    stdio: "pipe",
  });
  try {
    execFileSync("npm", ["approve-scripts", "--allow-scripts-pending"], {
      cwd: installDir,
      stdio: "pipe",
    });
  } catch {
    // approve-scripts is optional on older npm versions
  }
};

const kickstartServicesAfterUpdate = async (): Promise<void> => {
  bootoutAgentWitchAuxiliaryLaunchAgents();
  const targets = listAgentWitchLaunchTargets();
  for (const target of targets) {
    await kickstartAgentWitchLaunchAgent(target.launchAgentLabel);
  }
};

const buildSelfUpdateResult = (
  result: Omit<AgentWitchSelfUpdateResult, "localBundleVersion"> & {
    readonly localBundleVersion?: string | null;
  },
  localBundleVersion: string | null,
): AgentWitchSelfUpdateResult => ({
  localBundleVersion,
  ...result,
});

export const runAgentWitchSelfUpdate = async (input?: {
  readonly force?: boolean;
}): Promise<AgentWitchSelfUpdateResult> => {
  const installDir = resolveAgentWitchInstallDir();
  const localVersion = readAgentWitchInstallVersion(installDir);
  const localBundleVersion = localVersion?.bundleVersion ?? null;
  const wsUrl = readConfigWsUrl(installDir);
  const appOrigin =
    wsUrl === null
      ? (localVersion?.appOrigin ?? null)
      : resolveAgentWitchAppOriginFromWsUrl(wsUrl);

  if (appOrigin === null) {
    const result = buildSelfUpdateResult(
      {
        ok: false,
        updated: false,
        message: "Could not resolve the Agent Witch app origin for updates.",
        remoteBundleVersion: null,
      },
      localBundleVersion,
    );
    appendAgentWitchSelfUpdateLog({
      event: "update_failed",
      ok: false,
      message: result.message,
      localBundleVersion,
      remoteBundleVersion: null,
    });
    return result;
  }

  const manifest = await fetchRemoteBundleManifest(appOrigin);
  if (manifest === null) {
    const result = buildSelfUpdateResult(
      {
        ok: false,
        updated: false,
        message: "Could not fetch the remote Agent Witch install bundle.",
        remoteBundleVersion: null,
      },
      localBundleVersion,
    );
    appendAgentWitchSelfUpdateLog({
      event: "update_failed",
      ok: false,
      message: result.message,
      localBundleVersion,
      remoteBundleVersion: null,
    });
    return result;
  }

  const needsUpdate =
    input?.force === true ||
    isRemoteAgentWitchBundleVersionNewer(
      localBundleVersion,
      manifest.bundleVersion,
    );

  if (!needsUpdate) {
    const result = buildSelfUpdateResult(
      {
        ok: true,
        updated: false,
        message: "Install bundle is up to date.",
        remoteBundleVersion: manifest.bundleVersion,
      },
      localBundleVersion,
    );
    appendAgentWitchSelfUpdateLog({
      event: "check_complete",
      ok: true,
      message: result.message,
      localBundleVersion,
      remoteBundleVersion: manifest.bundleVersion,
    });
    return result;
  }

  try {
    for (const artifactPath of manifest.scripts) {
      await downloadInstallBundle(appOrigin, installDir, artifactPath);
    }

    const legacyBundlePath = path.join(
      installDir,
      AGENT_WITCH_APP_BUNDLE_FILE_NAME,
    );
    if (fs.existsSync(legacyBundlePath)) {
      fs.rmSync(legacyBundlePath, { force: true });
    }

    ensureInstallDependencies(installDir);
    writeAgentWitchInstallVersion({
      bundleVersion: manifest.bundleVersion,
      appOrigin,
      updatedAt: new Date().toISOString(),
    });
    await kickstartServicesAfterUpdate();

    const result = buildSelfUpdateResult(
      {
        ok: true,
        updated: true,
        message: `Updated Agent Witch bundle ${localBundleVersion ?? "unknown"} -> ${manifest.bundleVersion}.`,
        remoteBundleVersion: manifest.bundleVersion,
      },
      manifest.bundleVersion,
    );
    appendAgentWitchSelfUpdateLog({
      event: "update_applied",
      ok: true,
      message: result.message,
      localBundleVersion,
      remoteBundleVersion: manifest.bundleVersion,
    });
    return result;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Agent Witch self-update failed.";
    const result = buildSelfUpdateResult(
      {
        ok: false,
        updated: false,
        message,
        remoteBundleVersion: manifest.bundleVersion,
      },
      localBundleVersion,
    );
    appendAgentWitchSelfUpdateLog({
      event: "update_failed",
      ok: false,
      message,
      localBundleVersion,
      remoteBundleVersion: manifest.bundleVersion,
    });
    return result;
  }
};

export const buildAgentWitchSelfUpdateStatus = (): {
  readonly local: ReturnType<typeof readAgentWitchInstallVersion>;
  readonly logs: ReturnType<typeof readAgentWitchSelfUpdateLogs>;
} => {
  const installDir = resolveAgentWitchInstallDir();
  return {
    local: readAgentWitchInstallVersion(installDir),
    logs: readAgentWitchSelfUpdateLogs(20, installDir),
  };
};
