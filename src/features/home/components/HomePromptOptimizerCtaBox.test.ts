import { readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePromptOptimizerCtaBox from "@/features/home/components/HomePromptOptimizerCtaBox";
import {
  HOME_PROMPT_OPTIMIZER_CTA_COPY,
  HOME_PROMPT_OPTIMIZER_CTA_HREF,
} from "@/features/home/constants/homePromptOptimizerCta.constant";

describe("HomePromptOptimizerCtaBox", () => {
  it("renders one box with a line of copy and a link to the optimizer, no form", () => {
    const html = renderToStaticMarkup(createElement(HomePromptOptimizerCtaBox));

    expect(html).toContain(HOME_PROMPT_OPTIMIZER_CTA_COPY.body);
    expect(html).toContain(`href="${HOME_PROMPT_OPTIMIZER_CTA_HREF}"`);
    expect(html).toContain(HOME_PROMPT_OPTIMIZER_CTA_COPY.cta);
    expect(html).not.toContain("<form");
    expect(html).not.toContain("<textarea");
    expect(html).not.toContain("<input");
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it("links to the existing App Router prompt optimizer page", () => {
    expect(HOME_PROMPT_OPTIMIZER_CTA_HREF).toBe("/prompt-optimizer");
    expect(() =>
      readFileSync(
        path.join(process.cwd(), "src/app/(app)/prompt-optimizer/page.tsx"),
        "utf8",
      ),
    ).not.toThrow();
  });
});
