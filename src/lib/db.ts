import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

export const isDatabaseUrlConfigured = (): boolean => {
  const databaseUrl = process.env.DATABASE_URL;
  return typeof databaseUrl === "string" && databaseUrl.trim().length > 0;
};

function createSql(): Sql {
  if (!isDatabaseUrlConfigured()) {
    throw new Error("DATABASE_URL is not set");
  }

  return neon(process.env.DATABASE_URL as string);
}

const sqlHolder: { value?: Sql } = {};

export function getSql(): Sql {
  if (!sqlHolder.value) {
    sqlHolder.value = createSql();
  }

  return sqlHolder.value;
}

export function asRowArray(rows: unknown): Record<string, unknown>[] {
  if (Array.isArray(rows)) {
    return rows as Record<string, unknown>[];
  }

  return [];
}
