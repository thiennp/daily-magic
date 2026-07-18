import { describe, expect, it, beforeEach, afterEach } from "vitest";

import { DELEGATED_WRITER_AGENT_STORAGE_KEY } from "@/features/agent/constants/delegatedWriterAgentStorage.constant";
import { hasStoredDelegatedWriterAgent } from "@/features/agent/utils/hasStoredDelegatedWriterAgent";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("hasStoredDelegatedWriterAgent (AGENT-027)", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("is false when no CLI preference is stored", () => {
    expect(hasStoredDelegatedWriterAgent()).toBe(false);
  });

  it("is true after a CLI preference is saved", () => {
    window.localStorage.setItem(DELEGATED_WRITER_AGENT_STORAGE_KEY, "cursor");

    expect(hasStoredDelegatedWriterAgent()).toBe(true);
  });
});
