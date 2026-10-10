import type {
  AutoSkillJudgePref,
  AutoSkillPublishMode,
  AutoSkillsSettings,
  AutoSkillsStatus,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { ensureProjectAutoSkillsSchema } from "@/features/project-auto-skills/internal/infrastructure/ensureProjectAutoSkillsSchema";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULTS: AutoSkillsSettings & AutoSkillsStatus = {
  enabled: true,
  judgePref: "auto",
  judgeAgent: null,
  publishMode: "draft",
  judgeKind: null,
  judgeLabel: null,
  pausedReason: null,
  statusNote: null,
  gitCommits: null,
  gitScanned: null,
  lastCheckedAt: null,
};

const text = (value: unknown): string | null =>
  value === null || value === undefined ? null : String(value);

const count = (value: unknown): number | null =>
  value === null || value === undefined ? null : Number(value);

/** Settings + last reported status; defaults (enabled) when no row exists. */
export const getAutoSkillsSettingsRow = async (
  projectId: string,
): Promise<AutoSkillsSettings & AutoSkillsStatus> => {
  await ensureProjectAutoSkillsSchema();
  const rows = asRowArray(
    await getSql()`SELECT * FROM project_auto_skills WHERE project_id = ${projectId}`,
  );
  const row = rows[0];
  if (row === undefined) {
    return DEFAULTS;
  }
  return {
    enabled: row.enabled !== false,
    judgePref: String(row.judge_pref) as AutoSkillJudgePref,
    judgeAgent: text(row.judge_agent),
    publishMode: String(row.publish_mode) as AutoSkillPublishMode,
    judgeKind: text(row.judge_kind),
    judgeLabel: text(row.judge_label),
    pausedReason: text(row.paused_reason),
    statusNote: text(row.status_note),
    gitCommits: count(row.git_commits),
    gitScanned: count(row.git_scanned),
    lastCheckedAt: text(row.last_checked_at),
  };
};

/** Owner toggles: only the given fields change. */
export const patchAutoSkillsSettings = async (
  projectId: string,
  patch: Partial<AutoSkillsSettings>,
): Promise<void> => {
  await ensureProjectAutoSkillsSchema();
  const current = await getAutoSkillsSettingsRow(projectId);
  const next = { ...current, ...patch };
  await getSql()`
    INSERT INTO project_auto_skills (project_id, enabled, judge_pref, judge_agent, publish_mode)
    VALUES (${projectId}, ${next.enabled}, ${next.judgePref}, ${next.judgeAgent}, ${next.publishMode})
    ON CONFLICT (project_id) DO UPDATE SET enabled = EXCLUDED.enabled,
      judge_pref = EXCLUDED.judge_pref, judge_agent = EXCLUDED.judge_agent,
      publish_mode = EXCLUDED.publish_mode, updated_at = NOW()`;
};

/** Reported by the owner's computer after each check. */
export const recordAutoSkillsStatus = async (
  projectId: string,
  status: Omit<AutoSkillsStatus, "lastCheckedAt">,
): Promise<void> => {
  await ensureProjectAutoSkillsSchema();
  await getSql()`
    INSERT INTO project_auto_skills (project_id, judge_kind, judge_label,
      paused_reason, status_note, git_commits, git_scanned, last_checked_at)
    VALUES (${projectId}, ${status.judgeKind}, ${status.judgeLabel},
      ${status.pausedReason}, ${status.statusNote}, ${status.gitCommits},
      ${status.gitScanned}, NOW())
    ON CONFLICT (project_id) DO UPDATE SET judge_kind = EXCLUDED.judge_kind,
      judge_label = EXCLUDED.judge_label, paused_reason = EXCLUDED.paused_reason,
      status_note = EXCLUDED.status_note,
      git_commits = COALESCE(EXCLUDED.git_commits, project_auto_skills.git_commits),
      git_scanned = COALESCE(EXCLUDED.git_scanned, project_auto_skills.git_scanned),
      last_checked_at = NOW(), updated_at = NOW()`;
};
