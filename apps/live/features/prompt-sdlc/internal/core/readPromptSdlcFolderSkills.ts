import fs from "node:fs";
import path from "node:path";

import { resolvePromptSdlcLocalFolder } from "./promptSdlcLocalFolder";

export interface PromptSdlcFolderSkill {
  readonly fileName: string;
  readonly name: string;
  readonly description: string;
  readonly promptText: string;
}

const SKILL_FILE_NAME = /^[a-z0-9-]+$/;

const unquote = (value: string): string => {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return "";
  }
  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (typeof parsed === "string") {
      return parsed.trim();
    }
  } catch {
    // Plain YAML values are kept as written.
  }
  return trimmed.replace(/^["']|["']$/g, "").trim();
};

export const readPromptSdlcSkillDocument = (
  document: string,
  fileName: string,
): PromptSdlcFolderSkill | null => {
  if (!SKILL_FILE_NAME.test(fileName)) {
    return null;
  }

  const trimmed = document.replace(/^\uFEFF/, "");
  let name = fileName;
  let description = "";
  let body = trimmed;
  if (trimmed.startsWith("---")) {
    const end = trimmed.indexOf("\n---", 3);
    if (end !== -1) {
      const frontmatter = trimmed.slice(3, end);
      body = trimmed.slice(end + 4).replace(/^\r?\n/, "");
      for (const line of frontmatter.split("\n")) {
        const match = /^(name|description):\s*(.*)$/.exec(line.trim());
        if (match === null) {
          continue;
        }
        const value = unquote(match[2] ?? "");
        if (match[1] === "name" && value.length > 0) {
          name = value;
        }
        if (match[1] === "description") {
          description = value;
        }
      }
    }
  }

  const promptText = body.trim();
  if (promptText.length === 0) {
    return null;
  }

  return { fileName, name, description, promptText };
};

export const listPromptSdlcFolderSkills = (
  folder: string,
): readonly PromptSdlcFolderSkill[] => {
  const resolved = resolvePromptSdlcLocalFolder(folder);
  if (!resolved.ok) {
    return [];
  }

  const skillsRoot = path.resolve(resolved.path, ".cursor", "skills");
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(skillsRoot);
  } catch {
    return [];
  }

  return entries
    .filter((entry) => SKILL_FILE_NAME.test(entry))
    .flatMap((fileName) => {
      const skillPath = path.resolve(skillsRoot, fileName, "SKILL.md");
      if (!skillPath.startsWith(`${skillsRoot}${path.sep}`)) {
        return [];
      }
      try {
        const skill = readPromptSdlcSkillDocument(
          fs.readFileSync(skillPath, "utf8"),
          fileName,
        );
        return skill === null ? [] : [skill];
      } catch {
        return [];
      }
    })
    .toSorted((left, right) => left.fileName.localeCompare(right.fileName));
};

export const readPromptSdlcFolderSkill = (
  folder: string,
  fileName: string,
): PromptSdlcFolderSkill | null =>
  listPromptSdlcFolderSkills(folder).find(
    (skill) => skill.fileName === fileName,
  ) ?? null;
