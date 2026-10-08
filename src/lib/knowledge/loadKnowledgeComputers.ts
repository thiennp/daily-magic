import { asRowArray, getSql } from "@/lib/db";
import type { KnowledgeComputerRow } from "@/lib/knowledge/knowledgeImpactView.type";
import type { KnowledgeCapabilitiesReport } from "@/lib/knowledge/knowledgeHeartbeat.type";
import { resolveKnowledgeComputerStatus } from "@/lib/knowledge/parseKnowledgeHeartbeat";

const parseCapabilities = (
  value: unknown,
): KnowledgeCapabilitiesReport | null =>
  typeof value === "object" && value !== null
    ? (value as KnowledgeCapabilitiesReport)
    : null;

/** Active computers of the project's owner and members, with knowledge status. */
export const loadKnowledgeComputers = async (
  projectId: string,
): Promise<KnowledgeComputerRow[]> =>
  asRowArray(
    await getSql()`
      SELECT dev.id, dev.display_name, dev.device_label, dev.install_bundle_version,
             dev.knowledge_capabilities, dev.knowledge_capabilities_at,
             usr.name AS owner_name, usr.email AS owner_email
      FROM agent_witch_devices dev
      JOIN users usr ON usr.id = dev.user_id
      WHERE dev.revoked_at IS NULL
        AND dev.superseded_by_device_id IS NULL
        AND (
          dev.user_id IN (SELECT owner_user_id FROM user_projects WHERE id = ${projectId})
          OR dev.user_id IN (
            SELECT user_id FROM project_memberships
            WHERE project_id = ${projectId} AND status = 'active'
          )
        )
      ORDER BY dev.last_seen_at DESC NULLS LAST
    `,
  ).map((row) => {
    const capabilities = parseCapabilities(row.knowledge_capabilities);
    return {
      deviceId: String(row.id),
      label: String(row.display_name ?? row.device_label ?? "Computer"),
      ownerName:
        row.owner_name !== null && row.owner_name !== undefined
          ? String(row.owner_name)
          : row.owner_email !== null && row.owner_email !== undefined
            ? String(row.owner_email)
            : null,
      status: resolveKnowledgeComputerStatus(capabilities),
      cardCount: capabilities?.cardCount ?? 0,
      installBundleVersion:
        row.install_bundle_version !== null &&
        row.install_bundle_version !== undefined
          ? String(row.install_bundle_version)
          : null,
      lastReportAt:
        row.knowledge_capabilities_at !== null &&
        row.knowledge_capabilities_at !== undefined
          ? String(row.knowledge_capabilities_at)
          : null,
    };
  });
