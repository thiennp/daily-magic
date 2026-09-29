import fs from "node:fs";
import path from "node:path";

export const promptSdlcSkillSlug = (name: string): string => {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");

  return slug.length > 0 ? slug : "";
};

const yamlString = (value: string): string =>
  JSON.stringify(value.replace(/\s+/g, " ").trim().slice(0, 240));

export const promptSdlcSkillFileName = (
  fileName: string,
  name: string,
): string => {
  const fromFile = promptSdlcSkillSlug(fileName);
  return fromFile.length > 0 ? fromFile : promptSdlcSkillSlug(name);
};

export const buildPromptSdlcSkillDocument = (input: {
  readonly name: string;
  readonly description: string;
  readonly promptText: string;
  readonly fileName: string;
}): { readonly slug: string; readonly document: string } | null => {
  const slug = promptSdlcSkillFileName(input.fileName, input.name);
  const promptText = input.promptText.trim();
  const name = input.name.trim();
  if (slug.length === 0 || promptText.length === 0 || name.length === 0) {
    return null;
  }

  const description = input.description.replace(/\s+/g, " ").trim();
  const frontmatter = [
    "---",
    `name: ${yamlString(name)}`,
    ...(description.length > 0
      ? [`description: ${yamlString(description)}`]
      : []),
    "---",
  ];

  return {
    slug,
    document: [...frontmatter, "", promptText, ""].join("\n"),
  };
};

export const promptSdlcSkillRelativePath = (slug: string): string =>
  `.cursor/skills/${slug}/SKILL.md`;

export const promptSdlcSkillExists = (
  workingDirectory: string,
  fileName: string,
): boolean => {
  const slug = promptSdlcSkillSlug(fileName);
  if (slug.length === 0) {
    return false;
  }
  const root = path.resolve(workingDirectory);
  const skillsRoot = path.resolve(root, ".cursor", "skills");
  const absolute = path.resolve(root, promptSdlcSkillRelativePath(slug));
  if (!absolute.startsWith(`${skillsRoot}${path.sep}`)) {
    return false;
  }
  return fs.existsSync(absolute);
};

export const writePromptSdlcLocalSkill = (input: {
  readonly workingDirectory: string;
  readonly name: string;
  readonly description: string;
  readonly promptText: string;
  readonly fileName?: string;
  readonly overwrite?: boolean;
}):
  | { readonly ok: true; readonly relativePath: string }
  | {
      readonly ok: false;
      readonly errorCode: "folder" | "path" | "name" | "prompt" | "overwrite";
    } => {
  if (input.name.trim().length === 0) {
    return { ok: false, errorCode: "name" };
  }
  if (promptSdlcSkillFileName(input.fileName ?? "", input.name).length === 0) {
    return { ok: false, errorCode: "name" };
  }
  if (input.promptText.trim().length === 0) {
    return { ok: false, errorCode: "prompt" };
  }

  const root = path.resolve(input.workingDirectory);
  try {
    if (!fs.statSync(root).isDirectory()) {
      return { ok: false, errorCode: "folder" };
    }
  } catch {
    return { ok: false, errorCode: "folder" };
  }

  const skill = buildPromptSdlcSkillDocument({
    name: input.name,
    description: input.description,
    promptText: input.promptText,
    fileName: input.fileName ?? "",
  });
  if (skill === null) {
    return { ok: false, errorCode: "prompt" };
  }
  const relativePath = promptSdlcSkillRelativePath(skill.slug);
  const skillsRoot = path.resolve(root, ".cursor", "skills");
  const absolute = path.resolve(root, relativePath);
  if (!absolute.startsWith(`${skillsRoot}${path.sep}`)) {
    return { ok: false, errorCode: "path" };
  }
  if (fs.existsSync(absolute) && input.overwrite !== true) {
    return { ok: false, errorCode: "overwrite" };
  }

  try {
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, skill.document, "utf8");
  } catch {
    return { ok: false, errorCode: "folder" };
  }
  return { ok: true, relativePath };
};
