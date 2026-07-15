import { describe, expect, it } from "vitest";

import escapeHtmlText from "./escapeHtmlText";

describe("escapeHtmlText", () => {
  it("escapes HTML-sensitive characters", () => {
    expect(escapeHtmlText(`<script>"host"&'test'`)).toBe(
      "&lt;script&gt;&quot;host&quot;&amp;&#39;test&#39;",
    );
  });

  it("leaves safe text unchanged", () => {
    expect(escapeHtmlText("www.agentwitch.com")).toBe("www.agentwitch.com");
  });
});
