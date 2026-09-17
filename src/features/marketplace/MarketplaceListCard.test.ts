import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("MarketplaceListCard", () => {
  it("uses line-clamp-4 on starter blurbs (HOME-038 parity)", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/marketplace/MarketplaceListCard.tsx"),
      "utf8",
    );

    expect(source).toContain("line-clamp-4");
    expect(source).not.toContain("line-clamp-2");
  });
});
