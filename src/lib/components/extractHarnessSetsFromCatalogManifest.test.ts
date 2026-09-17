import { describe, expect, it } from "vitest";

import extractHarnessSetsFromCatalogManifest from "@/lib/components/extractHarnessSetsFromCatalogManifest";

describe("extractHarnessSetsFromCatalogManifest", () => {
  it("reads set slugs and versions from harness manifest_json", () => {
    const sets = extractHarnessSetsFromCatalogManifest({
      version: 1,
      sets: {
        demo: { slug: "demo", name: "Demo", version: 2, items: [] },
      },
    });

    expect(sets).toEqual([{ slug: "demo", name: "Demo", version: 2 }]);
  });
});
