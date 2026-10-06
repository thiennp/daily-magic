import { describe, expect, it } from "vitest";

import { isProjectPageTabId } from "@/features/projects/projectPageTabs.constant";
import {
  parseProjectPageHash,
  readProjectPageHashParam,
} from "@/features/projects/utils/parseProjectPageHash";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

describe("parseProjectPageHash", () => {
  it("takes the tab id before ? so deep links keep their tab", () => {
    expect(parseProjectPageHash("#library?item=c1").tab).toBe("library");
    expect(parseProjectPageHash("#reports?report=r1").tab).toBe("reports");
    expect(parseProjectPageHash("#activity?mode=task").tab).toBe("activity");
    expect(
      isProjectPageTabId(parseProjectPageHash("#library?item=c1").tab),
    ).toBe(true);
  });

  it("plain and empty hashes", () => {
    expect(parseProjectPageHash("#settings").tab).toBe("settings");
    expect(parseProjectPageHash("#settings").query.toString()).toBe("");
    expect(parseProjectPageHash("").tab).toBe("");
    expect(parseProjectPageHash("library").tab).toBe("library");
  });

  it("reads the query param only for the matching tab", () => {
    expect(
      readProjectPageHashParam("#library?item=c1", "library", "item"),
    ).toBe("c1");
    expect(
      readProjectPageHashParam("#reports?report=r1", "library", "item"),
    ).toBe(null);
    expect(readProjectPageHashParam("#library?item=", "library", "item")).toBe(
      null,
    );
    expect(readProjectPageHashParam("#library", "library", "item")).toBe(null);
  });

  it("round-trips legacy redirect hashes (encoded ids)", () => {
    const reportHash = buildProjectTabHash("reports", { report: "run 1/x" });
    const itemHash = buildProjectTabHash("library", { item: "skill:a-b" });
    expect(readProjectPageHashParam(reportHash, "reports", "report")).toBe(
      "run 1/x",
    );
    expect(readProjectPageHashParam(itemHash, "library", "item")).toBe(
      "skill:a-b",
    );
  });
});
