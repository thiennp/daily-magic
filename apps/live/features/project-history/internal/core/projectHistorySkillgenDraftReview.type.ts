/** Local skill draft review — list/editor row under skills/_drafts. */
export type ProjectHistorySkillgenDraftReviewItem = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly source: "History" | "Computer";
  readonly updatedAt: string;
  readonly pathLabel: string;
};
