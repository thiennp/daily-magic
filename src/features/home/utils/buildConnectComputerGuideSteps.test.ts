import { describe, expect, it } from "vitest";

import buildConnectComputerGuideSteps, {
  CONNECT_COMPUTER_COPY_STEP_TITLE,
} from "@/features/home/utils/buildConnectComputerGuideSteps";

describe("buildConnectComputerGuideSteps", () => {
  it("returns mac terminal steps for mac users", () => {
    const steps = buildConnectComputerGuideSteps("mac");

    expect(steps[0]?.title).toBe("Open Terminal");
    expect(steps[1]?.title).toBe(CONNECT_COMPUTER_COPY_STEP_TITLE);
    expect(steps[2]?.title).toBe("Paste into Terminal and run it");
    expect(steps).toHaveLength(3);
  });

  it("prepends a mac requirement step for windows users", () => {
    const steps = buildConnectComputerGuideSteps("windows");

    expect(steps[0]?.title).toBe("Use a Mac");
    expect(steps[1]?.title).toBe("Open Terminal");
    expect(steps).toHaveLength(4);
  });

  it("HOME-032: describes account-scoped install command", () => {
    const steps = buildConnectComputerGuideSteps("mac");
    expect(steps[1]?.description).toContain(
      "adds your profile beside any others",
    );
    expect(steps[1]?.description).not.toContain("does not contain your email");
  });
});
