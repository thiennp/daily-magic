import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

export type MyBotsProjectFilter = "all" | "in_project" | "not_in_project";

/** Keep bots by whether they belong to at least one project. */
export const filterMyBotsByProject = (
  bots: readonly OwnedBotView[],
  filter: MyBotsProjectFilter,
): readonly OwnedBotView[] => {
  if (filter === "all") return bots;
  const wantMember = filter === "in_project";
  return bots.filter((bot) => bot.memberships.length > 0 === wantMember);
};

/** Counts for the filter chips, from the bots the search already narrowed. */
export const countMyBotsByProject = (
  bots: readonly OwnedBotView[],
): Readonly<Record<MyBotsProjectFilter, number>> => ({
  all: bots.length,
  in_project: filterMyBotsByProject(bots, "in_project").length,
  not_in_project: filterMyBotsByProject(bots, "not_in_project").length,
});
