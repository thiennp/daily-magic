import { access, readFile } from "node:fs/promises";
import path from "node:path";

export type AgentWitchDmgVariant = "local" | "production";

const DMG_CANDIDATE_RELATIVE_PATHS: Record<
  AgentWitchDmgVariant,
  readonly string[]
> = {
  local: [
    "public/install/AgentWitch-local.dmg",
    "dist/agent-witch-dmg-local/AgentWitch-local.dmg",
    "dist/agent-witch-dmg/AgentWitch.dmg",
  ],
  production: [
    "public/install/AgentWitch.dmg",
    "dist/agent-witch-dmg/AgentWitch.dmg",
  ],
};

export const resolveAgentWitchDmgAbsolutePath = async (
  variant: AgentWitchDmgVariant = "production",
  cwd = process.cwd(),
): Promise<string | null> => {
  for (const relativePath of DMG_CANDIDATE_RELATIVE_PATHS[variant]) {
    const absolutePath = path.join(cwd, relativePath);
    try {
      await access(absolutePath);
      return absolutePath;
    } catch {
      // try next candidate
    }
  }

  return null;
};

export const readAgentWitchDmgBytes = async (
  variant: AgentWitchDmgVariant = "production",
  cwd = process.cwd(),
): Promise<Uint8Array | null> => {
  const absolutePath = await resolveAgentWitchDmgAbsolutePath(variant, cwd);
  if (absolutePath === null) {
    return null;
  }

  return readFile(absolutePath);
};
