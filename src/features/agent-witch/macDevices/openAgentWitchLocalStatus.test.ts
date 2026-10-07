import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK,
  AGENT_WITCH_LOCAL_STATUS_DEEP_LINK,
  openAgentWitchLocalDeepLink,
  openAgentWitchLocalStatus,
  openAgentWitchLocalStatusDeepLink,
  probeAgentWitchLocalHealth,
} from "./openAgentWitchLocalStatus";

describe("probeAgentWitchLocalHealth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns true when health responds ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));
    await expect(probeAgentWitchLocalHealth()).resolves.toBe(true);
  });

  it("returns false when health fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    await expect(probeAgentWitchLocalHealth()).resolves.toBe(false);
  });
});

describe("openAgentWitchLocalStatus (AWL-H7 Exact FIX-2)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("deep-links agentwitch-local://status and returns opened even when :43347 is down", async () => {
    const click = vi.fn();
    const anchor = {
      href: "",
      rel: "",
      click,
    } as unknown as HTMLAnchorElement;
    const createElement = vi.fn().mockReturnValue(anchor);
    const appendChild = vi.fn();
    const remove = vi.fn();
    Object.defineProperty(anchor, "remove", { value: remove });

    vi.stubGlobal("document", {
      createElement,
      body: { appendChild },
    });
    vi.stubGlobal("window", { open: vi.fn() });
    // :43347 alone would fail on H6 — must still be opened (no false Revive).
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));

    await expect(openAgentWitchLocalStatus()).resolves.toBe("opened");
    expect(createElement).toHaveBeenCalledWith("a");
    expect(anchor.href).toBe(AGENT_WITCH_LOCAL_STATUS_DEEP_LINK);
    expect(click).toHaveBeenCalled();
    expect(appendChild).toHaveBeenCalled();
  });

  it("openAgentWitchLocalStatusDeepLink is a no-op without window", () => {
    vi.stubGlobal("window", undefined);
    expect(() => openAgentWitchLocalStatusDeepLink()).not.toThrow();
  });
});

describe("openAgentWitchLocalDeepLink (shared helper)", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("opens Prompt optimizer deep link via the same anchor helper", () => {
    const click = vi.fn();
    const anchor = {
      href: "",
      rel: "",
      click,
    } as unknown as HTMLAnchorElement;
    const createElement = vi.fn().mockReturnValue(anchor);
    const appendChild = vi.fn();
    const remove = vi.fn();
    Object.defineProperty(anchor, "remove", { value: remove });
    vi.stubGlobal("document", {
      createElement,
      body: { appendChild },
    });
    vi.stubGlobal("window", {});

    openAgentWitchLocalDeepLink(AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK);
    expect(anchor.href).toBe("agentwitch-local://prompt-optimizer");
    expect(click).toHaveBeenCalled();
  });
});
