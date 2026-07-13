import { describe, expect, it } from "vitest";

import buildConnectComputerGuideSteps from "@/features/home/utils/buildConnectComputerGuideSteps";

describe("buildConnectComputerGuideSteps", () => {
  it("returns mac terminal steps for mac users", () => {
    const steps = buildConnectComputerGuideSteps("mac");

    expect(steps[0]?.title).toBe("Open Terminal");
    expect(steps[3]?.title).toBe("Link this account from the browser");
    expect(steps).toHaveLength(4);
  });

  it("prepends a mac requirement step for windows users", () => {
    const steps = buildConnectComputerGuideSteps("windows");

    expect(steps[0]?.title).toBe("Use a Mac");
    expect(steps[1]?.title).toBe("Open Terminal");
    expect(steps).toHaveLength(5);
  });
});
