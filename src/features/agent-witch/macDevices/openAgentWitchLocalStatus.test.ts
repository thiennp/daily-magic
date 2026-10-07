import { afterEach, describe, expect, it, vi } from "vitest";

import {
  openAgentWitchLocalStatus,
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

describe("openAgentWitchLocalStatus", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("does not open a browser tab (AWL-H7) and returns opened when healthy", async () => {
    const openSpy = vi.fn();
    vi.stubGlobal("window", { open: openSpy });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true } as Response));

    await expect(openAgentWitchLocalStatus()).resolves.toBe("opened");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("returns unavailable when health probe fails", async () => {
    vi.stubGlobal("window", { open: vi.fn() });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));

    await expect(openAgentWitchLocalStatus()).resolves.toBe("unavailable");
  });
});
