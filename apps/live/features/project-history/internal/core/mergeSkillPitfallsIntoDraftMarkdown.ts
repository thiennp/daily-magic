import { normalizeProjectHistoryPitfallText } from "./normalizeProjectHistoryPitfallText";
import { PROJECT_HISTORY_PITFALL_MAX_PER_DRAFT } from "./projectHistory.constants";

export type MergeSkillPitfallsIntoDraftMarkdownInput = {
  readonly skillMarkdown: string;
  readonly newPitfallLines: readonly string[];
  readonly maxBullets?: number;
};

export type MergeSkillPitfallsIntoDraftMarkdownResult = {
  readonly skillMarkdown: string;
  readonly appendedCount: number;
  readonly totalPitfallBullets: number;
};

const extractExistingBullets = (sectionBody: string): readonly string[] => {
  const bullets: string[] = [];
  for (const line of sectionBody.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (/^[-*]\s+\S/.test(trimmed)) {
      bullets.push(trimmed.replace(/^\*\s+/, "- "));
    } else if (/^\d+\.\s+\S/.test(trimmed)) {
      bullets.push(trimmed.replace(/^\d+\.\s+/, "- "));
    }
  }
  return bullets;
};

/**
 * Append-merge Pitfalls bullets: keep existing order, append new, dedupe by
 * normalized text, cap total bullets. Creates ## Pitfalls if missing.
 */
export const mergeSkillPitfallsIntoDraftMarkdown = (
  input: MergeSkillPitfallsIntoDraftMarkdownInput,
): MergeSkillPitfallsIntoDraftMarkdownResult => {
  const maxBullets = input.maxBullets ?? PROJECT_HISTORY_PITFALL_MAX_PER_DRAFT;
  const markdown = input.skillMarkdown;
  const sectionRe =
    /(^|\n)(##\s*Pitfalls\s*\n)([\s\S]*?)(?=\n##\s+\S|$)/i;
  const match = markdown.match(sectionRe);
  const existingBullets = match ? extractExistingBullets(match[3] ?? "") : [];
  const seen = new Set(
    existingBullets.map((b) => normalizeProjectHistoryPitfallText(b)),
  );
  const merged = [...existingBullets];
  let appendedCount = 0;
  for (const line of input.newPitfallLines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    const bullet = trimmed.startsWith("- ") ? trimmed : `- ${trimmed}`;
    const norm = normalizeProjectHistoryPitfallText(bullet);
    if (seen.has(norm)) {
      continue;
    }
    if (merged.length >= maxBullets) {
      break;
    }
    seen.add(norm);
    merged.push(bullet);
    appendedCount += 1;
  }

  const sectionBody =
    merged.length > 0 ? `${merged.join("\n")}\n` : "(none yet)\n";

  if (match) {
    const skillMarkdown = markdown.replace(
      sectionRe,
      (_whole, lead: string, headerLine: string) =>
        `${lead}${headerLine}${sectionBody}`,
    );
    return {
      skillMarkdown,
      appendedCount,
      totalPitfallBullets: merged.length,
    };
  }

  const suffix = markdown.endsWith("\n") ? "" : "\n";
  return {
    skillMarkdown: `${markdown}${suffix}\n## Pitfalls\n${sectionBody}`,
    appendedCount,
    totalPitfallBullets: merged.length,
  };
};
