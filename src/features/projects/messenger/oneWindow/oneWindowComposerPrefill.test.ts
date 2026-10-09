import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ONE_WINDOW_COMPOSER_PREFILL_EVENT,
  askAssistantAgain,
} from "@/features/projects/messenger/oneWindow/oneWindowComposerPrefill";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("askAssistantAgain", () => {
  it("announces an @mention for the composer to fill", () => {
    const dispatchEvent = vi.fn();
    vi.stubGlobal("window", { dispatchEvent });
    askAssistantAgain("NRG Lead");
    const event = dispatchEvent.mock.calls[0]?.[0] as CustomEvent<string>;
    expect(event.type).toBe(ONE_WINDOW_COMPOSER_PREFILL_EVENT);
    expect(event.detail).toBe("@NRG Lead ");
  });
});
