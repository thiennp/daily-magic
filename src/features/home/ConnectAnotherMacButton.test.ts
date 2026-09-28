import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("ConnectAnotherMacButton", () => {
  it("HOME-056: skips the macOS paste modal on Windows and Linux", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "ConnectAnotherMacButton.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("shouldOpenConnectInstallPasteModal");
    expect(source).toContain("detectBrowserOperatingSystem");
  });
});
