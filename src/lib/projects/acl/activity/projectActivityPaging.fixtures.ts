type Row = {
  id: string;
  project_id: string;
  event_type: string;
  actor_kind: string;
  created_at: string;
};

const newerFirst = (a: Row, b: Row): number =>
  a.created_at === b.created_at
    ? b.id.localeCompare(a.id)
    : b.created_at.localeCompare(a.created_at);

/** In-memory stand-in for the keyset query and the retention DELETE. */
export const createActivityPagingStore = () => {
  const rows: Row[] = [];
  const add = (id: string, createdAt: string) =>
    rows.push({
      id,
      project_id: "proj-1",
      event_type: "invite.created",
      actor_kind: "owner",
      created_at: createdAt,
    });
  const sql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const q = String(strings);
    if (q.includes("FROM project_activity_events e")) {
      const [projectId, cursorAt, , cursorId] = values as (string | null)[];
      const limit = Number(values[8]);
      return rows
        .filter((r) => r.project_id === projectId)
        .filter(
          (r) =>
            cursorAt === null ||
            r.created_at < cursorAt ||
            (r.created_at === cursorAt && r.id < String(cursorId)),
        )
        .sort(newerFirst)
        .slice(0, limit)
        .map((r) => ({ ...r, cursor_at: r.created_at, detail: {} }));
    }
    if (q.includes("DELETE FROM project_activity_events")) {
      const keep = new Set(rows.sort(newerFirst).slice(0, Number(values[3])).map((r) => r.id));
      const kept = rows.filter((r) => keep.has(r.id));
      rows.splice(0, rows.length, ...kept);
    }
    return [];
  };
  return { rows, add, sql };
};
