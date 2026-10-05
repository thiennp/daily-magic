/** In-memory stand-in for project_updated_notify_pending SQL used in tests. */
export type FakeProjectUpdatedNotifyPending = {
  project_id: string;
  state: string;
  fields: string[];
  actor_user_id: string | null;
  flush_after: Date;
  updated_at: Date;
};

export const createProjectUpdatedNotifyPendingFakeSql = () => {
  const pending = new Map<string, FakeProjectUpdatedNotifyPending>();
  const sql = async (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<unknown[]> => {
    const query = strings.join("?");
    await Promise.resolve();
    if (query.includes("CREATE TABLE IF NOT EXISTS project_updated_notify_pending")) {
      return [];
    }
    if (query.includes("CREATE INDEX IF NOT EXISTS project_updated_notify_pending_due_idx")) {
      return [];
    }
    if (query.includes("INSERT INTO project_updated_notify_pending")) {
      const [projectId, state, fields, actorUserId, flushAfter] = values as [
        string, string, string[], string | null, string,
      ];
      const existing = pending.get(projectId);
      const now = new Date();
      const flushDate = new Date(flushAfter);
      if (existing === undefined) {
        pending.set(projectId, {
          project_id: projectId, state, fields: [...fields],
          actor_user_id: actorUserId, flush_after: flushDate, updated_at: now,
        });
      } else {
        pending.set(projectId, {
          ...existing, state: "pending",
          fields: existing.state === "flushed" ? [...fields] : [...existing.fields, ...fields],
          actor_user_id: actorUserId ?? existing.actor_user_id,
          flush_after: flushDate, updated_at: now,
        });
      }
      return [{ project_id: projectId }];
    }
    if (
      query.includes("UPDATE project_updated_notify_pending") &&
      query.includes("state = 'flushed'") &&
      query.includes("updated_at <")
    ) {
      const [toState, cutoffIso] = values as [string, string];
      const cutoffMs = Date.parse(cutoffIso);
      const ids: string[] = [];
      for (const [id, row] of pending) {
        if (row.state === "flushed" && row.updated_at.getTime() < cutoffMs) {
          pending.set(id, { ...row, state: toState, updated_at: new Date() });
          ids.push(id);
        }
      }
      return ids.map((project_id) => ({ project_id }));
    }
    if (
      query.includes("UPDATE project_updated_notify_pending") &&
      query.includes("flush_after <=")
    ) {
      const [toState, nowIso] = values as [string, string];
      const nowMs = Date.parse(nowIso);
      const claimed: FakeProjectUpdatedNotifyPending[] = [];
      for (const [id, row] of pending) {
        if (row.state === "pending" && row.flush_after.getTime() <= nowMs) {
          const next = { ...row, state: toState, updated_at: new Date(nowMs) };
          pending.set(id, next);
          claimed.push(next);
        }
      }
      return claimed.map((row) => ({
        project_id: row.project_id, fields: row.fields, actor_user_id: row.actor_user_id,
      }));
    }
    if (
      query.includes("DELETE FROM project_updated_notify_pending") &&
      query.includes("state = 'flushed'")
    ) {
      const [projectId] = values as [string];
      const row = pending.get(projectId);
      if (row === undefined || row.state !== "flushed") return [];
      pending.delete(projectId);
      return [{ project_id: projectId }];
    }
    throw new Error(`unexpected query: ${query}`);
  };
  return { sql, pending };
};
