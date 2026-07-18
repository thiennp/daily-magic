import { access, readFile } from "node:fs/promises";
import path from "node:path";

const DMG_CANDIDATE_RELATIVE_PATHS = [
  "public/install/AgentWitch.dmg",
  "dist/agent-witch-dmg/AgentWitch.dmg",
] as const;

export const resolveAgentWitchDmgAbsolutePath = async (
  cwd = process.cwd(),
): Promise<string | null> => {
  for (const relativePath of DMG_CANDIDATE_RELATIVE_PATHS) {
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
  cwd = process.cwd(),
): Promise<Uint8Array | null> => {
  const absolutePath = await resolveAgentWitchDmgAbsolutePath(cwd);
  if (absolutePath === null) {
    return null;
  }

  return readFile(absolutePath);
};
