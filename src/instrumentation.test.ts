import { afterEach, describe, expect, it, vi } from "vitest";

const startMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/cron/startProjectMessageSilenceTicker", () => ({
  startProjectMessageSilenceTicker: () => startMock(),
}));

import { register } from "@/instrumentation";

describe("instrumentation register", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    startMock.mockReset();
  });

  it("starts the silence ticker on the Node runtime", async () => {
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    await register();
    expect(startMock).toHaveBeenCalledTimes(1);
  });

  it.each(["edge", ""])("does nothing on runtime %j", async (runtime) => {
    vi.stubEnv("NEXT_RUNTIME", runtime);
    await register();
    expect(startMock).not.toHaveBeenCalled();
  });
});
