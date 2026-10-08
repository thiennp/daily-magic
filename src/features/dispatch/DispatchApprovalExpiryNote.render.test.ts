import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import DispatchApprovalExpiryNote from "@/features/dispatch/DispatchApprovalExpiryNote";

describe("DispatchApprovalExpiryNote (S0)", () => {
  it("renders the open line", () => {
    const html = renderToStaticMarkup(
      createElement(DispatchApprovalExpiryNote, {
        id: "n",
        expiry: { kind: "open", line: "This request ends in 3 min." },
      }),
    );
    expect(html).toContain("This request ends in 3 min.");
  });

  it("renders the ended title and body as a status", () => {
    const html = renderToStaticMarkup(
      createElement(DispatchApprovalExpiryNote, {
        id: "n",
        expiry: {
          kind: "ended",
          title: "This request ended",
          body: "Nothing ran.",
        },
      }),
    );
    expect(html).toContain('role="status"');
    expect(html).toContain("This request ended");
    expect(html).toContain("Nothing ran.");
  });

  it("renders nothing without an expiry", () => {
    expect(
      renderToStaticMarkup(
        createElement(DispatchApprovalExpiryNote, {
          id: "n",
          expiry: { kind: "none" },
        }),
      ),
    ).toBe("");
  });
});
