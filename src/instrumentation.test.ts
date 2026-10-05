import { afterEach, describe, expect, it, vi } from "vitest";

const startSilenceMock = vi.hoisted(() => vi.fn());
const startUpdatedMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/cron/startProjectMessageSilenceTicker", () => ({
  startProjectMessageSilenceTicker: () => startSilenceMock(),
}));
vi.mock("@/lib/cron/startProjectUpdatedNotifyTicker", () => ({
  startProjectUpdatedNotifyTicker: () => startUpdatedMock(),
}));

import { register } from "@/instrumentation";

describe("instrumentation register", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    startSilenceMock.mockReset();
    startUpdatedMock.mockReset();
  });

  it("starts silence + project.updated tickers on the Node runtime", async () => {
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    await register();
    expect(startSilenceMock).toHaveBeenCalledTimes(1);
    expect(startUpdatedMock).toHaveBeenCalledTimes(1);
  });

  it.each(["edge", ""])("does nothing on runtime %j", async (runtime) => {
    vi.stubEnv("NEXT_RUNTIME", runtime);
    await register();
    expect(startSilenceMock).not.toHaveBeenCalled();
    expect(startUpdatedMock).not.toHaveBeenCalled();
  });
});
