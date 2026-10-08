import fs from "node:fs";
import path from "node:path";

import {
  readActiveProfileEmailFromFile,
  readAgentWitchHostServices,
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
  sanitizeProfileEmailForDir,
} from "@agent-witch/install-layout";
import { AGENT_WITCH_PROFILES_DIR_NAME } from "@agent-witch/install-layout/types";

import type { AgentWitchLaunchTarget } from "../../public-api/types";

const listProfileEmails = (installDir: string): readonly string[] => {
  const profilesDir = path.join(installDir, AGENT_WITCH_PROFILES_DIR_NAME);
  if (!fs.existsSync(profilesDir)) {
    return [];
  }

  return fs
    .readdirSync(profilesDir)
    .filter((entry) => fs.statSync(path.join(profilesDir, entry)).isDirectory())
    .map((entry) => sanitizeProfileEmailForDir(entry))
    .toSorted();
};

/**
 * Legacy (no host-services.json): one LaunchAgent / process per install home,
 * every profile bridged in that process.
 * Per-account (AWL-ISO-1): one target per account `com.agent-witch.<hash>`,
 * optionally only `onlyAccountEmail`.
 */
export const listAgentWitchLaunchTargets = (
  installDir: string = resolveAgentWitchInstallDir(),
  options?: { readonly onlyAccountEmail?: string | null },
): readonly AgentWitchLaunchTarget[] => {
  const services = readAgentWitchHostServices(installDir);
  if (services !== null) {
    const only = options?.onlyAccountEmail?.trim().toLowerCase() ?? "";
    return services.accounts
      .filter((account) => only.length === 0 || account.email === only)
      .map((account) => ({
        profileEmail: account.email,
        launchAgentLabel: account.launchAgentLabel,
      }));
  }

  const launchAgentLabel = resolveAgentWitchLaunchAgentPrefix(installDir);
  const profileEmails = listProfileEmails(installDir);
  const activeProfileEmail = readActiveProfileEmailFromFile(installDir);

  return [
    {
      profileEmail: activeProfileEmail ?? profileEmails[0] ?? null,
      launchAgentLabel,
    },
  ];
};

export const listAgentWitchProfileEmails = (
  installDir: string = resolveAgentWitchInstallDir(),
): readonly string[] => listProfileEmails(installDir);
