import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("MarketplaceListCard", () => {
  it("uses line-clamp-4 on starter blurbs (HOME-038 parity)", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/marketplace/marketplaceBrowseClasses.constant.ts",
      ),
      "utf8",
    );

    expect(source).toContain("line-clamp-4");
    expect(source).not.toContain("line-clamp-2");
  });

  it("uses type-colored top border and Official/Teammate chips", () => {
    const card = readFileSync(
      join(process.cwd(), "src/features/marketplace/MarketplaceListCard.tsx"),
      "utf8",
    );
    const chrome = readFileSync(
      join(
        process.cwd(),
        "src/features/marketplace/marketplaceListingTypeChrome.constant.ts",
      ),
      "utf8",
    );
    expect(chrome).toContain("border-t-[3px]");
    expect(chrome).toContain("Playbook");
    expect(chrome).toContain("Assistant");
    expect(card).toContain("MARKETPLACE_OFFICIAL_CHIP_LABEL");
    expect(card).toContain("MARKETPLACE_TEAMMATE_CHIP_LABEL");
    expect(card).not.toContain(">Free<");
  });
});
