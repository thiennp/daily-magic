import { getSql } from "@/lib/db";

/** Additive: the product-updates catalog version each assistant seat was last served. */
export const ensureProjectGuidanceSeenSchema = async (): Promise<void> => {
  const sql = getSql();
  await sql`ALTER TABLE project_memberships
    ADD COLUMN IF NOT EXISTS guidance_seen_version INTEGER`;
  await sql`ALTER TABLE project_memberships
    ADD COLUMN IF NOT EXISTS guidance_seen_at TIMESTAMPTZ`;
};
