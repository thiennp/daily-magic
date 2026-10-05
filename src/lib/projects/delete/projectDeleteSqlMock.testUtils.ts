import { vi } from "vitest";

export interface CapturedProjectDeleteQuery {
  readonly text: string;
  readonly values: readonly unknown[];
}

/** Tagged-template stand-in for neon: builds inspectable query objects, never sends them. */
export const createProjectDeleteSqlMock = () => {
  const tag = vi.fn(
    (
      strings: TemplateStringsArray,
      ...values: unknown[]
    ): CapturedProjectDeleteQuery => ({
      text: strings.join("$"),
      values,
    }),
  );
  const transaction = vi.fn(
    async (queries: readonly CapturedProjectDeleteQuery[]) =>
      queries.map((query, index) =>
        index === queries.length - 1 ? [{ id: query.values[0] }] : [],
      ),
  );

  return Object.assign(tag, { transaction });
};

export const extractDeletedTableName = (text: string): string =>
  /DELETE FROM (\w+)/.exec(text)?.[1] ?? "";

export const OWNER_PROJECT = {
  id: "proj-owned-1",
  ownerUserId: "owner-1",
  deviceId: "device-other-mac",
  name: "Client repo",
  folderPath: "/Users/someone/projects/client",
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
} as const;
