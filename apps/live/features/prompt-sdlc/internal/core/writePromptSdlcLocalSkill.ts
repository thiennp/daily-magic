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

export const buildPromptSdlcSkillDocument = (input: {
  readonly name: string;
  readonly description: string;
  readonly promptText: string;
}): { readonly slug: string; readonly document: string } | null => {
  const slug = promptSdlcSkillSlug(input.name);
  const promptText = input.promptText.trim();
  if (slug.length === 0 || promptText.length === 0) {
    return null;
  }

  const description = input.description.replace(/\s+/g, " ").trim();
  const frontmatter = [
    "---",
    `name: ${yamlString(slug)}`,
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

export const writePromptSdlcLocalSkill = (input: {
  readonly workingDirectory: string;
  readonly name: string;
  readonly description: string;
  readonly promptText: string;
}):
  | { readonly ok: true; readonly relativePath: string }
  | {
      readonly ok: false;
      readonly errorCode: "folder" | "path" | "name" | "prompt";
    } => {
  if (promptSdlcSkillSlug(input.name).length === 0) {
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

  const skill = buildPromptSdlcSkillDocument(input);
  if (skill === null) {
    return { ok: false, errorCode: "prompt" };
  }
  const relativePath = promptSdlcSkillRelativePath(skill.slug);
  const skillsRoot = path.resolve(root, ".cursor", "skills");
  const absolute = path.resolve(root, relativePath);
  if (!absolute.startsWith(`${skillsRoot}${path.sep}`)) {
    return { ok: false, errorCode: "path" };
  }

  try {
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, skill.document, "utf8");
  } catch {
    return { ok: false, errorCode: "folder" };
  }
  return { ok: true, relativePath };
};
