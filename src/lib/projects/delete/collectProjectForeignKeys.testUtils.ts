import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export interface ForeignKeyRef {
  readonly table: string;
  readonly column: string;
  readonly parent: string;
  readonly action: string;
}

const ROOT = process.cwd();

const SQL_SOURCES = [
  "db/schema.sql",
  ...readdirSync(path.join(ROOT, "db/migrations"))
    .filter((name) => name.endsWith(".sql"))
    .sort()
    .map((name) => `db/migrations/${name}`),
  "src/lib/projects/acl/ensureProjectAclSchema.ts",
  "src/lib/projects/acl/ensureProjectInviteHooksSchema.ts",
];

const refsInCreate = (statement: string): ForeignKeyRef[] => {
  const table = /CREATE TABLE IF NOT EXISTS (\w+)/.exec(statement)?.[1];
  if (table === undefined) return [];
  return [
    ...statement.matchAll(
      /(\w+)\s+TEXT[^,]*?REFERENCES (\w+)\(id\)\s+ON DELETE (CASCADE|SET NULL)/g,
    ),
  ].map((m) => ({ table, column: m[1], parent: m[2], action: m[3] }));
};

const refsInAlter = (statement: string): ForeignKeyRef[] => {
  const table = /ALTER TABLE (\w+)/.exec(statement)?.[1];
  if (table === undefined) return [];
  const added = [
    ...statement.matchAll(
      /ADD COLUMN (?:IF NOT EXISTS )?(\w+)[^;]*?REFERENCES (\w+)\(id\)\s+ON DELETE (CASCADE|SET NULL)/g,
    ),
    ...statement.matchAll(
      /FOREIGN KEY \((\w+)\) REFERENCES (\w+)\(id\)\s+ON DELETE (CASCADE|SET NULL)/g,
    ),
  ];
  return added.map((m) => ({
    table,
    column: m[1],
    parent: m[2],
    action: m[3],
  }));
};

/** Live FKs after replaying schema.sql, migrations in order, and ensure*Schema DDL. */
export const collectLiveForeignKeys = (): ForeignKeyRef[] => {
  const byKey = new Map<string, ForeignKeyRef>();
  for (const source of SQL_SOURCES) {
    const text = readFileSync(path.join(ROOT, source), "utf8");
    for (const statement of text.split(/[;`]/)) {
      const dropped = /DROP TABLE IF EXISTS (\w+)/.exec(statement)?.[1];
      if (dropped !== undefined) {
        for (const key of [...byKey.keys()]) {
          if (key.startsWith(`${dropped}.`)) byKey.delete(key);
        }
      }
      for (const ref of [
        ...refsInCreate(statement),
        ...refsInAlter(statement),
      ]) {
        byKey.set(`${ref.table}.${ref.column}`, ref);
      }
    }
  }
  return [...byKey.values()];
};
