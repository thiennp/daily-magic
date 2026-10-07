import { afterEach, describe, expect, it, vi } from "vitest";

import { copyTextFromLoader } from "@/features/projects/utils/copyTextFromLoader";

class FakeClipboardItem {
  constructor(readonly items: Record<string, Promise<Blob>>) {}
}

describe("copyTextFromLoader", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses a pending ClipboardItem when supported (keeps the click gesture)", async () => {
    const written: Blob[] = [];
    const write = vi.fn(async (items: FakeClipboardItem[]) => {
      written.push(await items[0].items["text/plain"]);
    });
    vi.stubGlobal("ClipboardItem", FakeClipboardItem);
    vi.stubGlobal("navigator", { clipboard: { write, writeText: vi.fn() } });
    expect(await copyTextFromLoader(Promise.resolve("hello"))).toBe(true);
    expect(await written[0].text()).toBe("hello");
  });

  it("falls back to writeText; null text copies nothing", async () => {
    const writeText = vi.fn(async () => undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    expect(await copyTextFromLoader(Promise.resolve("hi"))).toBe(true);
    expect(writeText).toHaveBeenCalledWith("hi");
    expect(await copyTextFromLoader(Promise.resolve(null))).toBe(false);
    expect(writeText).toHaveBeenCalledTimes(1);
  });
});
