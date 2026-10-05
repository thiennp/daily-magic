import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectUpdatedNotifyPendingFakeSql } from "@/lib/projects/acl/messaging/projectUpdatedNotifyPendingFakeSql.fixtures";

const fake = vi.hoisted(() => ({
  sql: null as unknown,
  pending: null as ReturnType<
    typeof createProjectUpdatedNotifyPendingFakeSql
  >["pending"] | null,
}));
const notifyMock = vi.hoisted(() =>
  vi.fn(async (_input: unknown): Promise<{ notifiedPeerCount: number }> => ({ notifiedPeerCount: 1 })),
);

vi.mock("@/lib/db", () => ({
  getSql: () => fake.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

vi.mock(
  "@/lib/projects/acl/messaging/notifyProjectMembersOfProjectUpdated",
  () => ({
    notifyProjectMembersOfProjectUpdated: (input: unknown) =>
      notifyMock(input),
  }),
);

import { POST } from "@/app/api/cron/project-updated-notify/route";
import {
  CRON_SECRET_ENV,
  CRON_SECRET_HEADER,
} from "@/lib/cron/cronSecret.constants";
import { resetProjectUpdatedNotifyPendingSchemaEnsureForTests } from "@/lib/projects/acl/messaging/ensureProjectUpdatedNotifyPendingSchema";

const call = (secret?: string) =>
  POST(
    new Request("http://localhost/api/cron/project-updated-notify", {
      method: "POST",
      headers: secret === undefined ? {} : { [CRON_SECRET_HEADER]: secret },
    }),
  );

describe("POST /api/cron/project-updated-notify", () => {
  beforeEach(() => {
    vi.stubEnv(CRON_SECRET_ENV, "cron-test-secret");
    notifyMock.mockClear();
    resetProjectUpdatedNotifyPendingSchemaEnsureForTests();
    const db = createProjectUpdatedNotifyPendingFakeSql();
    fake.sql = db.sql;
    fake.pending = db.pending;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("refuses a missing or wrong secret", async () => {
    expect((await call()).status).toBe(401);
    expect((await call("nope")).status).toBe(401);
    expect(notifyMock).not.toHaveBeenCalled();
  });

  it("answers 503 disabled when the env secret is unset", async () => {
    vi.stubEnv(CRON_SECRET_ENV, "");
    const response = await call("cron-test-secret");
    expect(response.status).toBe(503);
    expect(notifyMock).not.toHaveBeenCalled();
  });

  it("flushes a due pending row once across two calls", async () => {
    fake.pending!.set("proj-1", {
      project_id: "proj-1",
      state: "pending",
      fields: ["knowledge", "folder_refs"],
      actor_user_id: "owner-1",
      flush_after: new Date(Date.now() - 1_000),
    });

    const first = await call("cron-test-secret");
    const second = await call("cron-test-secret");
    expect(await first.json()).toEqual({ ok: true, flushed: 1 });
    expect(await second.json()).toEqual({ ok: true, flushed: 0 });
    expect(notifyMock).toHaveBeenCalledTimes(1);
    expect(notifyMock.mock.calls[0]?.[0] as Record<string, unknown>).toEqual(
      expect.objectContaining({
        projectId: "proj-1",
        actorUserId: "owner-1",
        fields: ["knowledge", "folder_refs"],
      }),
    );
    expect(fake.pending!.has("proj-1")).toBe(false);
  });
});
