import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { req, text } from "@/features/projects/access/approvalCard/AwcPendingApprovalCard.fixtures";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import { PENDING_RESOLVED_COLLAPSE_MS } from "@/features/projects/access/hooks/useCollapsedPendingResolved";

const base = {
  projectId: "p1",
  onApprove: async () => ({ ok: true }),
  onDeny: async () => true,
};

describe("pending list — DF-036 stale PENDING block", () => {
  it("rail (hideWhenIdle): renders nothing when no request is open", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessPendingList, { ...base, pending: [], hideWhenIdle: true }),
    );
    expect(html).toBe("");
  });

  it("Access panel: no Pending heading at 0 open, empty line stays", () => {
    const html = text(
      renderToStaticMarkup(createElement(AwcProjectAccessPendingList, { ...base, pending: [] })),
    );
    expect(html).not.toContain("Pending");
    expect(html).toContain("No pending access requests.");
  });

  it("shows the Pending heading + count while a request is open", () => {
    const html = text(
      renderToStaticMarkup(
        createElement(AwcProjectAccessPendingList, { ...base, pending: [req], hideWhenIdle: true }),
      ),
    );
    expect(html).toContain("Pending 1");
  });

  it("resolved cards collapse after ~5 s", () => {
    expect(PENDING_RESOLVED_COLLAPSE_MS).toBe(5000);
  });
});
