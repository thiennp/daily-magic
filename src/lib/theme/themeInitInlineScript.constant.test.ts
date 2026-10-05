import { describe, expect, it } from "vitest";

import { AWC_THEME_INIT_INLINE_SCRIPT } from "@/lib/theme/themeInitInlineScript.constant";
import { AWC_THEME_STORAGE_KEY } from "@/lib/theme/themeStorage.constant";

describe("AWC_THEME_INIT_INLINE_SCRIPT", () => {
  it("applies the existing ThemeContext storage key and .dark class", () => {
    expect(AWC_THEME_STORAGE_KEY).toBe("theme");
    expect(AWC_THEME_INIT_INLINE_SCRIPT).toContain(AWC_THEME_STORAGE_KEY);
    expect(AWC_THEME_INIT_INLINE_SCRIPT).toContain('classList.add("dark")');
  });
});
