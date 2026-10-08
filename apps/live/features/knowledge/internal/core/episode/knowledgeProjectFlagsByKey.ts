import type { KnowledgeDatabase } from "./knowledgeDb";
import {
  isKnowledgeOnForFolder,
  isKnowledgeShareOnForFolder,
  writeKnowledgeProjectFlag,
  type KnowledgeFlagKey,
} from "./knowledgeProjectFlags";
import { listKnowledgeProjectFolders } from "./knowledgeStore";

export type KnowledgeProjectFlagView = {
  readonly folderPath: string | null;
  readonly knowledge: boolean;
  readonly share: boolean;
};

const findFolder = (db: KnowledgeDatabase, projectKey: string): string | null =>
  listKnowledgeProjectFolders(db).find((p) => p.projectKey === projectKey)
    ?.folderPath ?? null;

export const readKnowledgeFlagsForProject = (
  db: KnowledgeDatabase,
  projectKey: string,
): KnowledgeProjectFlagView => {
  const folderPath = findFolder(db, projectKey);
  return folderPath === null
    ? { folderPath, knowledge: true, share: false }
    : {
        folderPath,
        knowledge: isKnowledgeOnForFolder(folderPath),
        share: isKnowledgeShareOnForFolder(folderPath),
      };
};

/** Toggle a flag in the project's `.agent-witch/token-saver.json`; false if folder unknown. */
export const setKnowledgeFlagForProject = (
  db: KnowledgeDatabase,
  input: {
    readonly projectKey: string;
    readonly key: KnowledgeFlagKey;
    readonly on: boolean;
  },
): boolean => {
  const folderPath = findFolder(db, input.projectKey);
  if (folderPath === null) {
    return false;
  }
  writeKnowledgeProjectFlag({
    projectFolderPath: folderPath,
    key: input.key,
    on: input.on,
  });
  return true;
};
