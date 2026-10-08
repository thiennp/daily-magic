import type { ChangeEvent, KeyboardEvent } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  reactHookRunner as runner,
  runWithHookSlots,
} from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import { useOneWindowComposerDraft } from "@/features/projects/messenger/oneWindow/useOneWindowComposerDraft";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } =
    await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

const assistants = [{ membershipId: "b1", displayName: "Scout" }];

const useDraft = () =>
  useOneWindowComposerDraft({
    assistants,
    mentionsEnabled: true,
    onSubmit: vi.fn(),
  });

const changeText = (
  draft: ReturnType<typeof useDraft>,
  value: string,
  caret: number,
): void => {
  draft.onChange({
    target: { value, selectionStart: caret },
    currentTarget: { value, selectionStart: caret },
  } as ChangeEvent<HTMLTextAreaElement>);
};

const escKeyDown = (
  draft: ReturnType<typeof useDraft>,
): { stopPropagation: ReturnType<typeof vi.fn> } => {
  const stopPropagation = vi.fn();
  const preventDefault = vi.fn();
  draft.onKeyDown({
    key: "Escape",
    shiftKey: false,
    nativeEvent: { isComposing: false },
    preventDefault,
    stopPropagation,
  } as unknown as KeyboardEvent<HTMLTextAreaElement>);
  return { stopPropagation };
};

describe("P1-S4b composer Esc (7257954)", () => {
  beforeEach(() => {
    runner.slots = [];
    vi.stubGlobal("window", {
      requestAnimationFrame: (fn: () => void) => fn(),
    });
    vi.stubGlobal("document", {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("with @ list open: Esc closes the picker and stops propagation so Chat dock Esc does not fire", () => {
    changeText(runWithHookSlots(useDraft), "hi @sc", 6);
    const draft = runWithHookSlots(useDraft);
    expect(draft.open).toBe(true);
    const { stopPropagation } = escKeyDown(draft);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(runWithHookSlots(useDraft).open).toBe(false);
  });

  it("with @ list closed: Esc does not stop propagation (dock may collapse full view)", () => {
    const draft = runWithHookSlots(useDraft);
    expect(draft.open).toBe(false);
    const { stopPropagation } = escKeyDown(draft);
    expect(stopPropagation).not.toHaveBeenCalled();
  });
});
