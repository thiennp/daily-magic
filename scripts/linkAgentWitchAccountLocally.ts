import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import {
  ensureAgentWitchProfile,
  getOrCreateInstallPairingToken,
} from "./ensureAgentWitchProfile";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL } from "./agentWitchWakeConstants";
import { wakeAgentWitchLaunchAgents } from "./agentWitchWakeHandlers";
import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  resolveAgentWitchInstallDir,
} from "./resolveAgentWitchLocalLayout";

export interface LinkAgentWitchAccountLocallyInput {
  readonly linkToken: string;
  readonly appOrigin: string;
  readonly profileEmail: string;
}

export interface LinkAgentWitchAccountLocallyResult {
  readonly ok: boolean;
  readonly email?: string;
  readonly errorMessage?: string;
}

const postJson = async (
  url: string,
  body: Record<string, string>,
): Promise<{
  readonly ok: boolean;
  readonly data: Record<string, unknown>;
}> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let data: unknown = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    return {
      ok: response.ok,
      data:
        typeof data === "object" && data !== null
          ? (data as Record<string, unknown>)
          : {},
    };
  } catch {
    return {
      ok: false,
      data: { error: "Could not reach Agent Witch site." },
    };
  }
};

const kickstartLinkedAgent = async (launchAgentLabel: string): Promise<void> => {
  const kickLegacy = await kickstartAgentWitchLaunchAgent(
    AGENT_WITCH_LEGACY_LAUNCH_AGENT_LABEL,
  );
  if (!kickLegacy.ok) {
    const kickProfile = await kickstartAgentWitchLaunchAgent(launchAgentLabel);
    if (!kickProfile.ok) {
      await wakeAgentWitchLaunchAgents();
    }
  }
};

const readProfilePairingToken = (
  profileEmail: string,
): { readonly pairingToken: string; readonly wsUrl: string } | null => {
  const configPath = path.join(
    resolveAgentWitchInstallDir(),
    AGENT_WITCH_PROFILES_DIR_NAME,
    profileEmail,
    "config.json",
  );

  if (!fs.existsSync(configPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as { pairingToken?: unknown }).pairingToken === "string" &&
      typeof (parsed as { wsUrl?: unknown }).wsUrl === "string"
    ) {
      return {
        pairingToken: (parsed as { pairingToken: string }).pairingToken,
        wsUrl: (parsed as { wsUrl: string }).wsUrl,
      };
    }
  } catch {
    return null;
  }

  return null;
};

const resolvePairingForProfile = (
  profileEmail: string,
): { readonly pairingToken: string; readonly wsUrl: string } => {
  const existingProfile = readProfilePairingToken(profileEmail);
  if (existingProfile !== null) {
    return existingProfile;
  }

  const installDir = resolveAgentWitchInstallDir();
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  const hasProfiles =
    fs.existsSync(profilesDir) &&
    fs
      .readdirSync(profilesDir)
      .some((entry) =>
        fs.statSync(path.join(profilesDir, entry)).isDirectory(),
      );
  const installPairing = getOrCreateInstallPairingToken();

  if (!hasProfiles) {
    return installPairing;
  }

  return {
    pairingToken: randomBytes(32).toString("hex"),
    wsUrl: installPairing.wsUrl,
  };
};

export const linkAgentWitchAccountLocally = async (
  input: LinkAgentWitchAccountLocallyInput,
): Promise<LinkAgentWitchAccountLocallyResult> => {
  const profileEmail = input.profileEmail.trim().toLowerCase();
  const pairing = resolvePairingForProfile(profileEmail);
  const claimResult = await postJson(
    `${input.appOrigin.replace(/\/$/, "")}/api/agent-witch/link-account`,
    {
      pairingToken: pairing.pairingToken,
      linkToken: input.linkToken,
    },
  );

  if (!claimResult.ok) {
    const errorMessage =
      typeof claimResult.data.error === "string"
        ? claimResult.data.error
        : "Server rejected account link.";
    return { ok: false, errorMessage };
  }

  const profile = ensureAgentWitchProfile(profileEmail, {
    pairingToken: pairing.pairingToken,
    wsUrl: pairing.wsUrl,
  });

  void kickstartLinkedAgent(profile.launchAgentLabel).catch(() => undefined);

  return { ok: true, email: profile.profileEmail };
};
