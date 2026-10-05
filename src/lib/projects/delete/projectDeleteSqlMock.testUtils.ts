import { vi } from "vitest";

export interface CapturedProjectDeleteQuery {
  readonly text: string;
  readonly values: readonly unknown[];
}

/** Tagged-template stand-in for neon: records the DELETE and returns RETURNING rows. */
export const createProjectDeleteSqlMock = (options?: {
  readonly returnProjectRow?: boolean;
}) => {
  const returnProjectRow = options?.returnProjectRow !== false;
  const calls: CapturedProjectDeleteQuery[] = [];
  const tag = vi.fn(
    async (
      strings: TemplateStringsArray,
      ...values: unknown[]
    ): Promise<Record<string, unknown>[]> => {
      calls.push({ text: strings.join("$"), values });
      if (!returnProjectRow) {
        return [];
      }
      const projectId = values[0];
      return typeof projectId === "string" ? [{ id: projectId }] : [];
    },
  );

  return Object.assign(tag, {
    calls,
    transaction: vi.fn(async () => {
      throw new Error("project delete must not use sql.transaction");
    }),
  });
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
