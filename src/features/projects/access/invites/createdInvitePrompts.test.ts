import { afterEach, describe, expect, it, vi } from "vitest";

import { buildCreatedInviteCopyPrompt } from "@/features/projects/access/invites/buildCreatedInviteCopyPrompt";
import {
  CREATED_INVITE_PROMPT_GRACE_MS,
  pruneCreatedInvitePrompts,
  readCreatedInvitePrompts,
  writeCreatedInvitePrompts,
  type CreatedInvitePrompt,
} from "@/features/projects/access/invites/createdInvitePrompts";

const prompt = (
  inviteId: string,
  createdAtMs: number,
): CreatedInvitePrompt => ({
  inviteId,
  url: `https://www.agentwitch.com/invite/p/tok-${inviteId}`,
  token: `tok-${inviteId}`,
  platform: null,
  joinTypeId: null,
  createdAtMs,
});

const fakeSessionStorage = () => {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
    data,
  };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("DF-014 created invite prompts", () => {
  it("keeps listed invites and just-created ones; drops used/revoked/expired", () => {
    const now = 1_000_000;
    const pruned = pruneCreatedInvitePrompts({
      prompts: {
        listed: prompt("listed", now - 10 * CREATED_INVITE_PROMPT_GRACE_MS),
        fresh: prompt("fresh", now - 1_000),
        gone: prompt("gone", now - CREATED_INVITE_PROMPT_GRACE_MS),
      },
      invites: [{ inviteId: "listed" }],
      nowMs: now,
    });
    expect(Object.keys(pruned).sort()).toEqual(["fresh", "listed"]);
  });

  it("rebuilds the short Copy prompt from a remembered invite", () => {
    expect(
      buildCreatedInviteCopyPrompt({
        prompt: prompt("inv-1", 0),
        projectName: "AgentWitch",
      }),
    ).toBe(
      `Join my AgentWitch project "AgentWitch": read https://www.agentwitch.com/join/tok-inv-1 and follow it. Start with the terms, and tell me when you're waiting for my approval.`,
    );
    expect(
      buildCreatedInviteCopyPrompt({ prompt: undefined, projectName: "x" }),
    ).toBeNull();
  });

  it("persists per project in sessionStorage and ignores junk", () => {
    const store = fakeSessionStorage();
    vi.stubGlobal("window", { sessionStorage: store });
    writeCreatedInvitePrompts("p1", { a: prompt("a", 5) });
    expect(readCreatedInvitePrompts("p1")).toEqual({ a: prompt("a", 5) });
    expect(readCreatedInvitePrompts("p2")).toEqual({});
    store.setItem("awc.inviteCopyPrompts.p3", "{not json");
    expect(readCreatedInvitePrompts("p3")).toEqual({});
    writeCreatedInvitePrompts("p1", {});
    expect(store.data.has("awc.inviteCopyPrompts.p1")).toBe(false);
  });

  it("no window (SSR) → empty, no throw", () => {
    expect(readCreatedInvitePrompts("p1")).toEqual({});
    expect(() => writeCreatedInvitePrompts("p1", {})).not.toThrow();
  });
});
