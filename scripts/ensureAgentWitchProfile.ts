import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_ACTIVE_PROFILE_FILE_NAME,
  AGENT_WITCH_PROFILES_DIR_NAME,
  readActiveProfileEmailFromFile,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
  sanitizeProfileEmailForLaunchAgentLabel,
} from "./resolveAgentWitchLocalLayout";

interface AgentWitchConfigShape {
  readonly email?: string;
  readonly wsUrl: string;
  readonly workspace?: string;
  readonly claudeCommand?: string;
  readonly codexCommand?: string;
  readonly pairingToken: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readConfigShape = (filePath: string): AgentWitchConfigShape | null => {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (
      !isRecord(parsed) ||
      typeof parsed.wsUrl !== "string" ||
      typeof parsed.pairingToken !== "string"
    ) {
      return null;
    }

    return {
      email: typeof parsed.email === "string" ? parsed.email : undefined,
      wsUrl: parsed.wsUrl,
      workspace:
        typeof parsed.workspace === "string" ? parsed.workspace : undefined,
      claudeCommand:
        typeof parsed.claudeCommand === "string"
          ? parsed.claudeCommand
          : undefined,
      codexCommand:
        typeof parsed.codexCommand === "string"
          ? parsed.codexCommand
          : undefined,
      pairingToken: parsed.pairingToken,
    };
  } catch {
    return null;
  }
};

const writeConfigShape = (
  filePath: string,
  config: AgentWitchConfigShape,
): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(config, null, 2)}\n`);
};

export const getOrCreateInstallPairingToken = (): {
  readonly pairingToken: string;
  readonly wsUrl: string;
} => {
  const installDir = resolveAgentWitchInstallDir();
  const legacyPath = path.join(installDir, "config.json");
  const legacyConfig = readConfigShape(legacyPath);
  if (legacyConfig !== null) {
    return {
      pairingToken: legacyConfig.pairingToken,
      wsUrl: legacyConfig.wsUrl,
    };
  }

  const activeEmail = readActiveProfileEmailFromFile(installDir);
  if (activeEmail !== null) {
    const profileConfig = readConfigShape(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME,
        activeEmail,
        "config.json",
      ),
    );
    if (profileConfig !== null) {
      return {
        pairingToken: profileConfig.pairingToken,
        wsUrl: profileConfig.wsUrl,
      };
    }
  }

  throw new Error(
    "Agent Witch is not linked. Run the install command from Home while signed in.",
  );
};

export const ensureAgentWitchProfile = (
  profileEmail: string,
  options?: {
    readonly pairingToken?: string;
    readonly wsUrl?: string;
  },
): {
  readonly profileEmail: string;
  readonly configPath: string;
  readonly pairingToken: string;
  readonly wsUrl: string;
  readonly launchAgentLabel: string;
} => {
  const installDir = resolveAgentWitchInstallDir();
  const normalizedEmail = profileEmail.trim().toLowerCase();
  const profileDir = path.join(
    installDir,
    AGENT_WITCH_PROFILES_DIR_NAME,
    normalizedEmail,
  );
  const configPath = path.join(profileDir, "config.json");
  const existing = readConfigShape(configPath);
  const installDefaults = getOrCreateInstallPairingToken();
  const wsUrl = options?.wsUrl ?? existing?.wsUrl ?? installDefaults.wsUrl;
  const pairingToken =
    options?.pairingToken ??
    existing?.pairingToken ??
    installDefaults.pairingToken;

  if (pairingToken.trim().length === 0) {
    throw new Error(
      "Agent Witch is not linked. Run the install command from Home while signed in.",
    );
  }

  writeConfigShape(configPath, {
    email: normalizedEmail,
    wsUrl,
    workspace: existing?.workspace ?? process.env.HOME,
    claudeCommand: existing?.claudeCommand ?? "claude",
    codexCommand: existing?.codexCommand ?? "codex",
    pairingToken,
  });

  fs.mkdirSync(path.join(profileDir, "harness", "sets"), { recursive: true });
  fs.writeFileSync(
    path.join(installDir, AGENT_WITCH_ACTIVE_PROFILE_FILE_NAME),
    `${JSON.stringify({ email: normalizedEmail }, null, 2)}\n`,
  );

  return {
    profileEmail: normalizedEmail,
    configPath,
    pairingToken,
    wsUrl,
    launchAgentLabel: `${resolveAgentWitchLaunchAgentPrefix(installDir)}.${sanitizeProfileEmailForLaunchAgentLabel(normalizedEmail)}`,
  };
};
