import { describe, expect, it } from "vitest";

import { AGENT_WITCH_PUBLIC_UI_TOKENS } from "./agentWitchPublicUiTokens.constant";

describe("AGENT_WITCH_PUBLIC_UI_TOKENS", () => {
  it("exposes brand and gray hex aligned with AWC @theme", () => {
    expect(AGENT_WITCH_PUBLIC_UI_TOKENS.brand600).toBe("#3641f5");
    expect(AGENT_WITCH_PUBLIC_UI_TOKENS.gray50).toBe("#f9fafb");
    expect(AGENT_WITCH_PUBLIC_UI_TOKENS.gray950).toBe("#0c111d");
  });
});
