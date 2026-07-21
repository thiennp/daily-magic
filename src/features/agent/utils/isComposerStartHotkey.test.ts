import { describe, expect, it } from "vitest";

import { isComposerStartHotkey } from "@/features/agent/utils/isComposerStartHotkey";

describe("isComposerStartHotkey (AGENT-047)", () => {
  it("matches Cmd+Enter and Ctrl+Enter", () => {
    expect(
      isComposerStartHotkey({
        key: "Enter",
        metaKey: true,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(true);
    expect(
      isComposerStartHotkey({
        key: "Enter",
        metaKey: false,
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(true);
  });

  it("ignores plain Enter and modified variants", () => {
    expect(
      isComposerStartHotkey({
        key: "Enter",
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(false);
    expect(
      isComposerStartHotkey({
        key: "Enter",
        metaKey: true,
        ctrlKey: false,
        altKey: false,
        shiftKey: true,
      }),
    ).toBe(false);
    expect(
      isComposerStartHotkey({
        key: "a",
        metaKey: true,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(false);
  });
});
