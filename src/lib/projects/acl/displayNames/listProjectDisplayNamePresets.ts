import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { PROJECT_DISPLAY_NAME_PRESETS } from "@/lib/projects/acl/displayNames/projectDisplayNamePresets.constant";
import { normalizeProjectDisplayNameKey } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectDisplayNamePresetsPayload = {
  readonly presets: readonly string[];
  readonly available: readonly string[];
  readonly suggested: string;
};

export const listProjectDisplayNamePresets = async (
  projectId: string,
): Promise<ProjectDisplayNamePresetsPayload> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT project_display_name
      FROM project_memberships
      WHERE project_id = ${projectId}
        AND status IN ('active', 'naming_required')
        AND project_display_name IS NOT NULL
    `,
  );
  const taken = new Set(
    rows
      .map((row) =>
        row.project_display_name
          ? normalizeProjectDisplayNameKey(String(row.project_display_name))
          : "",
      )
      .filter((k) => k.length > 0),
  );
  const presets = [...PROJECT_DISPLAY_NAME_PRESETS];
  const available = presets.filter(
    (name) => !taken.has(normalizeProjectDisplayNameKey(name)),
  );
  const pool = available.length > 0 ? available : presets;
  const suggested = pool[Math.floor(Math.random() * pool.length)] ?? "Ada";
  return { presets, available, suggested };
};
