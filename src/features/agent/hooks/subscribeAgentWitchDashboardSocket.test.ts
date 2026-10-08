import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  DASHBOARD_STREAM_OPEN_TIMEOUT_MS,
  subscribeAgentWitchDashboardSocket,
} from "@/features/agent/hooks/subscribeAgentWitchDashboardSocket";

class FakeEventSource {
  static readonly CLOSED = 2;
  static instances: FakeEventSource[] = [];
  readyState = 0;
  onopen: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  closed = false;
  constructor(readonly url: string) {
    FakeEventSource.instances.push(this);
  }
  close(): void {
    this.closed = true;
  }
}

describe("subscribeAgentWitchDashboardSocket (33512877)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    FakeEventSource.instances = [];
    vi.stubGlobal("window", {});
    vi.stubGlobal("EventSource", FakeEventSource);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("{}")),
    );
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("counts any event as connected and replaces a stream that never opens", () => {
    const statuses: string[] = [];
    const stop = subscribeAgentWitchDashboardSocket({
      onStatusChange: (status) => statuses.push(status),
      onMessage: () => undefined,
      onSocketChange: () => undefined,
    });
    expect(statuses).toEqual(["connecting"]);

    vi.advanceTimersByTime(DASHBOARD_STREAM_OPEN_TIMEOUT_MS + 1);
    expect(FakeEventSource.instances).toHaveLength(2);
    expect(FakeEventSource.instances[0]?.closed).toBe(true);

    FakeEventSource.instances[1]?.onmessage?.({ data: "{}" });
    expect(statuses.at(-1)).toBe("connected");

    vi.advanceTimersByTime(DASHBOARD_STREAM_OPEN_TIMEOUT_MS * 3);
    expect(FakeEventSource.instances).toHaveLength(2);
    stop();
  });
});
