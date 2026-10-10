export type Project = { owner: string; stored: unknown };
export const projects = new Map<string, Project>();

export const fakeSql = async (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => {
  const q = strings.join("?");
  if (q.includes("ALTER TABLE")) return [];
  if (q.includes("UPDATE user_projects")) {
    const [stored, id, actor] = values as [string, string, string];
    const p = projects.get(id);
    if (p === undefined || p.owner !== actor) return [];
    p.stored = JSON.parse(stored);
    return [{ id }];
  }
  if (q.includes("FROM user_projects")) {
    const p = projects.get(values[0] as string);
    return p === undefined
      ? []
      : [{ owner_user_id: p.owner, member_permissions: p.stored }];
  }
  throw new Error(`unexpected sql: ${q}`);
};
