import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createProjectB2bFakeSql } from "@/lib/projects/acl/messaging/projectB2bFakeSql.fixtures";

const fake = vi.hoisted(() => ({ sql: null as unknown }));

vi.mock("@/lib/db", () => ({
  getSql: () => fake.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

const insertMock = vi.fn(async (input: unknown) => {
  void input;
  return { messageId: "notice", wakeResults: [] };
});
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: (input: unknown) => insertMock(input),
  }),
);

const deleteReadMock = vi.hoisted(() => vi.fn(async () => 0));
vi.mock("@/lib/projects/acl/messaging/deleteReadProjectMessages", () => ({
  deleteReadProjectMessages: () => deleteReadMock(),
}));

import { POST } from "@/app/api/cron/project-message-silence/route";
import {
  CRON_SECRET_ENV,
  CRON_SECRET_HEADER,
  PROJECT_MESSAGE_SILENCE_CRON_PATH,
} from "@/lib/cron/cronSecret.constants";

const call = (secret?: string) =>
  POST(
    new Request(`http://localhost${PROJECT_MESSAGE_SILENCE_CRON_PATH}`, {
      method: "POST",
      headers: secret === undefined ? {} : { [CRON_SECRET_HEADER]: secret },
    }),
  );

describe("POST /api/cron/project-message-silence", () => {
  beforeEach(() => {
    vi.stubEnv(CRON_SECRET_ENV, "cron-test-secret");
    insertMock.mockClear();
    deleteReadMock.mockClear();
    deleteReadMock.mockResolvedValue(0);
    const db = createProjectB2bFakeSql();
    fake.sql = db.sql;
    db.deliveries.set("del-1", {
      id: "del-1",
      message_id: "msg-1",
      membership_id: "mem-b",
      b2b_state: "awaiting_first_activity",
      last_activity_at: new Date(Date.now() - 6 * 60_000),
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("refuses a missing or wrong secret", async () => {
    expect((await call()).status).toBe(401);
    expect((await call("nope")).status).toBe(401);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("answers 503 disabled when the env secret is unset", async () => {
    vi.stubEnv(CRON_SECRET_ENV, "");
    for (const secret of [undefined, "", "cron-test-secret"]) {
      const response = await call(secret);
      expect(response.status).toBe(503);
      expect(await response.json()).toEqual({
        ok: false,
        disabled: true,
        reason: "AWC_CRON_SECRET not set",
      });
    }
    expect(insertMock).not.toHaveBeenCalled();
  });

  it("does not double-notify across two calls", async () => {
    const first = await call("cron-test-secret");
    const second = await call("cron-test-secret");
    expect(await first.json()).toEqual({ ok: true, notified: 1, deletedRead: 0 });
    expect(await second.json()).toEqual({ ok: true, notified: 0, deletedRead: 0 });
    expect(insertMock).toHaveBeenCalledTimes(1);
  });
});
