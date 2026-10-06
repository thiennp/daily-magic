import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/marketing/MarketingShell", () => ({
  default: ({ children }: { readonly children: unknown }) => children,
}));

import ShowcasesIndexPageLayout from "@/features/showcases/ShowcasesIndexPageLayout";

describe("ShowcasesIndexPageLayout headings", () => {
  it("renders the page title as the single h1", () => {
    const html = renderToStaticMarkup(createElement(ShowcasesIndexPageLayout));
    const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/gu) ?? [];
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toContain("See how teams use Agent Witch");
  });
});
