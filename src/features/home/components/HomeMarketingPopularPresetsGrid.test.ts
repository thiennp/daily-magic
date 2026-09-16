import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("HomeMarketingPopularPresetsGrid (HOME-038)", () => {
  it("syncs capabilityId on preset pick and does not strip it on dialog dismiss", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/home/components/HomeMarketingPopularPresetsGrid.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("applyPresetCapabilityIdToSearchParams");
    expect(source).toContain(
      "router.replace(buildPathWithSearchParams(pathname, nextParams)",
    );
    expect(source).not.toContain("removePresetCapabilityIdFromSearchParams");
    expect(source).toMatch(
      /const closeDialog = useCallback\(\(\) => \{\s*setSelectedPreset\(null\);/,
    );
  });
});
