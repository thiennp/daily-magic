import path from "node:path";

import type { CliFs } from "./cliFs.types";

/** Write via sibling tmp + rename. Optional one-shot bak before overwrite. */
export const writeTextFileAtomic = (input: {
  readonly fs: CliFs;
  readonly filePath: string;
  readonly contents: string;
  readonly backup?: boolean;
}): { readonly backupPath?: string } => {
  const { fs: io, filePath, contents } = input;
  io.mkdirp(path.dirname(filePath));
  let backupPath: string | undefined;
  if (input.backup === true && io.exists(filePath)) {
    backupPath = `${filePath}.aw-bak.${new Date().toISOString().replaceAll(":", "-")}`;
    io.writeUtf8(backupPath, io.readUtf8(filePath));
  }
  const tmpPath = `${filePath}.aw-tmp`;
  io.writeUtf8(tmpPath, contents);
  io.rename(tmpPath, filePath);
  return backupPath !== undefined ? { backupPath } : {};
};
