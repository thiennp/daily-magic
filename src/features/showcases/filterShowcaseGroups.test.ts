import { describe, expect, it } from "vitest";

import {
  ALL_SHOWCASE_GROUPS,
  filterShowcaseGroups,
  type ShowcaseGroup,
} from "@/features/showcases/filterShowcaseGroups";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const article = (title: string, subtitle = ""): ShowcaseArticle =>
  ({ slug: title, title, subtitle, category: "Start here" }) as ShowcaseArticle;

const groups: readonly ShowcaseGroup[] = [
  { id: "a", title: "A", articles: [article("Weekly update")] },
  { id: "b", title: "B", articles: [article("Invoices", "Chased politely")] },
];

describe("filterShowcaseGroups", () => {
  it("keeps everything for an empty query and all groups", () => {
    expect(filterShowcaseGroups(groups, "", ALL_SHOWCASE_GROUPS)).toHaveLength(
      2,
    );
  });

  it("matches title or subtitle case-insensitively and drops empty groups", () => {
    const result = filterShowcaseGroups(groups, " POLITE", ALL_SHOWCASE_GROUPS);
    expect(result.map((g) => g.id)).toEqual(["b"]);
  });

  it("limits to the chosen group", () => {
    expect(filterShowcaseGroups(groups, "", "a").map((g) => g.id)).toEqual([
      "a",
    ]);
    expect(filterShowcaseGroups(groups, "invoice", "a")).toHaveLength(0);
  });
});
