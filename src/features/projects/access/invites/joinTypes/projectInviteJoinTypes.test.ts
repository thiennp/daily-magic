import { readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

const DIR = join(
  process.cwd(),
  "src/features/projects/access/invites/joinTypes",
);
const THIEN_ORDER = [
  "grok-bot",
  "claude",
  "chatgpt",
  "cursor",
  "codex",
  "gemini",
  "copilot",
  "mistral",
  "openclaw",
  "n8n-zapier",
  "messengers",
  "custom-https",
  "other",
];

describe("join type registry", () => {
  it("lists Thien's 13 types in match order with Other last", () => {
    expect(PROJECT_INVITE_JOIN_TYPES.map((t) => t.id)).toEqual(THIEN_ORDER);
  });

  it("has unique ids and one module file per type", () => {
    const ids = PROJECT_INVITE_JOIN_TYPES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    const modules = readdirSync(DIR).filter(
      (f) => f.endsWith(".ts") && !/\.(type|constant|test)\.ts$/.test(f),
    );
    expect(modules).toHaveLength(PROJECT_INVITE_JOIN_TYPES.length);
  });

  it("gives every type match hints and steps", () => {
    for (const type of PROJECT_INVITE_JOIN_TYPES) {
      expect(type.match.length, type.id).toBeGreaterThan(0);
      expect(type.steps.length, type.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses the locked connect paths; only Grok Bot wakes, every other type checks on demand", () => {
    const byId = Object.fromEntries(
      PROJECT_INVITE_JOIN_TYPES.map((t) => [t.id, t]),
    );
    expect(byId["grok-bot"]).toMatchObject({
      connectPath: "grok-wake",
      deliveryMode: "webhook",
    });
    for (const id of [
      "claude",
      "cursor",
      "codex",
      "gemini",
      "copilot",
      "mistral",
      "openclaw",
    ]) {
      expect(byId[id]?.connectPath, id).toBe("mcp-bearer");
    }
    for (const id of ["chatgpt", "n8n-zapier", "messengers", "custom-https"]) {
      expect(byId[id]?.connectPath, id).toBe("rest-register");
    }
    expect(byId.other?.connectPath).toBe("poll");
    for (const type of PROJECT_INVITE_JOIN_TYPES.filter(
      (t) => t.id !== "grok-bot",
    )) {
      expect(type.deliveryMode, type.id).toBe("poll");
    }
  });
});
