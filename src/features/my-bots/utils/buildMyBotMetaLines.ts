import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

export interface MyBotMetaLines {
  readonly project: string;
  readonly claimed: string;
}

/** Project line ("In X, Y" or "Not in a project") and claimed date for a bot card. */
export const buildMyBotMetaLines = (bot: OwnedBotView): MyBotMetaLines => {
  const names = bot.memberships.map(
    (m) => m.projectDisplayName ?? m.projectName,
  );
  const date = bot.claimedAt === null ? null : new Date(bot.claimedAt);
  return {
    project:
      names.length > 0
        ? `${MY_BOTS_COPY.inProject} ${names.join(", ")}`
        : MY_BOTS_COPY.notInProject,
    claimed:
      date === null || Number.isNaN(date.getTime())
        ? `${bot.tokenPrefix}…`
        : `Claimed ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
  };
};
