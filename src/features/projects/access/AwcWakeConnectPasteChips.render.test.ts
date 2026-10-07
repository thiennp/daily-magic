import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcWakeConnectPasteCard from "@/features/projects/access/AwcWakeConnectPasteCard";
import AwcWakeConnectPasteChips from "@/features/projects/access/AwcWakeConnectPasteChips";

const KEY = "sk_live_0123456789abcdef";
const chips = (text: string): string =>
  renderToStaticMarkup(createElement(AwcWakeConnectPasteChips, { text })).replace(/<[^>]+>/g, " ");

describe("one-box wake connect chips (DF-036 EN PASS S5)", () => {
  it("empty box: both parts not pasted yet", () => {
    const t = chips("");
    expect(t).toContain("Wake link — not pasted yet");
    expect(t).toContain("Key — not pasted yet");
  });

  it("found parts: site + hidden key, never the key itself", () => {
    const t = chips(`https://grok.example.com/hooks/wake/abc ${KEY}`);
    expect(t).toContain("Wake link ✓ grok.example.com");
    expect(t).toContain("Key ✓ hidden");
    expect(t).not.toContain(KEY);
  });

  it("rejected address reads 'check it', not 'not pasted yet'", () => {
    const t = chips(`http://grok.example.com/x ${KEY}`);
    expect(t).toContain("Wake link — check it");
    expect(t).not.toContain("Wake link — not pasted yet");
  });

  it("card: plain steps, no jargon, chips mounted", () => {
    const html = renderToStaticMarkup(
      createElement(AwcWakeConnectPasteCard, { projectId: "p1", membershipId: "m1", memberName: "NRG Lead" }),
    );
    expect(html).toContain("NRG Lead posted two links: wake link and key.");
    expect(html).toContain('placeholder="Paste the wake link, then the key"');
    expect(html).toContain("data-wake-detect");
    expect(html.toLowerCase()).not.toMatch(/routine|webhook url|token|secret/);
  });
});
