import {
  LocalCodingToolRefusalCode,
  type LocalCodingToolRefusalCodeValue,
} from "@agent-witch/shared/dispatch";

import { isPathInsideFolder } from "./isPathInsideFolder";

/** One allowlist root: lexical (expanded, resolved) path + realpath (null = missing). */
export interface RunFolderRoot {
  readonly lexicalPath: string;
  readonly realPath: string | null;
}

export interface DecideRunFolderInput {
  /** Expanded + resolved requested folder; null = run sent no folder. */
  readonly requestedLexicalPath: string | null;
  /** realpath of the requested folder; null = does not exist. */
  readonly requestedRealPath: string | null;
  /** Folders registered for this project + device; null = list unavailable. */
  readonly roots: readonly RunFolderRoot[] | null;
}

export type RunFolderDecision =
  | { readonly ok: true; readonly folderRealPath: string }
  | { readonly ok: false; readonly code: LocalCodingToolRefusalCodeValue };

const refuse = (code: LocalCodingToolRefusalCodeValue): RunFolderDecision => ({
  ok: false,
  code,
});

/**
 * S0-5 pure decision. Containment is checked on realpaths, so a symlink
 * inside a registered folder that points outside it is refused.
 */
export const decideRunFolder = (input: DecideRunFolderInput): RunFolderDecision => {
  const requested = input.requestedLexicalPath;
  if (requested === null) {
    return refuse(LocalCodingToolRefusalCode.FOLDER_REQUIRED);
  }
  if (input.roots === null) {
    return refuse(LocalCodingToolRefusalCode.FOLDER_CHECK_UNAVAILABLE);
  }
  const real = input.requestedRealPath;
  if (real === null) {
    const lexicallyRegistered = input.roots.some((root) =>
      isPathInsideFolder(requested, root.lexicalPath),
    );
    return refuse(
      lexicallyRegistered
        ? LocalCodingToolRefusalCode.FOLDER_NOT_FOUND
        : LocalCodingToolRefusalCode.FOLDER_NOT_REGISTERED,
    );
  }
  const allowed = input.roots.some(
    (root) => root.realPath !== null && isPathInsideFolder(real, root.realPath),
  );
  return allowed
    ? { ok: true, folderRealPath: real }
    : refuse(LocalCodingToolRefusalCode.FOLDER_NOT_REGISTERED);
};
