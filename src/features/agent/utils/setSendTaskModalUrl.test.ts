import { afterEach, describe, expect, it, vi } from "vitest";

import { expandRunningSendTaskModal } from "@/features/agent/utils/expandRunningSendTaskModal";
import { setSendTaskModalUrl } from "@/features/agent/utils/setSendTaskModalUrl";

const stubHistory = () => {
  const pushState = vi.fn();
  const replaceState = vi.fn();
  vi.stubGlobal("window", { history: { pushState, replaceState } });
  return { pushState, replaceState };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("setSendTaskModalUrl (jump audit r2)", () => {
  it("opens with pushState and closes with replaceState (no router nav)", () => {
    const { pushState, replaceState } = stubHistory();
    setSendTaskModalUrl("/marketplace?sendTask=1", "push");
    setSendTaskModalUrl("/marketplace", "replace");
    expect(pushState).toHaveBeenCalledWith(null, "", "/marketplace?sendTask=1");
    expect(replaceState).toHaveBeenCalledWith(null, "", "/marketplace");
  });

  it("expanding a running task pushes the same-path composer URL", () => {
    const { pushState } = stubHistory();
    const setKeepAlive = vi.fn();
    expandRunningSendTaskModal({
      runId: " run-1 ",
      pathname: "/",
      setKeepAlive,
      setPanelKey: vi.fn(),
    });
    expect(setKeepAlive).toHaveBeenCalledWith(true);
    const href = String(pushState.mock.calls[0]?.[2]);
    expect(href.startsWith("/?sendTask=1")).toBe(true);
    expect(href).toContain("sourceRunId=run-1");
    expect(href).toContain("resumeLive=1");
  });

  it("a blank run id does nothing", () => {
    const { pushState } = stubHistory();
    expandRunningSendTaskModal({
      runId: "  ",
      pathname: "/",
      setKeepAlive: vi.fn(),
      setPanelKey: vi.fn(),
    });
    expect(pushState).not.toHaveBeenCalled();
  });
});
