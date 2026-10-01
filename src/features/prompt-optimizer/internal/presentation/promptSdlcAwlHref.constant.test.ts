import { describe, expect, it } from "vitest";

import {
  PROMPT_SDLC_AWL_PAGE_HREF,
  PROMPT_SDLC_AWL_SAMPLE_HREF,
} from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

describe("promptSdlcAwlHref", () => {
  it("sends the run to Agent Witch Local", () => {
    expect(PROMPT_SDLC_AWL_PAGE_HREF).toBe(
      "http://127.0.0.1:43347/prompt-optimizer",
    );
    expect(PROMPT_SDLC_AWL_SAMPLE_HREF).toBe(
      "http://127.0.0.1:43347/prompt-optimizer?example=support-reply",
    );
  });
});
