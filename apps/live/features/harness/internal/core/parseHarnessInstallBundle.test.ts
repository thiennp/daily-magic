import { describe, expect, it } from "vitest";

import { parseHarnessInstallBundle } from "./parseHarnessInstallBundle";

const item = (id: string, setSlugs: string[] = ["core"]) => ({
  id,
  kind: "skill",
  title: "T",
  content: "body",
  setSlugs,
});

describe("parseHarnessInstallBundle path safety", () => {
  it("keeps ordinary ids and slugs", () => {
    const bundle = parseHarnessInstallBundle({
      name: "Set",
      slug: "core-set",
      items: [item("0f8c2a1e-7b1d-4c2a-9d31-aaaaaaaaaaaa")],
    });
    expect(bundle?.items).toHaveLength(1);
  });

  it("drops an item whose id could leave the harness folder", () => {
    const bundle = parseHarnessInstallBundle({
      name: "Set",
      slug: "core-set",
      items: [
        item("../../../../.claude"),
        item("a/b"),
        item(".."),
        item("ok-id", ["../x"]),
      ],
    });
    expect(bundle?.items).toEqual([]);
  });

  it("refuses a bundle slug that is a path", () => {
    expect(
      parseHarnessInstallBundle({ name: "S", slug: "../etc", items: [] }),
    ).toBeNull();
  });
});
