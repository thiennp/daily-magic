import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

/** Case-insensitive match on bot name, token prefix and project names. */
export const filterMyBots = (
  bots: readonly OwnedBotView[],
  query: string,
): readonly OwnedBotView[] => {
  const needle = query.trim().toLowerCase();
  if (needle === "") return bots;
  return bots.filter((bot) =>
    [
      bot.displayName ?? "",
      bot.tokenPrefix,
      ...bot.memberships.map(
        (m) => `${m.projectName} ${m.projectDisplayName ?? ""}`,
      ),
    ]
      .join(" ")
      .toLowerCase()
      .includes(needle),
  );
};
