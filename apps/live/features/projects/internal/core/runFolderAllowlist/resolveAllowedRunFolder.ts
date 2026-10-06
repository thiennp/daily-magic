import fs from "node:fs";
import path from "node:path";

import expandAgentWitchProjectFolderPath from "../expandAgentWitchProjectFolderPath";
import { decideRunFolder, type RunFolderDecision } from "./decideRunFolder";
import { isPathInsideFolder } from "./isPathInsideFolder";
import type { RegisteredRunFolder } from "./registeredRunFolder.type";

export interface ResolveAllowedRunFolderInput {
  readonly projectId?: string;
  /** Folder from the run (after resolveRunProjectFolderPath); null = none. */
  readonly requestedFolderPath: string | null;
  /** Device-scoped registrations from the cloud; null = could not load. */
  readonly registeredFolders: readonly RegisteredRunFolder[] | null;
  /** AWL-owned projects dir: only folders under it may be created. */
  readonly managedProjectsDir: string;
  /** AWL default folder, allowed for runs without a projectId. */
  readonly defaultFolderPath: string;
}

const toLexical = (folderPath: string): string =>
  path.resolve(expandAgentWitchProjectFolderPath(folderPath));

const realPathOrNull = (lexicalPath: string): string | null => {
  try {
    return fs.realpathSync.native(lexicalPath);
  } catch {
    return null;
  }
};

const selectRootPaths = (
  input: ResolveAllowedRunFolderInput,
): readonly string[] | null => {
  const projectId = input.projectId?.trim() ?? "";
  if (projectId.length > 0) {
    return input.registeredFolders === null
      ? null
      : input.registeredFolders
          .filter((folder) => folder.projectId === projectId)
          .map((folder) => folder.folderPath);
  }
  const registered = (input.registeredFolders ?? []).map((f) => f.folderPath);
  return [input.defaultFolderPath, ...registered];
};

/**
 * S0-5: realpath(cwd) must equal or sit inside a folder registered for this
 * project on this device. Never creates a folder, except AWL's own managed
 * project folders (e.g. the Default project) that are registered.
 */
export const resolveAllowedRunFolder = (
  input: ResolveAllowedRunFolderInput,
): RunFolderDecision => {
  const rootLexicalPaths = selectRootPaths(input)?.map(toLexical) ?? null;
  const requested = input.requestedFolderPath?.trim() ?? "";
  const requestedLexicalPath = requested.length > 0 ? toLexical(requested) : null;

  if (
    requestedLexicalPath !== null &&
    realPathOrNull(requestedLexicalPath) === null &&
    isPathInsideFolder(requestedLexicalPath, toLexical(input.managedProjectsDir)) &&
    (rootLexicalPaths ?? []).includes(requestedLexicalPath)
  ) {
    fs.mkdirSync(requestedLexicalPath, { recursive: true });
  }

  return decideRunFolder({
    requestedLexicalPath,
    requestedRealPath:
      requestedLexicalPath === null ? null : realPathOrNull(requestedLexicalPath),
    roots:
      rootLexicalPaths?.map((lexicalPath) => ({
        lexicalPath,
        realPath: realPathOrNull(lexicalPath),
      })) ?? null,
  });
};
