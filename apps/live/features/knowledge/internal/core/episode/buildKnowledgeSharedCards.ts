import redactTextForProjectKnowledge from "../../../../projects/internal/core/knowledge/redactTextForProjectKnowledge";
import type { KnowledgeDatabase } from "./knowledgeDb";
import {
  isKnowledgeOnForFolder,
  isKnowledgeShareOnForFolder,
} from "./knowledgeProjectFlags";
import {
  listEpisodesUpdatedSince,
  listKnowledgeProjectFolders,
  readKnowledgeMeta,
  writeKnowledgeMeta,
} from "./knowledgeStore";

const MAX_CARDS_PER_PROJECT = 20;
const RESEND_OVERLAP_MS = 60 * 60 * 1_000;
const MAX_SHARED_FILES = 4;
const SHARED_META_PREFIX = "shared_at:";

export type KnowledgeSharedCard = {
  readonly projectId: string;
  readonly cardId: string;
  readonly kind: string;
  readonly takeaway: string;
  readonly files: readonly string[];
  readonly outcome: string;
  readonly commitSha: string | null;
  readonly hits: number;
  readonly occurrences: number;
  readonly updatedAt: string;
};

export type KnowledgeSharedCards = {
  readonly cards: readonly KnowledgeSharedCard[];
  readonly shareOffProjectIds: readonly string[];
};

/**
 * Note text for projects that opted in (`knowledgeShare` on). Re-redacted at
 * send time; projects with sharing off are listed so the server drops old copies.
 */
export const buildKnowledgeSharedCards = (
  db: KnowledgeDatabase,
  now: number,
): KnowledgeSharedCards => {
  const cards: KnowledgeSharedCard[] = [];
  const shareOffProjectIds: string[] = [];

  for (const { projectKey, folderPath } of listKnowledgeProjectFolders(db)) {
    if (projectKey.startsWith("path:")) {
      continue;
    }
    const shareOn =
      isKnowledgeOnForFolder(folderPath) &&
      isKnowledgeShareOnForFolder(folderPath);
    if (!shareOn) {
      shareOffProjectIds.push(projectKey);
      continue;
    }
    const metaKey = `${SHARED_META_PREFIX}${projectKey}`;
    const lastSharedAt = readKnowledgeMeta(db, metaKey);
    const since =
      lastSharedAt === null
        ? new Date(0).toISOString()
        : new Date(Date.parse(lastSharedAt) - RESEND_OVERLAP_MS).toISOString();
    for (const card of listEpisodesUpdatedSince(
      db,
      projectKey,
      since,
      MAX_CARDS_PER_PROJECT,
    )) {
      cards.push({
        projectId: projectKey,
        cardId: card.id,
        kind: card.kind,
        takeaway: redactTextForProjectKnowledge(card.takeaway),
        files: card.files.slice(0, MAX_SHARED_FILES),
        outcome: card.outcome,
        commitSha: card.commitShas[0] ?? null,
        hits: card.hits,
        occurrences: card.occurrences,
        updatedAt: card.updatedAt,
      });
    }
    writeKnowledgeMeta(db, metaKey, new Date(now).toISOString());
  }
  return { cards, shareOffProjectIds };
};
