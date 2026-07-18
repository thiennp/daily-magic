import { describe, expect, it } from "vitest";

import buildConnectComputerGuideSteps, {
  CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE,
} from "@/features/home/utils/buildConnectComputerGuideSteps";

describe("buildConnectComputerGuideSteps", () => {
  it("returns mac download steps for mac users", () => {
    const steps = buildConnectComputerGuideSteps("mac");

    expect(steps[0]?.title).toBe(CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE);
    expect(steps[2]?.title).toBe("Stay signed in here");
    expect(steps).toHaveLength(3);
  });

  it("prepends a mac requirement step for windows users", () => {
    const steps = buildConnectComputerGuideSteps("windows");

    expect(steps[0]?.title).toBe("Use a Mac");
    expect(steps[1]?.title).toBe(CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE);
    expect(steps).toHaveLength(4);
  });
});
