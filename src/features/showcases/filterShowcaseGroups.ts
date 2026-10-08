import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export interface ShowcaseGroup {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly articles: readonly ShowcaseArticle[];
}

export const ALL_SHOWCASE_GROUPS = "all" as const;

const matchesQuery = (article: ShowcaseArticle, query: string): boolean =>
  query === "" ||
  `${article.title} ${article.subtitle} ${article.category}`
    .toLowerCase()
    .includes(query);

export const filterShowcaseGroups = (
  groups: readonly ShowcaseGroup[],
  query: string,
  groupId: string,
): readonly ShowcaseGroup[] => {
  const needle = query.trim().toLowerCase();
  return groups
    .filter((group) => groupId === ALL_SHOWCASE_GROUPS || group.id === groupId)
    .map((group) => ({
      ...group,
      articles: group.articles.filter((a) => matchesQuery(a, needle)),
    }))
    .filter((group) => group.articles.length > 0);
};
