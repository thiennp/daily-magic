import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { readAgentWitchInstallVersion } from "./agentWitchInstallVersion";
import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";
import {
  readActiveProfileEmailFromFile,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";

const execFileAsync = promisify(execFile);

export interface ReinstallAgentWitchFromInstallScriptResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfigIdentity = (
  installDir: string,
): {
  readonly wsUrl: string;
  readonly pairingToken: string;
  readonly email?: string;
} | null => {
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
    if (
      !isRecord(parsed) ||
      typeof parsed.wsUrl !== "string" ||
      typeof parsed.pairingToken !== "string" ||
      parsed.pairingToken.trim().length === 0
    ) {
      return null;
    }

    return {
      wsUrl: parsed.wsUrl,
      pairingToken: parsed.pairingToken.trim(),
      email:
        typeof parsed.email === "string" && parsed.email.trim().length > 0
          ? parsed.email.trim().toLowerCase()
          : (profileEmail ?? undefined),
    };
  } catch {
    return null;
  }
};

const readConfigWsUrl = (installDir: string): string | null =>
  readConfigIdentity(installDir)?.wsUrl ?? null;

const resolveInstallAppOrigin = (installDir: string): string | null => {
  const wsUrl = readConfigWsUrl(installDir);
  if (wsUrl !== null) {
    return resolveAgentWitchAppOriginFromWsUrl(wsUrl);
  }

  return readAgentWitchInstallVersion(installDir)?.appOrigin ?? null;
};

export const reinstallAgentWitchFromInstallScript = async (input?: {
  readonly installDir?: string;
  readonly profileEmail?: string | null;
}): Promise<ReinstallAgentWitchFromInstallScriptResult> => {
  const installDir = input?.installDir ?? resolveAgentWitchInstallDir();
  const configIdentity = readConfigIdentity(installDir);
  const appOrigin =
    configIdentity !== null
      ? resolveAgentWitchAppOriginFromWsUrl(configIdentity.wsUrl)
      : resolveInstallAppOrigin(installDir);

  if (appOrigin === null || configIdentity === null) {
    return {
      ok: false,
      errorMessage:
        "Could not resolve the linked Mac identity for reinstall. Run the install command from Home first.",
    };
  }

  const installScriptUrl = new URL(`${appOrigin}/install/agent-witch.sh`);
  installScriptUrl.searchParams.set("token", configIdentity.pairingToken);
  if (configIdentity.email !== undefined) {
    installScriptUrl.searchParams.set("email", configIdentity.email);
  }
  const response = await fetch(installScriptUrl.toString(), {
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    return {
      ok: false,
      errorMessage: `Failed to download install script (${response.status}).`,
    };
  }

  const tempScriptPath = path.join(
    os.tmpdir(),
    `agent-witch-reinstall-${process.pid}-${Date.now()}.sh`,
  );

  try {
    fs.writeFileSync(tempScriptPath, await response.text(), {
      encoding: "utf8",
      mode: 0o700,
    });

    const profileEmail =
      input?.profileEmail ?? readActiveProfileEmailFromFile(installDir);
    const env = {
      ...process.env,
      AGENT_WITCH_SKIP_OPEN_HOME: "1",
      AGENT_WITCH_WATCHDOG_REINSTALL: "1",
      ...(profileEmail === null ? {} : { AGENT_WITCH_PROFILE: profileEmail }),
    };

    await execFileAsync("bash", [tempScriptPath], {
      env,
      timeout: 180_000,
      maxBuffer: 4 * 1024 * 1024,
    });

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "Agent Witch reinstall script failed.",
    };
  } finally {
    if (fs.existsSync(tempScriptPath)) {
      fs.unlinkSync(tempScriptPath);
    }
  }
};
