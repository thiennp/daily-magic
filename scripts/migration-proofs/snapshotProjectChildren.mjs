// Per-table row counts and project_id of every row, keyed by primary key.
const CHILD_TABLES_SQL = `
  SELECT DISTINCT c.table_name
  FROM information_schema.columns c
  JOIN information_schema.tables t
    ON t.table_name = c.table_name AND t.table_schema = c.table_schema
  WHERE c.table_schema = 'public' AND c.column_name = 'project_id'
    AND t.table_type = 'BASE TABLE'
  ORDER BY 1`;

const primaryKeyColumns = async (db, table) => {
  const result = await db.query(
    `SELECT a.attname AS col
     FROM pg_index i
     JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
     WHERE i.indrelid = $1::regclass AND i.indisprimary
     ORDER BY a.attname`,
    [table],
  );
  return result.rows.map((row) => row.col);
};

const snapshotTable = async (db, table, hasProjectId) => {
  const keys = await primaryKeyColumns(db, table);
  const keyExpr = keys.length > 0
    ? keys.map((k) => `"${k}"::text`).join(" || '|' || ")
    : "md5(row_to_json(x)::text)";
  const projectExpr = hasProjectId ? "project_id" : "NULL::text";
  const result = await db.query(
    `SELECT ${keyExpr} AS key, ${projectExpr} AS project_id FROM "${table}" x`,
  );
  return Object.fromEntries(result.rows.map((row) => [row.key, row.project_id]));
};

export const snapshotProjectChildren = async (db) => {
  const tables = (await db.query(CHILD_TABLES_SQL)).rows.map((r) => r.table_name);
  if (!tables.includes("published_capabilities")) tables.push("published_capabilities");
  const snapshot = {};
  for (const table of tables) {
    const hasProjectId = (await db.query(
      `SELECT 1 FROM information_schema.columns
       WHERE table_name = $1 AND column_name = 'project_id'`,
      [table],
    )).rows.length > 0;
    snapshot[table] = await snapshotTable(db, table, hasProjectId);
  }
  const projects = await db.query(
    "SELECT id, owner_user_id, device_id, name FROM user_projects ORDER BY id",
  );
  snapshot.user_projects = Object.fromEntries(
    projects.rows.map((p) => [p.id, `${p.owner_user_id}|${p.device_id}|${p.name}`]),
  );
  return snapshot;
};

export const countsOf = (snapshot) =>
  Object.fromEntries(
    Object.entries(snapshot)
      .filter(([, rows]) => Object.keys(rows).length > 0)
      .map(([table, rows]) => [table, Object.keys(rows).length]),
  );
