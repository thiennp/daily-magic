import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  DEFAULT_DELEGATED_WRITER_AGENT,
  DELEGATED_WRITER_AGENT_STORAGE_KEY,
} from "@/features/agent/constants/delegatedWriterAgentStorage.constant";
import { readDelegatedWriterAgentFromStorage } from "@/features/agent/utils/readDelegatedWriterAgentFromStorage";
import { mockBrowserLocalStorage } from "@/test/mockBrowserLocalStorage";

describe("readDelegatedWriterAgentFromStorage", () => {
  beforeEach(() => {
    mockBrowserLocalStorage();
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns the stored harness writer when valid", () => {
    window.localStorage.setItem(DELEGATED_WRITER_AGENT_STORAGE_KEY, "cursor");

    expect(readDelegatedWriterAgentFromStorage()).toBe("cursor");
  });

  it("falls back to the default when storage is missing or invalid", () => {
    expect(readDelegatedWriterAgentFromStorage()).toBe(
      DEFAULT_DELEGATED_WRITER_AGENT,
    );

    window.localStorage.setItem(
      DELEGATED_WRITER_AGENT_STORAGE_KEY,
      "not-a-writer",
    );
    expect(readDelegatedWriterAgentFromStorage()).toBe(
      DEFAULT_DELEGATED_WRITER_AGENT,
    );
  });
});
