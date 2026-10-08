import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcWakeConnectPasteCard from "@/features/projects/access/AwcWakeConnectPasteCard";
import AwcWakeConnectPasteChips from "@/features/projects/access/AwcWakeConnectPasteChips";

const KEY = "sk_live_0123456789abcdef";
const chips = (found: {
  site: string | null;
  linkRejected: boolean;
  keyOk: boolean;
}): string =>
  renderToStaticMarkup(
    createElement(AwcWakeConnectPasteChips, { found }),
  ).replace(/<[^>]+>/g, " ");

describe("two-field wake connect chips", () => {
  it("empty fields: both parts not added yet", () => {
    const t = chips({ site: null, linkRejected: false, keyOk: false });
    expect(t).toContain("Wake link — not added yet");
    expect(t).toContain("Key — not added yet");
  });

  it("valid parts: site + hidden key, never the key itself", () => {
    const t = chips({
      site: "grok.example.com",
      linkRejected: false,
      keyOk: true,
    });
    expect(t).toContain("Wake link ✓ grok.example.com");
    expect(t).toContain("Key ✓ hidden");
    expect(t).not.toContain(KEY);
  });

  it("rejected address reads 'check it'", () => {
    expect(chips({ site: null, linkRejected: true, keyOk: true })).toContain(
      "Wake link — check it",
    );
  });

  const card = (memberName: string | null): string =>
    renderToStaticMarkup(
      createElement(AwcWakeConnectPasteCard, {
        projectId: "p1",
        membershipId: "m1",
        memberName,
      }),
    );

  it("card: separate Wake link and Key fields, key hidden, tips mounted", () => {
    const html = card("NRG Lead");
    expect(html).toContain("NRG Lead posted two links: wake link and key.");
    expect(html).toContain('name="grok-wake-url"');
    expect(html).toContain('placeholder="https://…"');
    expect(html).toMatch(
      /type="password"[^>]*name="grok-wake-key"|name="grok-wake-key"[^>]*type="password"/,
    );
    expect(html).toContain('autoComplete="off"');
    expect(html).toContain(">Show</button>");
    expect(html).toContain("data-wake-detect");
    expect(html.toLowerCase()).not.toMatch(/routine|webhook url|token|secret/);
  });

  it("Connect stays disabled until both fields are valid", () => {
    expect(card("NRG Lead")).toMatch(
      /<button[^>]*disabled[^>]*>Connect<\/button>/,
    );
  });

  it("no nickname yet: one plain line asks for it first", () => {
    expect(card(null)).toContain(
      "a nickname first, then connect the wake link.",
    );
  });
});
