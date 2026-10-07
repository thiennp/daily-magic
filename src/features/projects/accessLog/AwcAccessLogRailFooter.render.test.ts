import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcAccessLogRailFooter from "@/features/projects/accessLog/AwcAccessLogRailFooter";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";

describe("AwcAccessLogRailFooter (HN-H3 design)", () => {
  it("members rail link reads View access log; modal title stays Access log", () => {
    const html = renderToStaticMarkup(
      createElement(AwcAccessLogRailFooter, { projectId: "p1" }),
    );
    expect(C.railLink).toBe("View access log");
    expect(C.title).toBe("Access log");
    expect(html).toMatch(/>View access log<\/button>/);
  });
});
