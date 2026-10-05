import type { ProjectMessengerDelivery } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Deliveries (newest message first) → by message id and by bot membership id. */
export const groupProjectMessengerDeliveries = (
  deliveries: readonly ProjectMessengerDelivery[],
): {
  readonly byMessage: ReadonlyMap<string, readonly ProjectMessengerDelivery[]>;
  readonly byMembership: ReadonlyMap<
    string,
    readonly ProjectMessengerDelivery[]
  >;
} => {
  const byMessage = new Map<string, ProjectMessengerDelivery[]>();
  const byMembership = new Map<string, ProjectMessengerDelivery[]>();
  for (const delivery of deliveries) {
    byMessage.set(delivery.messageId, [
      ...(byMessage.get(delivery.messageId) ?? []),
      delivery,
    ]);
    byMembership.set(delivery.membershipId, [
      ...(byMembership.get(delivery.membershipId) ?? []),
      delivery,
    ]);
  }
  return { byMessage, byMembership };
};
