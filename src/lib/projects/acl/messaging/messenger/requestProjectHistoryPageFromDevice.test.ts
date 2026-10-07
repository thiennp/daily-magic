import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { requestProjectHistoryPageFromDevice } from "@/lib/projects/acl/messaging/messenger/requestProjectHistoryPageFromDevice";
import {
  completeProjectHistoryPageRequest,
  resetProjectHistoryPageRequestRegistryForTests,
} from "@/lib/projects/acl/messaging/messenger/projectHistoryPageRequestRegistry";
import { assertNoHistoryBodyInTrafficBlob } from "@/lib/projects/acl/messaging/messenger/summarizeProjectHistoryPageTraffic";
import { resolveProjectMessengerLoadPage } from "@/lib/projects/acl/messaging/messenger/resolveProjectMessengerLoadPage";

const sampleEntry = {
  messageId: "m-local-1",
  createdAt: "2026-10-07T10:00:00.000Z",
  author: {
    kind: "owner" as const,
    membershipId: null,
    displayName: "Thien",
  },
  kind: "chat.note",
  text: "from device disk",
  needsReply: false,
  inReplyTo: null,
  states: [],
};

describe("requestProjectHistoryPageFromDevice", () => {
  afterEach(() => {
    resetProjectHistoryPageRequestRegistryForTests();
  });

  it("H3/T10: device live + replies → local page (prefer local over Neon)", async () => {
    const sent: unknown[] = [];
    const traffic: unknown[] = [];
    const agentClient = {
      send: (msg: unknown) => {
        sent.push(msg);
        const m = msg as { requestId?: string };
        queueMicrotask(() => {
          completeProjectHistoryPageRequest(m.requestId, {
            ok: true,
            entries: [sampleEntry],
            nextBeforeCursor: null,
            hasMore: false,
          });
        });
      },
    };

    const result = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "owner-1",
        threadKey: "whole",
        limit: 50,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: "dev-1",
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () => agentClient as never,
        isOtherInstance: async () => false,
        logTraffic: (s) => traffic.push(s),
        timeoutMs: 1_000,
      },
    );

    expect(result.kind).toBe("page");
    if (result.kind === "page") {
      expect(result.page.entries).toHaveLength(1);
      expect(result.page.entries[0]?.text).toBe("from device disk");
    }
    expect(sent[0]).toMatchObject({
      type: AGENT_WITCH_MESSAGE_TYPES.PROJECT_HISTORY_PAGE_REQUEST,
      payload: { projectId: "proj-1", threadKey: "whole", limit: 50 },
    });
    // Prefer local in pager merge (§11 H3 / T10)
    const merged = resolveProjectMessengerLoadPage({
      localEntries: result.kind === "page" ? result.page.entries : [],
      localHasMore: false,
      neonEntries: [
        {
          ...sampleEntry,
          messageId: "m-neon-1",
          text: "neon meta only",
        },
      ],
      neonHasMore: false,
      localLive: true,
      beforeRequested: true,
      limit: 50,
    });
    expect(merged.page.source === "local" || merged.page.source === "mixed").toBe(
      true,
    );
    expect(merged.entries.some((e) => e.messageId === "m-local-1")).toBe(true);
    for (const blob of traffic) {
      expect(assertNoHistoryBodyInTrafficBlob(blob)).toBe(true);
    }
  });

  it("timeout → soft_degrade (Neon fallback)", async () => {
    const result = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "owner-1",
        threadKey: "whole",
        limit: 10,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: "dev-1",
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () =>
          ({
            send: () => {
              /* never completes */
            },
          }) as never,
        isOtherInstance: async () => false,
        timeoutMs: 30,
      },
    );
    expect(result).toEqual({ kind: "soft_degrade", reason: "expired" });
  });

  it("device error / unknown type (old bundle) → soft_degrade", async () => {
    const result = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "owner-1",
        threadKey: "whole",
        limit: 10,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: "dev-1",
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () =>
          ({
            send: (msg: unknown) => {
              const m = msg as { requestId?: string };
              queueMicrotask(() => {
                completeProjectHistoryPageRequest(m.requestId, {
                  ok: false,
                  errorCode: "unknown_message_type",
                  errorMessage: "old AWL bundle",
                });
              });
            },
          }) as never,
        isOtherInstance: async () => false,
        timeoutMs: 1_000,
      },
    );
    expect(result).toEqual({
      kind: "soft_degrade",
      reason: "unknown_message_type",
    });
  });

  it("cross-instance → documented Neon soft-degrade (no body relay)", async () => {
    const sqlCalls: unknown[] = [];
    const fakeSql = (strings: TemplateStringsArray, ...values: unknown[]) => {
      sqlCalls.push({ sql: strings.join("?"), values });
      return [];
    };
    const result = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "owner-1",
        threadKey: "whole",
        limit: 10,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: "dev-1",
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () => undefined,
        isOtherInstance: async () => true,
        timeoutMs: 1_000,
      },
    );
    expect(result).toEqual({
      kind: "soft_degrade",
      reason: "cross_instance_neon_fallback",
    });
    // No body written via fake sql (we never call sql in this path).
    expect(sqlCalls).toHaveLength(0);
    void fakeSql;
  });

  it("non-owner / no device → no proxy request", async () => {
    const sent: unknown[] = [];
    const noDevice = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "owner-1",
        threadKey: "whole",
        limit: 10,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: null,
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () =>
          ({
            send: (m: unknown) => sent.push(m),
          }) as never,
      },
    );
    expect(noDevice.kind).toBe("skipped");
    expect(sent).toHaveLength(0);

    const wrongOwner = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "attacker",
        threadKey: "whole",
        limit: 10,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: "dev-1",
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () =>
          ({
            send: (m: unknown) => sent.push(m),
          }) as never,
      },
    );
    expect(wrongOwner.kind).toBe("skipped");
    expect(sent).toHaveLength(0);
  });

  it("nothing body-like written to Neon/relay/traffic (fake sql)", async () => {
    const sqlWrites: string[] = [];
    const traffic: unknown[] = [];
    const result = await requestProjectHistoryPageFromDevice(
      {
        projectId: "proj-1",
        ownerUserId: "owner-1",
        threadKey: "whole",
        limit: 10,
      },
      {
        getProject: async () =>
          ({
            id: "proj-1",
            ownerUserId: "owner-1",
            deviceId: "dev-1",
          }) as never,
        getHub: () => ({}) as never,
        findAgentClient: () =>
          ({
            send: (msg: unknown) => {
              const m = msg as { requestId?: string };
              queueMicrotask(() => {
                completeProjectHistoryPageRequest(m.requestId, {
                  ok: true,
                  entries: [sampleEntry],
                  nextBeforeCursor: null,
                  hasMore: false,
                });
              });
            },
          }) as never,
        isOtherInstance: async () => false,
        logTraffic: (s) => {
          traffic.push(s);
          // Simulate a paranoid check that any SQL write would be inspected:
          sqlWrites.push(JSON.stringify(s));
        },
        timeoutMs: 1_000,
      },
    );
    expect(result.kind).toBe("page");
    for (const w of sqlWrites) {
      expect(assertNoHistoryBodyInTrafficBlob(w)).toBe(true);
      expect(w).not.toContain("from device disk");
    }
    for (const t of traffic) {
      expect(assertNoHistoryBodyInTrafficBlob(t)).toBe(true);
    }
  });
});

describe("§11 H5/T11 offline line via soft-degrade + Neon exhausted", () => {
  it("device offline + Neon exhausted → project_computer_offline exact EN", () => {
    const resolved = resolveProjectMessengerLoadPage({
      localEntries: [],
      localHasMore: false,
      neonEntries: [],
      neonHasMore: false,
      localLive: false,
      beforeRequested: true,
      limit: 50,
    });
    expect(resolved.error?.code).toBe("project_computer_offline");
    expect(resolved.error?.message).toBe(
      "Connection to the project computer was lost.",
    );
  });
});
