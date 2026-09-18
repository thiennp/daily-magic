import { describe, expect, it } from "vitest";

import { buildAllWakePortsForPage } from "@/features/agent-witch/utils/probeLocalAgentWitchWakePorts";
import {
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

describe("buildAllWakePortsForPage (HOME-050)", () => {
  it("always includes production and localhost wake ports", () => {
    const ports = buildAllWakePortsForPage([51_234]);

    expect(ports).toContain(AGENT_WITCH_PROD_WAKE_PORT);
    expect(ports).toContain(AGENT_WITCH_LOCAL_WAKE_PORT);
    expect(ports).toContain(51_234);
  });
});
