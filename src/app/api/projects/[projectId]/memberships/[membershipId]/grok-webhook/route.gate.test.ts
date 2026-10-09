import { describe, expect, it, vi } from "vitest";

const sqlMock = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());
const mayControl = vi.hoisted(() => vi.fn());
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/acl/webhooks/mayControlOwnedBotWakeLink", () => ({
  mayControlOwnedBotWakeLink: mayControl,
}));

import {
  GET,
  PUT,
} from "@/app/api/projects/[projectId]/memberships/[membershipId]/grok-webhook/route";

const params = Promise.resolve({ projectId: "proj-1", membershipId: "mem-1" });

describe("owned-bot wake link gate", () => {
  it("a stale bot owner or a person who left the project gets 404 and nothing is written", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "human-1" }, error: null });
    mayControl.mockResolvedValue(false);
    const get = await GET(new Request("http://x"), { params });
    const put = await PUT(
      new Request("http://x", {
        method: "PUT",
        body: JSON.stringify({
          webhookUrl: "https://hooks.example.com/w",
          webhookKey: "k",
        }),
      }),
      { params },
    );
    expect(get.status).toBe(404);
    expect(put.status).toBe(404);
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
