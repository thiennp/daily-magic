import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const readSibling = (name: string): string =>
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), name), "utf8");

describe("Modal portal layering", () => {
  it("portals the overlay to document.body above page stacking contexts", () => {
    const source = readSibling("index.tsx");

    expect(source).toContain('import { createPortal } from "react-dom"');
    expect(source).toContain("createPortal(modal, document.body)");
    expect(source).toContain("z-99999");
    expect(source).toContain("canPortal");
    expect(source).toContain("relative z-10");
    expect(source).toContain('type="button"');
    expect(source).toContain("onMouseDown");
  });

  it("Connect this computer and paste modals reuse the shared Modal primitive", () => {
    const homeDir = join(
      dirname(fileURLToPath(import.meta.url)),
      "../../../features/home",
    );
    const connectThis = readFileSync(
      join(homeDir, "ConnectThisMacModal.tsx"),
      "utf8",
    );
    const paste = readFileSync(
      join(homeDir, "ConnectInstallPasteModal.tsx"),
      "utf8",
    );

    expect(connectThis).toContain('from "@/components/ui/modal"');
    expect(connectThis).toContain("<Modal");
    expect(paste).toContain('from "@/components/ui/modal"');
    expect(paste).toContain("<Modal");
    expect(paste).not.toContain("fixed inset-0 z-99999");
  });
});
