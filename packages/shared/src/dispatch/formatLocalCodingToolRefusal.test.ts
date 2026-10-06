import { describe, expect, it } from "vitest";

import {
  formatLocalCodingToolRefusal,
  formatLocalCodingToolSafetyCopy,
} from "./formatLocalCodingToolRefusal";
import { LocalCodingToolRefusalCode } from "./localCodingToolRefusal.constant";

describe("formatLocalCodingToolRefusal", () => {
  it("uses the locked folder copy with the This computer fallback", () => {
    expect(
      formatLocalCodingToolRefusal(
        LocalCodingToolRefusalCode.FOLDER_NOT_REGISTERED,
      ),
    ).toBe(
      "Blocked: that folder isn't this project's folder on This computer. Nothing ran.",
    );
    expect(
      formatLocalCodingToolRefusal(LocalCodingToolRefusalCode.FOLDER_REQUIRED),
    ).toBe(
      "This project has no folder on This computer yet. Set it in AgentWitch Local, then send the task again.",
    );
  });

  it("fills a named computer", () => {
    expect(
      formatLocalCodingToolRefusal(
        LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED,
        "Studio",
      ),
    ).toBe("Paused on Studio. Turn it back on in AgentWitch Local.");
  });

  it("formats the secret-hidden line", () => {
    expect(formatLocalCodingToolSafetyCopy("secretHidden")).toBe(
      "Output hidden: it looked like it had a secret. Open the report on This computer.",
    );
  });
});
