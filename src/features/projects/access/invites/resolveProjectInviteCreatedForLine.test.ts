import { describe, expect, it } from "vitest";

import {
  joinTypeIdForInvitePlatform,
  toAwcProjectInviteAddSelection,
} from "@/features/projects/access/invites/awcProjectInviteAddAssistantTypes";
import { resolveProjectInviteCreatedForLine as line } from "@/features/projects/access/invites/resolveProjectInviteCreatedForLine";

const ANY = "Any assistant";
const GROK = "For Grok Bot";
const MUSE = "For Muse";

describe("invite platform and types[] id: one source, both directions", () => {
  it("round-trips grok and muse; other types and no type store no platform", () => {
    expect(joinTypeIdForInvitePlatform("grok")).toBe("grok-bot");
    expect(joinTypeIdForInvitePlatform("muse")).toBe("muse");
    expect(joinTypeIdForInvitePlatform(null)).toBeNull();
    expect(toAwcProjectInviteAddSelection("grok-bot").platform).toBe("grok");
    expect(toAwcProjectInviteAddSelection("muse").platform).toBe("muse");
    expect(toAwcProjectInviteAddSelection("claude").platform).toBeNull();
    expect(toAwcProjectInviteAddSelection(null).platform).toBeNull();
  });
});

describe("resolveProjectInviteCreatedForLine", () => {
  it("names the picked type", () => {
    expect(line({ platform: "grok", joinTypeId: "grok-bot" })).toBe(GROK);
    expect(line({ platform: "muse", joinTypeId: "muse" })).toBe(MUSE);
    expect(line({ platform: null, joinTypeId: "claude" })).toBe("For Claude");
  });

  it("platform-only callers get the same line as before", () => {
    expect(line({ platform: "grok" })).toBe(GROK);
    expect(line({ platform: "muse" })).toBe(MUSE);
  });

  it("no type means the any-assistant line, never Grok", () => {
    expect(line({ platform: null })).toBe(ANY);
    expect(line({ platform: null, joinTypeId: null })).toBe(ANY);
    expect(line({ platform: "grok", joinTypeId: null })).toBe(ANY);
    expect(line({ platform: null, joinTypeId: "not-a-type" })).toBe(ANY);
  });
});
