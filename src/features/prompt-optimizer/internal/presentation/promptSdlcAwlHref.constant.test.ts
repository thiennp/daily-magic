import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK } from "@/features/agent-witch/macDevices/public-api/types";
import {
  PROMPT_SDLC_AWL_GUIDE_HREF,
  PROMPT_SDLC_AWL_PAGE_HREF,
  PROMPT_SDLC_AWL_SAMPLE_HREF,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

describe("promptSdlcAwlHref (AWL-H7 PM-3 b)", () => {
  it("targets Mac deep link, not a retired http Prompt optimizer route", () => {
    expect(PROMPT_SDLC_AWL_PAGE_HREF).toBe(
      AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK,
    );
    expect(PROMPT_SDLC_AWL_PAGE_HREF).toBe(
      "agentwitch-local://prompt-optimizer",
    );
    expect(PROMPT_SDLC_AWL_PAGE_HREF).not.toMatch(/^https?:\/\//);
    expect(PROMPT_SDLC_AWL_PAGE_HREF).not.toContain("127.0.0.1");
    expect(PROMPT_SDLC_AWL_PAGE_HREF).not.toContain(":43347");
    expect(PROMPT_SDLC_AWL_GUIDE_HREF).toBe(
      "agentwitch-local://prompt-optimizer/guide",
    );
    expect(PROMPT_SDLC_AWL_SAMPLE_HREF).toBe(
      "agentwitch-local://prompt-optimizer?example=support-reply",
    );
  });
});
