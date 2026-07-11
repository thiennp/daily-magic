import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

function createSql(): Sql {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  return neon(databaseUrl);
}

const sqlHolder: { value?: Sql } = {};

export function getSql(): Sql {
  if (!sqlHolder.value) {
    sqlHolder.value = createSql();
  }

  return sqlHolder.value;
}
