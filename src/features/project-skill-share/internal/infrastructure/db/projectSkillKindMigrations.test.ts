import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_PITFALL_AGENTWITCH_PROJECT_ID } from "@agent-witch/shared/pitfalls";
import { deriveProjectSkillIdFromName } from "@/features/project-skill-share/internal/core/deriveProjectSkillIdFromName";
import { measureProjectSkillBodyBytes } from "@/features/project-skill-share/internal/core/measureProjectSkillBodyBytes";
import { PROJECT_SKILL_MAX_BODY_BYTES } from "@/features/project-skill-share/internal/core/projectSkillShare.constant";

const read = (file: string): string =>
  fs.readFileSync(path.join(process.cwd(), "db/migrations", file), "utf8");

describe("110 project_skills.kind", () => {
  it("adds kind additively with skill default + playbook check", () => {
    const sql = read("110-project-skill-kind.sql");
    expect(sql).toContain(
      "ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'skill'",
    );
    expect(sql).toContain("CHECK (kind IN ('skill', 'playbook'))");
    expect(sql).not.toMatch(/\bDROP\b|\bDELETE\b|\bUPDATE\b/i);
  });
});

describe("111 AgentWitch playbook seed", () => {
  const sql = read("111-project-playbook-agentwitch-seed.sql");
  const body = /\$playbook\$([\s\S]*?)\$playbook\$/.exec(sql)?.[1] ?? "";

  it("targets the AgentWitch project, idempotent, published playbook", () => {
    expect(sql).toContain(`p.id = '${PROJECT_PITFALL_AGENTWITCH_PROJECT_ID}'`);
    expect(sql).toContain("ON CONFLICT (project_id, skill_id) DO NOTHING");
    expect(sql).toContain("'how-the-agentwitch-team-ships', 'playbook'");
    expect(deriveProjectSkillIdFromName("How the AgentWitch team ships")).toBe(
      "how-the-agentwitch-team-ships",
    );
  });

  it("body fits the cap and carries every shipping rule", () => {
    expect(measureProjectSkillBodyBytes(body)).toBeLessThanOrEqual(
      PROJECT_SKILL_MAX_BODY_BYTES,
    );
    for (const needle of [
      "Push first",
      "hotfix forward",
      "Push continuously",
      "Tasks tab",
      "claude.ai",
      "L92KQX615Q",
      "tip SHAs",
    ]) {
      expect(body).toContain(needle);
    }
  });
});
