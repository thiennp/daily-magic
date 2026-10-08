import { estimateKnowledgeTokens } from "./estimateKnowledgeTokens";
import type { EpisodeKind } from "./episode.types";
import type { ScoredEpisodeCard } from "./scoreKnowledgeCards";

const KIND_RANK: Record<EpisodeKind, number> = {
  mistake: 0,
  fix: 1,
  decision: 2,
  lesson: 3,
};

const KIND_LABEL: Record<EpisodeKind, string> = {
  mistake: "AVOID",
  fix: "PRIOR FIX",
  decision: "DECISION",
  lesson: "NOTE",
};

const HEADER = "Project notes (local, verify before trusting):\n";
const FOOTER = "\n---\n\n";
const MAX_FILES_SHOWN = 3;
const SHORT_SHA_LENGTH = 7;

export type PackedKnowledge = {
  readonly text: string;
  readonly cards: readonly ScoredEpisodeCard[];
  readonly tokens: number;
};

const basename = (filePath: string): string =>
  filePath.split("/").filter(Boolean).pop() ?? filePath;

export const formatKnowledgeCardLine = (entry: ScoredEpisodeCard): string => {
  const { card } = entry;
  const files =
    card.files.length > 0
      ? ` [files: ${card.files.slice(0, MAX_FILES_SHOWN).map(basename).join(", ")}]`
      : "";
  const sha = card.commitShas[0];
  const commit =
    sha !== undefined ? ` [commit ${sha.slice(0, SHORT_SHA_LENGTH)}]` : "";
  return `- ${KIND_LABEL[card.kind]}: ${card.takeaway}${files}${commit}`;
};

/** Priority pack: mistakes first, stop when the token budget is reached. */
export const packKnowledgeCardsToBudget = (input: {
  readonly cards: readonly ScoredEpisodeCard[];
  readonly tokenBudget: number;
  readonly maxCards: number;
  readonly promptText: string;
}): PackedKnowledge => {
  const ordered = [...input.cards].sort(
    (left, right) =>
      KIND_RANK[left.card.kind] - KIND_RANK[right.card.kind] ||
      right.score - left.score,
  );
  const overhead = estimateKnowledgeTokens(HEADER + FOOTER);
  const packed: ScoredEpisodeCard[] = [];
  const lines: string[] = [];
  let used = overhead;

  for (const entry of ordered) {
    if (packed.length >= input.maxCards) {
      break;
    }
    if (input.promptText.includes(entry.card.takeaway)) {
      continue;
    }
    const line = formatKnowledgeCardLine(entry);
    const cost = estimateKnowledgeTokens(`${line}\n`);
    if (used + cost > input.tokenBudget) {
      continue;
    }
    packed.push(entry);
    lines.push(line);
    used += cost;
  }

  if (packed.length === 0) {
    return { text: "", cards: [], tokens: 0 };
  }

  return {
    text: `${HEADER}${lines.join("\n")}${FOOTER}`,
    cards: packed,
    tokens: used,
  };
};
