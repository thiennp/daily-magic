import { buildAgentWitchLocalHealthCheckCommand } from "@agent-witch/shared/network";
import { describe, expect, it } from "vitest";

import { buildAgentWitchReviveAwlSteps } from "@/lib/agentWitch/buildAgentWitchReviveAwlTerminalCommand";

import { buildAwlRepairManuallySteps } from "./buildAwlRepairManuallySteps";

describe("buildAwlRepairManuallySteps", () => {
  it("lists restart → update → reconnect → check in order", () => {
    const steps = buildAwlRepairManuallySteps({
      operatingSystem: "mac",
      hostname: "www.agentwitch.com",
    });
    expect(steps.map((step) => step.title)).toEqual([
      "Restart AgentWitch Local",
      "Update AgentWitch Local",
      "Reconnect this computer",
      "Check it works",
    ]);
  });

  it("step 1 is the same revive block as ReviveAwlMacModal", () => {
    for (const hostname of ["www.agentwitch.com", "localhost"]) {
      const [restart] = buildAwlRepairManuallySteps({
        operatingSystem: "mac",
        hostname,
      });
      const revive = buildAgentWitchReviveAwlSteps({
        operatingSystem: "mac",
        hostname,
      });
      expect(restart?.commands.map((item) => item.command)).toEqual(
        revive.map((step) => step.command),
      );
      expect(restart?.commands[0]?.label).toBeNull();
    }
  });

  it("step 1 uses the systemd block on a Linux browser", () => {
    const [restart] = buildAwlRepairManuallySteps({
      operatingSystem: "linux",
      hostname: "www.agentwitch.com",
    });
    expect(restart?.commands).toHaveLength(1);
    expect(restart?.commands[0]?.command).toContain(
      "systemctl --user restart agent-witch.service",
    );
  });

  it("labels each OS block when the browser OS is unknown", () => {
    const [restart] = buildAwlRepairManuallySteps({
      operatingSystem: "other",
      hostname: "www.agentwitch.com",
    });
    expect(restart?.commands.length).toBeGreaterThan(1);
    expect(restart?.commands.every((item) => item.label !== null)).toBe(true);
  });

  it("step 3 has no command (points to Connect); steps 2 and 4 are static curls", () => {
    const steps = buildAwlRepairManuallySteps({
      operatingSystem: "mac",
      hostname: "www.agentwitch.com",
    });
    expect(steps[1]?.commands[0]?.command).toBe(
      "curl -fsSL https://www.agentwitch.com/install/agent-witch-update.sh | bash",
    );
    expect(steps[2]?.commands).toEqual([]);
    expect(steps[3]?.commands[0]?.command).toBe(
      buildAgentWitchLocalHealthCheckCommand(".agent-witch"),
    );
  });
});
