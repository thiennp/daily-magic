import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { checkProjectMessageSilence } from "@/lib/projects/acl/messaging/checkProjectMessageSilence";
import { groupProjectMessengerDeliveries } from "@/lib/projects/acl/messaging/messenger/groupProjectMessengerDeliveries";
import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  loadProjectMessengerBots,
  type ProjectMessengerBotSeat,
} from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";
import { loadProjectMessengerDeliveries } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerDeliveries";
import { loadProjectMessengerLatestWakes } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerLatestWakes";
import { loadProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerRows";
import type {
  ProjectMessengerDelivery,
  ProjectMessengerKeyedRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { purgeExpiredProjectMessages } from "@/lib/projects/acl/messaging/purgeExpiredProjectMessages";

export type ProjectMessengerSnapshot = {
  readonly bots: readonly ProjectMessengerBotSeat[];
  readonly botsById: ReadonlyMap<string, ProjectMessengerBotSeat>;
  readonly keyed: readonly ProjectMessengerKeyedRow[];
  readonly deliveriesByMessage: ReadonlyMap<
    string,
    readonly ProjectMessengerDelivery[]
  >;
  readonly deliveriesByMembership: ReadonlyMap<
    string,
    readonly ProjectMessengerDelivery[]
  >;
  readonly latestWakeByMembership: ReadonlyMap<string, string>;
};

/**
 * Read side, in order: same housekeeping as the inbox (TTL purge, the one
 * 5/10 minute silence check — no second timer), then bots, live rows,
 * deliveries, and latest wakes; rows are placed in threads.
 */
export const loadProjectMessengerSnapshot = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ProjectMessengerSnapshot> => {
  await ensureProjectAclSchema();
  await purgeExpiredProjectMessages();
  await checkProjectMessageSilence({ now: new Date() });
  const bots = await loadProjectMessengerBots(input.projectId);
  const rows = await loadProjectMessengerRows(input);
  const deliveries = await loadProjectMessengerDeliveries(input.projectId);
  const latestWakeByMembership = await loadProjectMessengerLatestWakes(
    input.projectId,
  );
  const grouped = groupProjectMessengerDeliveries(deliveries);
  return {
    bots,
    botsById: new Map(bots.map((bot) => [bot.membershipId, bot])),
    keyed: keyProjectMessengerRows({
      rows,
      botIds: new Set(bots.map((bot) => bot.membershipId)),
    }),
    deliveriesByMessage: grouped.byMessage,
    deliveriesByMembership: grouped.byMembership,
    latestWakeByMembership,
  };
};
