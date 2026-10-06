import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchProjectComputerHistoryCloudState } from "./fetchProjectComputerHistoryCloudState";

const cloudApi = { appOrigin: "https://example.test", pairingToken: "tok" };

const stubFetch = (impl: () => Promise<Response>) => {
  const fetchMock = vi.fn(impl);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

describe("fetchProjectComputerHistoryCloudState", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns known off from a successful device read", async () => {
    const fetchMock = stubFetch(async () =>
      Response.json({ ok: true, state: "off", backlog: [] }),
    );
    const read = await fetchProjectComputerHistoryCloudState({
      cloudApi,
      projectId: "p1",
    });
    expect(read).toEqual({ kind: "known", state: "off" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.test/api/agent-witch/projects/p1/computer-history",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("returns known on_ready", async () => {
    stubFetch(async () => Response.json({ ok: true, state: "on_ready" }));
    expect(
      await fetchProjectComputerHistoryCloudState({ cloudApi, projectId: "p1" }),
    ).toEqual({ kind: "known", state: "on_ready" });
  });

  it("treats HTTP errors as unknown", async () => {
    stubFetch(async () =>
      Response.json({ ok: false, errorMessage: "forbidden" }, { status: 403 }),
    );
    expect(
      await fetchProjectComputerHistoryCloudState({ cloudApi, projectId: "p1" }),
    ).toEqual({ kind: "unknown", reason: "http_403" });
  });

  it("treats ok:false or bad state as unknown", async () => {
    stubFetch(async () => Response.json({ ok: false, state: "off" }));
    expect(
      (await fetchProjectComputerHistoryCloudState({ cloudApi, projectId: "p1" }))
        .kind,
    ).toBe("unknown");
    stubFetch(async () => Response.json({ ok: true, state: "paused" }));
    expect(
      await fetchProjectComputerHistoryCloudState({ cloudApi, projectId: "p1" }),
    ).toEqual({ kind: "unknown", reason: "unknown_state" });
  });

  it("treats network failures as unknown without throwing", async () => {
    stubFetch(async () => {
      throw new Error("ECONNRESET");
    });
    expect(
      await fetchProjectComputerHistoryCloudState({ cloudApi, projectId: "p1" }),
    ).toEqual({ kind: "unknown", reason: "fetch_failed" });
  });
});
