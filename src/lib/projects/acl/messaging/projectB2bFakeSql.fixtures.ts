/** In-memory stand-in for the delivery queries used by the silence check. */
export type FakeB2bDelivery = {
  id: string;
  message_id: string;
  membership_id: string;
  b2b_state: string;
  last_activity_at: Date;
  /** Wake S4 contract; default webhook keeps silence path. */
  delivery_mode?: "webhook" | "poll";
};

export const createProjectB2bFakeSql = () => {
  const deliveries = new Map<string, FakeB2bDelivery>();
  const sql = async (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<unknown[]> => {
    const query = strings.join("?");
    // Let concurrent callers interleave between read and write.
    await Promise.resolve();
    if (query.includes("SELECT d.id, d.message_id")) {
      const [states, nowIso, secs] = values as [string[], string, number];
      const cutoffMs = Date.parse(nowIso) - secs * 1_000;
      return [...deliveries.values()]
        .filter(
          (d) =>
            states.includes(d.b2b_state) &&
            d.last_activity_at.getTime() <= cutoffMs,
        )
        .map((d) => ({
          ...d,
          project_id: "proj-1",
          sender_membership_id: "mem-a",
          sender_user_id: "user-a",
          sender_display_name: "Bot A",
          peer_display_name: "Bot B",
          peer_delivery_mode: d.delivery_mode ?? "webhook",
        }));
    }
    if (query.includes("SELECT d.id, d.b2b_state")) {
      const [fromMembershipId, toIds] = values as [string, string[]];
      return toIds.includes("mem-a")
        ? [...deliveries.values()].filter(
            (d) => d.membership_id === fromMembershipId,
          )
        : [];
    }
    if (query.includes("SET b2b_state") && query.includes("last_activity_at =")) {
      // b2b_state, b2b_state_at, last_activity_at, id, from — or start-watch shape
      if (query.includes("b2b_state IS NULL")) {
        return [];
      }
      const [to, , activityAt, id, from] = values as [
        string,
        string,
        string,
        string,
        string,
      ];
      const row = deliveries.get(id);
      if (row === undefined || row.b2b_state !== from) {
        return [];
      }
      deliveries.set(id, {
        ...row,
        b2b_state: to,
        last_activity_at: new Date(activityAt),
      });
      return [{ id }];
    }
    if (query.includes("SET b2b_state")) {
      const [to, , id, from] = values as [string, string, string, string];
      const row = deliveries.get(id);
      if (row === undefined || row.b2b_state !== from) {
        return [];
      }
      deliveries.set(id, { ...row, b2b_state: to });
      return [{ id }];
    }
    if (query.includes("SET last_activity_at")) {
      const [atIso, id, from] = values as [string, string, string];
      const row = deliveries.get(id);
      if (row === undefined || row.b2b_state !== from) {
        return [];
      }
      deliveries.set(id, { ...row, last_activity_at: new Date(atIso) });
      return [{ id }];
    }
    throw new Error(`unexpected query: ${query}`);
  };
  return { sql, deliveries };
};
