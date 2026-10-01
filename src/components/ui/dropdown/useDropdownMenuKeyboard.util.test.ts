import { afterEach, describe, expect, it, vi } from "vitest";

import { attachDropdownMenuEscapeKeyListener } from "@/components/ui/dropdown/useDropdownMenuKeyboard.util";

describe("attachDropdownMenuEscapeKeyListener", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("registers a capture-phase keydown listener and closes on Escape", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal("document", {
      addEventListener,
      removeEventListener,
    });

    const focus = vi.fn();
    const toggleRef = {
      current: { focus } as unknown as HTMLElement,
    };
    const onClose = vi.fn();

    const detach = attachDropdownMenuEscapeKeyListener({ onClose, toggleRef });

    expect(addEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
      true,
    );

    const handler = addEventListener.mock.calls[0][1] as (
      event: KeyboardEvent,
    ) => void;
    const preventDefault = vi.fn();
    handler({
      key: "Escape",
      preventDefault,
    } as unknown as KeyboardEvent);

    expect(onClose).toHaveBeenCalledOnce();
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(focus).toHaveBeenCalledOnce();

    detach();

    expect(removeEventListener).toHaveBeenCalledWith("keydown", handler, true);
  });
});
