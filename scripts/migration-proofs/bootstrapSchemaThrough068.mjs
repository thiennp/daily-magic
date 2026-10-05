// Build the real prod schema in PGlite: db/schema.sql snapshot (through 018),
// then every later migration except 069, in db-migrate order.
import fs from "node:fs";
import path from "node:path";

const stripExtensions = (sql) => sql.replace(/CREATE EXTENSION[^;]*;/gi, "");

const splitStatements = (sql) => {
  const out = [];
  let current = "";
  let inDollar = false;
  for (const line of sql.split("\n")) {
    current += `${line}\n`;
    if ((line.match(/\$\$/g) ?? []).length % 2 === 1) inDollar = !inDollar;
    if (!inDollar && /;\s*(--.*)?$/.test(line)) {
      out.push(current);
      current = "";
    }
  }
  out.push(current);
  return out.filter((s) => s.replace(/--.*$/gm, "").trim().length > 0);
};

// schema.sql is not dependency-ordered; retry failed statements until stable.
const applySchemaSnapshot = async (db, root) => {
  const raw = fs.readFileSync(path.join(root, "db/schema.sql"), "utf8");
  let pending = splitStatements(stripExtensions(raw));
  for (let pass = 0; pass < 10 && pending.length > 0; pass += 1) {
    const failed = [];
    for (const statement of pending) {
      try {
        await db.exec(statement);
      } catch {
        failed.push(statement);
      }
    }
    if (failed.length === pending.length) break;
    pending = failed;
  }
  if (pending.length > 0) {
    throw new Error(`schema.sql: ${pending.length} statement(s) never applied`);
  }
};

export const readMigrationSql = (root, filename) =>
  stripExtensions(fs.readFileSync(path.join(root, "db/migrations", filename), "utf8"));

export const bootstrapSchemaThrough068 = async (db, root) => {
  await applySchemaSnapshot(db, root);
  const files = fs
    .readdirSync(path.join(root, "db/migrations"))
    .filter((f) => f.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
  const cut = files.indexOf("018-onboarding-setup-acknowledged.sql");
  for (const filename of files.slice(cut + 1)) {
    if (filename.startsWith("069-")) continue;
    await db.exec(readMigrationSql(root, filename));
    await db.query("INSERT INTO schema_migrations (filename) VALUES ($1)", [filename]);
  }
};
