import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePromptOptimizerCtaBox from "@/features/home/components/HomePromptOptimizerCtaBox";
import {
  HOME_PROMPT_OPTIMIZER_CTA_COPY,
  HOME_PROMPT_OPTIMIZER_CTA_HREF,
} from "@/features/home/constants/homePromptOptimizerCta.constant";
import { PROMPT_SDLC_AWL_PAGE_HREF } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

describe("HomePromptOptimizerCtaBox", () => {
  it("renders one box with a line of copy and a Local link, no form", () => {
    const html = renderToStaticMarkup(createElement(HomePromptOptimizerCtaBox));

    expect(html).toContain(HOME_PROMPT_OPTIMIZER_CTA_COPY.body);
    expect(html).toContain(`href="${HOME_PROMPT_OPTIMIZER_CTA_HREF}"`);
    expect(html).toContain(HOME_PROMPT_OPTIMIZER_CTA_COPY.cta);
    expect(html).not.toContain("<form");
    expect(html).not.toContain("<textarea");
    expect(html).not.toContain("<input");
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it("opens AgentWitch Local Mac deep link (not retired http route)", () => {
    expect(HOME_PROMPT_OPTIMIZER_CTA_HREF).toBe(PROMPT_SDLC_AWL_PAGE_HREF);
    expect(HOME_PROMPT_OPTIMIZER_CTA_HREF).toBe(
      "agentwitch-local://prompt-optimizer",
    );
    expect(HOME_PROMPT_OPTIMIZER_CTA_HREF).not.toContain("127.0.0.1");
    expect(HOME_PROMPT_OPTIMIZER_CTA_HREF).not.toContain(":43347");
    expect(HOME_PROMPT_OPTIMIZER_CTA_COPY.cta).toBe("Open in AgentWitch Local");
    expect(HOME_PROMPT_OPTIMIZER_CTA_COPY.eyebrow).toBe("Prompt optimizer");
  });
});
