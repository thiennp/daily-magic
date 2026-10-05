import path from "node:path";

import { AGENT_WITCH_PROJECT_META_DIR_NAME } from "@agent-witch/live-projects";
import {
  buildDefaultProjectFlags,
  parseProjectFlags,
  type ProjectFeatureFlags,
} from "@agent-witch/shared/projects";

import type { CliFs } from "./cliFs.types";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const FLAGS_FILE_NAME = "token-saver.json";

/** Existing user flags (tolerant parse); null when missing or unreadable. */
const readExistingFlags = (
  fs: CliFs,
  filePath: string,
): ProjectFeatureFlags | null => {
  if (!fs.exists(filePath)) {
    return null;
  }
  try {
    return parseProjectFlags(JSON.parse(fs.readUtf8(filePath)));
  } catch {
    return null;
  }
};

/**
 * Persist project feature flags under `<project>/.agent-witch/token-saver.json`.
 * Defaults come from `buildDefaultProjectFlags()` (`@agent-witch/shared/projects`);
 * on re-accept, existing user flags are merged over the defaults (never reset).
 */
export const applyDefaultsFlags = (input: {
  readonly fs: CliFs;
  readonly projectRoot: string;
  readonly flags?: ProjectFeatureFlags;
}): { readonly ok: true; readonly path: string; readonly wrote: boolean } => {
  const filePath = path.join(
    input.projectRoot,
    AGENT_WITCH_PROJECT_META_DIR_NAME,
    FLAGS_FILE_NAME,
  );
  const flags = input.flags ?? {
    ...buildDefaultProjectFlags(),
    ...readExistingFlags(input.fs, filePath),
  };
  const next = `${JSON.stringify(flags, null, 2)}\n`;
  if (input.fs.exists(filePath) && input.fs.readUtf8(filePath) === next) {
    return { ok: true, path: filePath, wrote: false };
  }
  writeTextFileAtomic({ fs: input.fs, filePath, contents: next });
  return { ok: true, path: filePath, wrote: true };
};
