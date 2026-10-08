import { getSql } from "@/lib/db";
import type { KnowledgeSharedCardReport } from "@/lib/knowledge/knowledgeHeartbeat.type";

const MAX_CARDS_PER_DEVICE_PROJECT = 200;

/** Upsert shared note text; drop copies for projects whose sharing is off. */
export const saveKnowledgeSharedCards = async (input: {
  readonly deviceId: string;
  readonly authorizedProjectIds: ReadonlySet<string>;
  readonly cards: readonly KnowledgeSharedCardReport[];
  readonly shareOffProjectIds: readonly string[];
}): Promise<void> => {
  const sql = getSql();
  const shareOff = input.shareOffProjectIds.filter((id) =>
    input.authorizedProjectIds.has(id),
  );
  if (shareOff.length > 0) {
    await sql`
      DELETE FROM project_knowledge_cards
      WHERE device_id = ${input.deviceId}
        AND project_id = ANY(${[...shareOff]}::text[])
    `;
  }
  for (const card of input.cards) {
    if (!input.authorizedProjectIds.has(card.projectId)) {
      continue;
    }
    await sql`
      INSERT INTO project_knowledge_cards (
        project_id, device_id, card_id, kind, takeaway, files, outcome,
        commit_sha, hits, occurrences, card_updated_at
      ) VALUES (
        ${card.projectId}, ${input.deviceId}, ${card.cardId}, ${card.kind},
        ${card.takeaway}, ${JSON.stringify(card.files)}::jsonb, ${card.outcome},
        ${card.commitSha}, ${card.hits}, ${card.occurrences}, ${card.updatedAt}::timestamptz
      )
      ON CONFLICT (project_id, device_id, card_id) DO UPDATE SET
        kind = EXCLUDED.kind, takeaway = EXCLUDED.takeaway, files = EXCLUDED.files,
        outcome = EXCLUDED.outcome, commit_sha = EXCLUDED.commit_sha,
        hits = EXCLUDED.hits, occurrences = EXCLUDED.occurrences,
        card_updated_at = EXCLUDED.card_updated_at
    `;
  }
  for (const projectId of new Set(input.cards.map((card) => card.projectId))) {
    await sql`
      DELETE FROM project_knowledge_cards
      WHERE device_id = ${input.deviceId} AND project_id = ${projectId}
        AND card_id NOT IN (
          SELECT card_id FROM project_knowledge_cards
          WHERE device_id = ${input.deviceId} AND project_id = ${projectId}
          ORDER BY card_updated_at DESC LIMIT ${MAX_CARDS_PER_DEVICE_PROJECT}
        )
    `;
  }
};
