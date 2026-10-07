import fs from "node:fs";
import path from "node:path";

import type { ProjectHistorySkillgenDraftReviewItem } from "./projectHistorySkillgenDraftReview.type";
import {
  PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME,
  PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME,
  PROJECT_HISTORY_SKILLS_DIR_NAME,
  PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const isDraftId = (id: string): boolean =>
  id.length > 0 &&
  !id.startsWith(".") &&
  !id.includes("/") &&
  !id.includes("\\") &&
  !id.includes("..");

const readTags = (raw: unknown): readonly string[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
    .map((t) => t.trim().toLowerCase());
};

const readSource = (raw: unknown): "History" | "Computer" =>
  raw === "Computer" ? "Computer" : "History";

/** List open drafts under `skills/_drafts/` for Local review UI. */
export const listProjectHistorySkillgenDraftsForReview = (
  projectId: string,
): readonly ProjectHistorySkillgenDraftReviewItem[] => {
  const draftsDir = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_SKILLS_DIR_NAME,
    PROJECT_HISTORY_SKILLS_DRAFTS_DIR_NAME,
  );
  if (!fs.existsSync(draftsDir)) {
    return [];
  }
  const out: ProjectHistorySkillgenDraftReviewItem[] = [];
  for (const entry of fs.readdirSync(draftsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !isDraftId(entry.name)) continue;
    const skillPath = path.join(
      draftsDir,
      entry.name,
      PROJECT_HISTORY_SKILL_DRAFT_SKILL_FILE_NAME,
    );
    if (!fs.existsSync(skillPath)) continue;
    try {
      const body = fs.readFileSync(skillPath, "utf8");
      const metaPath = path.join(
        draftsDir,
        entry.name,
        PROJECT_HISTORY_SKILL_DRAFT_META_FILE_NAME,
      );
      let title = entry.name;
      let description = "";
      let tags: readonly string[] = [];
      let source: "History" | "Computer" = "History";
      let updatedAt = fs.statSync(skillPath).mtime.toISOString();
      if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf8")) as Record<
          string,
          unknown
        >;
        if (typeof meta.name === "string" && meta.name.trim()) {
          title = meta.name.trim();
        }
        if (typeof meta.description === "string") {
          description = meta.description;
        }
        tags = readTags(meta.tags);
        source = readSource(meta.source);
        if (typeof meta.updatedAt === "string" && meta.updatedAt.length > 0) {
          updatedAt = meta.updatedAt;
        }
      }
      out.push({
        id: entry.name,
        title,
        body,
        description,
        tags,
        source,
        updatedAt,
        pathLabel: `skills/_drafts/${entry.name}`,
      });
    } catch {
      // skip corrupt
    }
  }
  return out.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
};

export const readProjectHistorySkillgenDraftForReview = (
  projectId: string,
  draftId: string,
): ProjectHistorySkillgenDraftReviewItem | null => {
  if (!isDraftId(draftId)) return null;
  return (
    listProjectHistorySkillgenDraftsForReview(projectId).find(
      (d) => d.id === draftId,
    ) ?? null
  );
};
