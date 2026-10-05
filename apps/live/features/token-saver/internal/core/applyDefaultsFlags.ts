import path from "node:path";

import {
  buildDefaultProjectFlags,
  type ProjectFeatureFlags,
} from "@agent-witch/shared/projects";

import type { CliFs } from "./cliFs.types";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const FLAGS_RELATIVE = path.join(".agent-witch", "token-saver.json");

/**
 * Persist project feature flags under `.agent-witch/token-saver.json`.
 * Defaults come from `buildDefaultProjectFlags()` (`@agent-witch/shared/projects`).
 */
export const applyDefaultsFlags = (input: {
  readonly fs: CliFs;
  readonly projectRoot: string;
  readonly flags?: ProjectFeatureFlags;
}): { readonly ok: true; readonly path: string; readonly wrote: boolean } => {
  const filePath = path.join(input.projectRoot, FLAGS_RELATIVE);
  const flags = input.flags ?? buildDefaultProjectFlags();
  const next = `${JSON.stringify(flags, null, 2)}\n`;
  if (input.fs.exists(filePath) && input.fs.readUtf8(filePath) === next) {
    return { ok: true, path: filePath, wrote: false };
  }
  writeTextFileAtomic({ fs: input.fs, filePath, contents: next });
  return { ok: true, path: filePath, wrote: true };
};
