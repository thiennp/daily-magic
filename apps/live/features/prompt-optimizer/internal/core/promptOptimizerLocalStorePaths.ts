import fs from "node:fs";
import path from "node:path";

export const PROMPT_OPTIMIZER_CYCLES_FILE = "prompt-optimizer-cycles.json";
export const PROMPT_OPTIMIZER_PREFERENCES_FILE =
  "prompt-optimizer-preferences.json";
const PROMPT_OPTIMIZER_CYCLES_FILE_LEGACY = "prompt-sdlc-cycles.json";
const PROMPT_OPTIMIZER_PREFERENCES_FILE_LEGACY =
  "prompt-sdlc-preferences.json";

/** Prefer new on-disk names; migrate legacy SDLC filenames once when present. */
export const resolvePromptOptimizerCyclesPath = (profileDir: string): string => {
  const next = path.join(profileDir, PROMPT_OPTIMIZER_CYCLES_FILE);
  const legacy = path.join(profileDir, PROMPT_OPTIMIZER_CYCLES_FILE_LEGACY);
  if (fs.existsSync(next) || !fs.existsSync(legacy)) {
    return next;
  }
  try {
    fs.renameSync(legacy, next);
  } catch {
    return legacy;
  }
  const legacyPrefs = path.join(
    profileDir,
    PROMPT_OPTIMIZER_PREFERENCES_FILE_LEGACY,
  );
  const nextPrefs = path.join(profileDir, PROMPT_OPTIMIZER_PREFERENCES_FILE);
  if (fs.existsSync(legacyPrefs) && !fs.existsSync(nextPrefs)) {
    try {
      fs.renameSync(legacyPrefs, nextPrefs);
    } catch {
      // preferences reader still checks legacy name when needed
    }
  }
  return next;
};
