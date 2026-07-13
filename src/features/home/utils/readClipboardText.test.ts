import { afterEach, describe, expect, it, vi } from "vitest";

import { readClipboardText } from "@/features/home/utils/readClipboardText";

describe("readClipboardText", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns clipboard text when read succeeds", async () => {
    const readText = vi.fn().mockResolvedValue("copied command");

    vi.stubGlobal("navigator", {
      clipboard: { readText },
    });

    await expect(readClipboardText()).resolves.toBe("copied command");
  });

  it("returns null when clipboard access is unavailable or fails", async () => {
    vi.stubGlobal("navigator", {});

    await expect(readClipboardText()).resolves.toBeNull();

    const readText = vi.fn().mockRejectedValue(new Error("denied"));

    vi.stubGlobal("navigator", {
      clipboard: { readText },
    });

    await expect(readClipboardText()).resolves.toBeNull();
  });
});
