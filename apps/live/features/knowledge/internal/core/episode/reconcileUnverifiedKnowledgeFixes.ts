import type { KnowledgeDatabase } from "./knowledgeDb";
import {
  attachCommitsToEpisode,
  listUnverifiedFixesTouching,
} from "./knowledgeStore";
import {
  readRecentGitCommitsWithFiles,
  type GitRecentCommit,
} from "./readGitRunChanges";

const basename = (filePath: string): string =>
  filePath.split("/").filter(Boolean).pop() ?? filePath;

/** Pure matching: commits made after the card that touch at least one of its files. */
export const matchCommitsToUnverifiedFix = (input: {
  readonly cardFiles: readonly string[];
  readonly cardCreatedAt: string;
  readonly commits: readonly GitRecentCommit[];
}): string[] => {
  const cardNames = new Set(input.cardFiles.map(basename));
  if (cardNames.size === 0) {
    return [];
  }
  return input.commits
    .filter(
      (commit) =>
        Date.parse(commit.committedAt) >= Date.parse(input.cardCreatedAt) &&
        commit.files.some((file) => cardNames.has(basename(file))),
    )
    .map((commit) => commit.sha);
};

/** Attach commit SHAs to fixes the user committed after the run ended. */
export const reconcileUnverifiedKnowledgeFixes = async (input: {
  readonly db: KnowledgeDatabase;
  readonly projectKey: string;
  readonly projectFolderPath: string;
}): Promise<void> => {
  const pending = listUnverifiedFixesTouching(input.db, input.projectKey);
  if (pending.length === 0) {
    return;
  }
  const since = pending.reduce(
    (oldest, card) => (card.createdAt < oldest ? card.createdAt : oldest),
    pending[0]?.createdAt ?? new Date().toISOString(),
  );
  const commits = await readRecentGitCommitsWithFiles({
    projectFolderPath: input.projectFolderPath,
    since,
  });
  for (const card of pending) {
    const shas = matchCommitsToUnverifiedFix({
      cardFiles: card.files,
      cardCreatedAt: card.createdAt,
      commits,
    });
    if (shas.length > 0) {
      attachCommitsToEpisode(input.db, card.id, shas);
    }
  }
};
