import { asRowArray, getSql } from "@/lib/db";
import type { KnowledgeSharedCardRow } from "@/lib/knowledge/knowledgeImpactView.type";

const SHARED_CARD_LIMIT = 50;

const parseFiles = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((file): file is string => typeof file === "string")
    : [];

/** Latest shared note text for a project (owner view). */
export const loadKnowledgeSharedCards = async (
  projectId: string,
): Promise<KnowledgeSharedCardRow[]> =>
  asRowArray(
    await getSql()`
      SELECT card.card_id, card.kind, card.takeaway, card.files, card.outcome,
             card.commit_sha, card.occurrences, card.card_updated_at,
             COALESCE(dev.display_name, dev.device_label, 'Computer') AS computer_label
      FROM project_knowledge_cards card
      JOIN agent_witch_devices dev ON dev.id = card.device_id
      WHERE card.project_id = ${projectId}
      ORDER BY card.card_updated_at DESC
      LIMIT ${SHARED_CARD_LIMIT}
    `,
  ).map((row) => ({
    cardId: String(row.card_id),
    kind: String(row.kind),
    takeaway: String(row.takeaway),
    files: parseFiles(row.files),
    outcome: String(row.outcome),
    commitSha: row.commit_sha === null ? null : String(row.commit_sha),
    occurrences: Number(row.occurrences ?? 1),
    computerLabel: String(row.computer_label),
    updatedAt: String(row.card_updated_at),
  }));
