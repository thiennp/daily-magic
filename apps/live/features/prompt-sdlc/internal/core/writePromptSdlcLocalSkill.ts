import fs from "node:fs";
import path from "node:path";

const skillSlug = (goal: string): string => {
  const slug = goal
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");

  return slug.length > 0 ? slug : "prompt";
};

const yamlString = (value: string): string =>
  JSON.stringify(value.replace(/\s+/g, " ").trim().slice(0, 240));

export const buildPromptSdlcSkillDocument = (input: {
  readonly goal: string;
  readonly promptText: string;
}): { readonly slug: string; readonly document: string } => {
  const slug = skillSlug(input.goal);
  return {
    slug,
    document: [
      "---",
      `name: ${yamlString(slug)}`,
      `description: ${yamlString(input.goal)}`,
      "---",
      "",
      input.promptText.trim(),
      "",
    ].join("\n"),
  };
};

export const promptSdlcSkillRelativePath = (slug: string): string =>
  `.cursor/skills/${slug}/SKILL.md`;

export const writePromptSdlcLocalSkill = (input: {
  readonly workingDirectory: string;
  readonly goal: string;
  readonly promptText: string;
}):
  | { readonly ok: true; readonly relativePath: string }
  | { readonly ok: false; readonly errorCode: "folder" | "path" } => {
  const root = path.resolve(input.workingDirectory);
  try {
    if (!fs.statSync(root).isDirectory()) {
      return { ok: false, errorCode: "folder" };
    }
  } catch {
    return { ok: false, errorCode: "folder" };
  }

  const skill = buildPromptSdlcSkillDocument(input);
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
