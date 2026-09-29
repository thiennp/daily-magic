import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

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

  it("opens status before awaiting health probe", async () => {
    const openSpy = vi.fn();
    vi.stubGlobal("window", { open: openSpy });

    let resolveFetch: (value: Response) => void = () => undefined;
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(fetchPromise));

    const resultPromise = openAgentWitchLocalStatus();

    expect(openSpy).toHaveBeenCalledWith(
      `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}/status`,
      "_blank",
      "noopener,noreferrer",
    );

    resolveFetch({ ok: true } as Response);
    await expect(resultPromise).resolves.toBe("opened");
  });

  it("returns unavailable when health probe fails", async () => {
    vi.stubGlobal("window", { open: vi.fn() });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));

    await expect(openAgentWitchLocalStatus()).resolves.toBe("unavailable");
  });
});
