import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/public-api/types";

export type OverviewRecentItem = {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
  readonly preview: string;
  readonly at: string | null;
};

const initialsFrom = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
};

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max)}…` : text;

/** Newest thread previews across whole-project + assistants (max 3). */
const buildOverviewRecentActivity = (
  threads: AwcMessengerThreadList | null,
  limit: number = 3,
): readonly OverviewRecentItem[] => {
  if (threads === null) {
    return [];
  }
  const rows: OverviewRecentItem[] = [];
  if (threads.wholeProject.lastPreview !== null) {
    rows.push({
      id: "whole",
      name: AWC_PROJECT_MESSENGER_COPY.wholeName,
      initials: "★",
      preview: truncate(threads.wholeProject.lastPreview, 90),
      at: threads.wholeProject.lastMessageAt,
    });
  }
  for (const bot of threads.bots) {
    if (bot.lastPreview === null) {
      continue;
    }
    const name = bot.displayName?.trim() || "Assistant";
    rows.push({
      id: bot.membershipId,
      name,
      initials: initialsFrom(name),
      preview: truncate(bot.lastPreview, 90),
      at: bot.lastMessageAt,
    });
  }
  return [...rows]
    .sort((a, b) => {
      const aMs = a.at === null ? 0 : Date.parse(a.at);
      const bMs = b.at === null ? 0 : Date.parse(b.at);
      const safeA = Number.isNaN(aMs) ? 0 : aMs;
      const safeB = Number.isNaN(bMs) ? 0 : bMs;
      return safeB - safeA;
    })
    .slice(0, limit);
};

export default buildOverviewRecentActivity;
