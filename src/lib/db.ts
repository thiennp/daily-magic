import { Pool, type PoolConfig } from "pg";

/**
 * Tagged-template query function with the same call shape the app used with
 * the Neon serverless driver: sql`SELECT ... ${value}` resolves to the rows.
 * Values are always sent as bind parameters ($1, $2, ...), never concatenated.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- row shape is asserted by each caller
export type SqlRow = Record<string, any>;
export interface RawSql {
  readonly rawSql: string;
}
export type Sql = ((
  strings: TemplateStringsArray,
  ...values: unknown[]
) => Promise<SqlRow[]>) & {
  /** Splices trusted, static SQL text into a template (no bind parameter). */
  unsafe: (rawSql: string) => RawSql;
};

export const unsafeSql = (rawSql: string): RawSql => ({ rawSql });

const isRawSql = (value: unknown): value is RawSql =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as RawSql).rawSql === "string";

const POOL_MAX = 10;
const IDLE_TIMEOUT_MS = 30_000;
const CONNECTION_TIMEOUT_MS = 10_000;

export const isDatabaseUrlConfigured = (): boolean => {
  const databaseUrl = process.env.DATABASE_URL;
  return typeof databaseUrl === "string" && databaseUrl.trim().length > 0;
};

export const buildPoolConfig = (connectionString: string): PoolConfig => ({
  connectionString,
  max: POOL_MAX,
  idleTimeoutMillis: IDLE_TIMEOUT_MS,
  connectionTimeoutMillis: CONNECTION_TIMEOUT_MS,
});

export const createPool = (connectionString: string): Pool => {
  const pool = new Pool(buildPoolConfig(connectionString));
  // An idle client dropped by the server must not crash the process.
  pool.on("error", (error) => {
    console.error("[db] idle client error", error.message);
  });
  return pool;
};

export const toParameterizedQuery = (
  strings: TemplateStringsArray,
  values: readonly unknown[],
): { text: string; values: unknown[] } => {
  const bound: unknown[] = [];
  const text = strings.reduce((acc, part, index) => {
    if (index === 0) {
      return part;
    }
    const value = values[index - 1];
    if (isRawSql(value)) {
      return `${acc}${value.rawSql}${part}`;
    }
    bound.push(value);
    return `${acc}$${bound.length}${part}`;
  }, "");

  return { text, values: bound };
};

export const createSqlFromPool = (pool: Pick<Pool, "query">): Sql => {
  const run = async (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<SqlRow[]> => {
    const query = toParameterizedQuery(strings, values);
    const result = await pool.query(query.text, query.values);
    return result.rows as SqlRow[];
  };

  return Object.assign(run, { unsafe: unsafeSql });
};

export const createSql = (connectionString: string): Sql =>
  createSqlFromPool(createPool(connectionString));

// Cached on globalThis so Next.js dev hot reloads reuse one pool.
const globalForDb = globalThis as typeof globalThis & { __dbSql?: Sql };

export function getSql(): Sql {
  if (!globalForDb.__dbSql) {
    if (!isDatabaseUrlConfigured()) {
      throw new Error("DATABASE_URL is not set");
    }
    globalForDb.__dbSql = createSql(process.env.DATABASE_URL as string);
  }

  return globalForDb.__dbSql;
}

export function asRowArray(rows: unknown): Record<string, unknown>[] {
  if (Array.isArray(rows)) {
    return rows as Record<string, unknown>[];
  }

  return [];
}
