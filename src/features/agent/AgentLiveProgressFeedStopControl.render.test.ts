import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AgentLiveProgressFeedStopControl from "@/features/agent/AgentLiveProgressFeedStopControl";

const render = (onRetryRun?: () => void): string =>
  renderToStaticMarkup(
    createElement(AgentLiveProgressFeedStopControl, {
      isWorking: false,
      isStopping: false,
      workingEllipsis: "",
      connectionStatus: "connected",
      onDeleteRun: () => undefined,
      onRetryRun,
    }),
  );

describe("AgentLiveProgressFeedStopControl Retry (73820cb1)", () => {
  it("ended Failed run: shows Retry next to Delete", () => {
    const html = render(() => undefined);
    expect(html).toContain("Retry");
    expect(html).toContain("Delete");
  });

  it("without a retry handler: Delete only", () => {
    const html = render();
    expect(html).not.toContain("Retry");
    expect(html).toContain("Delete");
  });
});
