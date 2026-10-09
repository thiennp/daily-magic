import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { mergeMarkedBlock } from "./mergeMarkedBlock";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

/** Merge a marked instruction block into a UTF-8 file (global home or project repo). */
export const upsertMarkedInstructionInFile = (input: {
  readonly fs: CliFs;
  readonly filePath: string;
  readonly blockBody: string;
  readonly begin: string;
  readonly end: string;
}): CliWriteResult => {
  const existing = input.fs.exists(input.filePath)
    ? input.fs.readUtf8(input.filePath)
    : "";
  const { next, changed } = mergeMarkedBlock({
    existing,
    blockBody: input.blockBody,
    begin: input.begin,
    end: input.end,
  });
  if (!changed) {
    return { ok: true, path: input.filePath, wrote: false };
  }
  input.fs.mkdirp(path.dirname(input.filePath));
  const { backupPath } = writeTextFileAtomic({
    fs: input.fs,
    filePath: input.filePath,
    contents: next,
    backup: existing.length > 0,
  });
  return { ok: true, path: input.filePath, wrote: true, backupPath };
};
