import path from "node:path";

import {
  TOKEN_SAVER_DEFAULT_FLAGS,
  type TokenSaverDefaultsFlags,
} from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const FLAGS_RELATIVE = path.join(".agent-witch", "token-saver.json");

/** Write Product 04 defaults under `.agent-witch/token-saver.json`. */
export const applyDefaultsFlags = (input: {
  readonly fs: CliFs;
  readonly projectRoot: string;
  readonly flags?: TokenSaverDefaultsFlags;
}): { readonly ok: true; readonly path: string; readonly wrote: boolean } => {
  const filePath = path.join(input.projectRoot, FLAGS_RELATIVE);
  const flags = input.flags ?? TOKEN_SAVER_DEFAULT_FLAGS;
  const next = `${JSON.stringify(flags, null, 2)}\n`;
  if (input.fs.exists(filePath) && input.fs.readUtf8(filePath) === next) {
    return { ok: true, path: filePath, wrote: false };
  }
  writeTextFileAtomic({ fs: input.fs, filePath, contents: next });
  return { ok: true, path: filePath, wrote: true };
};
