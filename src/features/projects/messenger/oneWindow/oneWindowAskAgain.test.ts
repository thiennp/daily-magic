import { describe, expect, it, vi } from "vitest";

import type { OneWindowApprovalCardModel } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";
import {
  askAgainDraftText,
  buildAskAgainHandler,
} from "@/features/projects/messenger/oneWindow/oneWindowAskAgain";

const model = (whoName?: string): OneWindowApprovalCardModel => ({
  id: "a1",
  kind: "run",
  title: "t",
  whoLabel: "w",
  action: "a",
  status: "timedout",
  timeLabel: "10:00",
  whoName,
});

describe("Ask {name} again", () => {
  it("prefills an @mention with a trailing space", () => {
    expect(askAgainDraftText("NRG Lead")).toBe("@NRG Lead ");
  });
  it("passes the assistant name to onAskAgain", () => {
    const onAskAgain = vi.fn();
    buildAskAgainHandler(model("NRG Lead"), onAskAgain)?.("a1");
    expect(onAskAgain).toHaveBeenCalledWith("NRG Lead");
  });
  it("is absent without a handler or a name", () => {
    expect(buildAskAgainHandler(model("X"), undefined)).toBeUndefined();
    expect(buildAskAgainHandler(model(), vi.fn())).toBeUndefined();
  });
});
