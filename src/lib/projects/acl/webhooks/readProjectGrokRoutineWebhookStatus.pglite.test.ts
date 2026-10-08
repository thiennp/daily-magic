import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const holder = vi.hoisted(() => ({
  sql: null as null | ((...args: never[]) => unknown),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => holder.sql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
  resetProjectAclSchemaEnsureForTests: () => undefined,
}));

import { executeGetMyProjectWebhookStatusTool } from "@/lib/agentAccess/executeGetMyProjectWebhookStatusTool";
import { readProjectGrokRoutineWebhookStatus } from "@/lib/projects/acl/webhooks/readProjectGrokRoutineWebhookStatus";
import {
  createGrokWebhookStatusDb,
  GROK_STATUS_PROJECT_ID,
  GROK_STATUS_USER_ID,
  type GrokWebhookStatusDb,
} from "@/lib/projects/acl/webhooks/grokWebhookStatusPglite.fixtures";

vi.mock(
  "@/lib/projects/acl/webhooks/readProjectMembershipHmacWebhookStatus",
  () => ({
    readProjectMembershipHmacWebhookStatus: async () => ({
      hmacWebhookUrl: null,
      secretSet: false,
    }),
  }),
);

const state: { db?: GrokWebhookStatusDb } = {};
const db = (): GrokWebhookStatusDb => {
  if (state.db === undefined) {
    throw new Error("db not ready");
  }
  return state.db;
};

const readOwn = () =>
  readProjectGrokRoutineWebhookStatus({
    projectId: GROK_STATUS_PROJECT_ID,
    by: "own_membership",
    userId: GROK_STATUS_USER_ID,
  });

describe("readProjectGrokRoutineWebhookStatus (PGlite)", () => {
  beforeAll(async () => {
    state.db = await createGrokWebhookStatusDb();
    holder.sql = state.db.sql;
  }, 60_000);

  afterEach(async () => {
    await db().reset();
  });

  it("ignores not_postable attempts before the wake link was saved; returns later http_200", async () => {
    await db().attempt({
      messageId: "m0",
      result: "not_postable",
      agoSeconds: 300,
    });
    await db().saveWebhook({ agoSeconds: 200 });
    expect(await readOwn()).toMatchObject({
      lastGrokWakeResult: null,
      lastGrokWakeAt: null,
    });
    await db().attempt({
      messageId: "m1",
      result: "http_200",
      agoSeconds: 100,
    });
    expect(await readOwn()).toMatchObject({
      lastGrokWakeResult: "http_200",
    });
  });
});

describe("get_my_project_webhook_status after wake save (PGlite)", () => {
  beforeAll(async () => {
    if (state.db === undefined) {
      state.db = await createGrokWebhookStatusDb();
      holder.sql = state.db.sql;
    }
  }, 60_000);

  afterEach(async () => {
    await db().reset();
  });

  it("returns http_200 after save, not a stale not_postable", async () => {
    await db().attempt({
      messageId: "m0",
      result: "not_postable",
      agoSeconds: 300,
    });
    await db().saveWebhook({ agoSeconds: 200 });
    await db().attempt({
      messageId: "m1",
      result: "http_200",
      agoSeconds: 100,
    });

    const result = await executeGetMyProjectWebhookStatusTool({
      actor: { id: GROK_STATUS_USER_ID } as never,
      args: { projectId: GROK_STATUS_PROJECT_ID },
    });
    const text = JSON.stringify(result);
    expect(text).toContain("http_200");
    expect(text).not.toContain("not_postable");
    expect(text).toMatch(/grokWebhookRegistered\\":true/);
  });
});
