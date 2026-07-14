import fs from "node:fs";
import path from "node:path";

import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

export const AGENT_WITCH_INSTALL_VERSION_FILE_NAME = "install-version.json";

export interface AgentWitchInstallVersionRecord {
  readonly bundleVersion: string;
  readonly appOrigin: string;
  readonly updatedAt: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const resolveAgentWitchInstallVersionPath = (
  installDir: string = resolveAgentWitchInstallDir(),
): string => path.join(installDir, AGENT_WITCH_INSTALL_VERSION_FILE_NAME);

export const readAgentWitchInstallVersion = (
  installDir: string = resolveAgentWitchInstallDir(),
): AgentWitchInstallVersionRecord | null => {
  const versionPath = resolveAgentWitchInstallVersionPath(installDir);
  if (!fs.existsSync(versionPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(versionPath, "utf8"));
    if (
      !isRecord(parsed) ||
      typeof parsed.bundleVersion !== "string" ||
      typeof parsed.appOrigin !== "string" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }

    return {
      bundleVersion: parsed.bundleVersion,
      appOrigin: parsed.appOrigin,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return null;
  }
};

export const writeAgentWitchInstallVersion = (
  record: AgentWitchInstallVersionRecord,
  installDir: string = resolveAgentWitchInstallDir(),
): void => {
  const versionPath = resolveAgentWitchInstallVersionPath(installDir);
  fs.mkdirSync(path.dirname(versionPath), { recursive: true });
  fs.writeFileSync(versionPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
};

export const isRemoteAgentWitchBundleVersionNewer = (
  localVersion: string | null,
  remoteVersion: string,
): boolean => {
  if (localVersion === null) {
    return true;
  }

  const localNumber = Number.parseInt(localVersion, 10);
  const remoteNumber = Number.parseInt(remoteVersion, 10);
  if (Number.isFinite(localNumber) && Number.isFinite(remoteNumber)) {
    return remoteNumber > localNumber;
  }

  return localVersion !== remoteVersion;
};
