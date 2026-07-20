import { describe, expect, it, vi } from "vitest";

import { createAgentWitchDashboardBus } from "@/features/agent-witch/dashboard/agentWitchDashboardBus";

describe("createAgentWitchDashboardBus (AGENT-040)", () => {
  it("fans out published messages to all subscribers", () => {
    const bus = createAgentWitchDashboardBus();
    const first = vi.fn();
    const second = vi.fn();

    bus.subscribe(first);
    bus.subscribe(second);
    bus.publish('{"type":"ping"}');

    expect(first).toHaveBeenCalledWith('{"type":"ping"}');
    expect(second).toHaveBeenCalledWith('{"type":"ping"}');
  });

  it("stops delivering after unsubscribe", () => {
    const bus = createAgentWitchDashboardBus();
    const listener = vi.fn();
    const unsubscribe = bus.subscribe(listener);

    unsubscribe();
    bus.publish('{"type":"ping"}');

    expect(listener).not.toHaveBeenCalled();
  });
});
