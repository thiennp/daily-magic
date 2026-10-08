import { describe, expect, it, vi } from "vitest";

import { applyWriterAgentPick } from "@/features/agent/utils/applyWriterAgentPick";
import { resolveAgentSessionTargets } from "@/features/agent/utils/resolveAgentSessionTargets";
import { resolveSendTaskLinkWriterAgent } from "@/features/agent/utils/resolveSendTaskLinkWriterAgent";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/** 37874fdc: a waiting Codex session made every Antigravity pick flip back. */
describe("writer pick with an open session (37874fdc)", () => {
  it("picking another writer ends the Codex session, so the pick sticks", () => {
    const state: {
      session: HarnessWriterAgent | null;
      writer: HarnessWriterAgent;
    } = { session: "codex", writer: "codex" };
    applyWriterAgentPick({
      value: "antigravity",
      sessionWriterAgent: state.session,
      finishSession: () => {
        state.session = null;
      },
      setWriterAgent: (value) => {
        state.writer = value;
      },
    });
    const targets = resolveAgentSessionTargets({
      sessionWriterAgent: state.session,
      writerAgent: state.writer,
      sessionDeviceId: null,
      selectedDeviceId: "linux-1",
    });

    expect(targets.activeWriterAgent).toBe("antigravity");
    expect(targets.isWriterAgentLocked).toBe(false);
  });

  it("picking the session's own writer keeps the session", () => {
    const finishSession = vi.fn();
    const setWriterAgent = vi.fn();
    applyWriterAgentPick({
      value: "codex",
      sessionWriterAgent: "codex",
      finishSession,
      setWriterAgent,
    });

    expect(finishSession).not.toHaveBeenCalled();
    expect(setWriterAgent).toHaveBeenCalledWith("codex");
  });
});

describe("resolveSendTaskLinkWriterAgent (37874fdc)", () => {
  it("honours ?writerAgent= without a source run", () => {
    expect(
      resolveSendTaskLinkWriterAgent({
        writerAgentFromUrl: "antigravity",
        writerAgentFromRun: null,
      }),
    ).toBe("antigravity");
  });

  it("the link wins over the source run; junk falls back to the run", () => {
    expect(
      resolveSendTaskLinkWriterAgent({
        writerAgentFromUrl: "antigravity",
        writerAgentFromRun: "codex",
      }),
    ).toBe("antigravity");
    expect(
      resolveSendTaskLinkWriterAgent({
        writerAgentFromUrl: "nope",
        writerAgentFromRun: "codex",
      }),
    ).toBe("codex");
  });
});
