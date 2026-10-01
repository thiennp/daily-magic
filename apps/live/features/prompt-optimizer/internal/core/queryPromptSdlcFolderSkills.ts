import path from "node:path";

import { resolvePromptSdlcLocalFolder } from "./promptSdlcLocalFolder";
import { rankPromptSdlcFolderSkillDocuments } from "./promptSdlcFolderSkillSearch";
import {
  listPromptSdlcFolderSkills,
  type PromptSdlcFolderSkill,
} from "./readPromptSdlcFolderSkills";

export interface PromptSdlcFolderSkillQueryHit {
  readonly skillId: string;
  readonly name: string;
  readonly description: string;
  readonly score: number;
  readonly sourcePath: string;
  readonly excerpt: string;
  readonly source: "filesystem";
}

export interface PromptSdlcFolderSkillQueryResult {
  readonly query: string;
  readonly hits: readonly PromptSdlcFolderSkillQueryHit[];
  readonly context: string;
}

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;
const EXCERPT_MAX = 280;

const skillSearchText = (skill: PromptSdlcFolderSkill): string =>
  [skill.name, skill.description, skill.promptText].join("\n");

const excerptFor = (skill: PromptSdlcFolderSkill): string => {
  const body = skill.promptText.trim();
  if (body.length === 0) {
    return skill.description.trim();
  }
  if (body.length <= EXCERPT_MAX) {
    return body;
  }
  return `${body.slice(0, EXCERPT_MAX - 3)}...`;
};

const formatContext = (
  hits: readonly PromptSdlcFolderSkillQueryHit[],
): string => {
  if (hits.length === 0) {
    return "No matching folder skills under .cursor/skills for that workingDirectory.";
  }
  return hits
    .map(
      (hit, index) =>
        `### ${index + 1}. ${hit.name} (${hit.skillId})\n` +
        `Score: ${hit.score.toFixed(3)}\n` +
        `Path: ${hit.sourcePath}\n` +
        (hit.description.length > 0
          ? `Description: ${hit.description}\n`
          : "") +
        `\n${hit.excerpt}`,
    )
    .join("\n\n---\n\n");
};

const clampLimit = (limit: number | undefined): number => {
  if (limit === undefined || !Number.isFinite(limit)) {
    return DEFAULT_LIMIT;
  }
  return Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit)));
};

/** TF-IDF search over .cursor/skills folder SKILL.md files under workingDirectory. */
export const queryPromptSdlcFolderSkills = (input: {
  readonly workingDirectory: string;
  readonly query: string;
  readonly limit?: number;
}): PromptSdlcFolderSkillQueryResult => {
  const query = input.query.trim();
  const limit = clampLimit(input.limit);
  const resolved = resolvePromptSdlcLocalFolder(input.workingDirectory);
  if (!resolved.ok) {
    return {
      query,
      hits: [],
      context: resolved.errorMessage,
    };
  }

  const skills = listPromptSdlcFolderSkills(resolved.path);
  const ranked = rankPromptSdlcFolderSkillDocuments(
    skills.map((skill) => ({
      id: skill.fileName,
      text: skillSearchText(skill),
    })),
    query,
    limit,
  );
  const byId = new Map(skills.map((skill) => [skill.fileName, skill]));
  const skillsRoot = path.resolve(resolved.path, ".cursor", "skills");
  const hits: PromptSdlcFolderSkillQueryHit[] = ranked.flatMap((rank) => {
    const skill = byId.get(rank.id);
    if (skill === undefined) {
      return [];
    }
    return [
      {
        skillId: skill.fileName,
        name: skill.name,
        description: skill.description,
        score: rank.score,
        sourcePath: path.join(skillsRoot, skill.fileName, "SKILL.md"),
        excerpt: excerptFor(skill),
        source: "filesystem" as const,
      },
    ];
  });

  return {
    query,
    hits,
    context: formatContext(hits),
  };
};
