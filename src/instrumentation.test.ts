import { afterEach, describe, expect, it, vi } from "vitest";

const startSilenceMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/cron/startProjectMessageSilenceTicker", () => ({
  startProjectMessageSilenceTicker: () => startSilenceMock(),
}));

import { register } from "@/instrumentation";

describe("instrumentation register", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    startSilenceMock.mockReset();
  });

  it("starts silence ticker on the Node runtime", async () => {
    vi.stubEnv("NEXT_RUNTIME", "nodejs");
    await register();
    expect(startSilenceMock).toHaveBeenCalledTimes(1);
  });

  it.each(["edge", ""])("does nothing on runtime %j", async (runtime) => {
    vi.stubEnv("NEXT_RUNTIME", runtime);
    await register();
    expect(startSilenceMock).not.toHaveBeenCalled();
  });
});
