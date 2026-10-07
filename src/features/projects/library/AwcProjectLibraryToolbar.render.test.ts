import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectLibraryToolbar from "@/features/projects/library/AwcProjectLibraryToolbar";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";

const render = (showVisibilityInfo: boolean): string =>
  renderToStaticMarkup(
    createElement(AwcProjectLibraryToolbar, {
      counts: { all: 1, playbook: 1, workflow: 0, skill: 0 },
      filter: "all",
      query: "",
      onFilterChange: () => undefined,
      onQueryChange: () => undefined,
      showVisibilityInfo,
    }),
  );

describe("AwcProjectLibraryToolbar drafts (i) tooltip (HN-H3 design)", () => {
  it("owner: shows the (i) button with the drafts note as its tooltip", () => {
    const html = render(true);
    expect(html).toContain(`aria-label="${C["library.visibilityInfoLabel"]}"`);
    expect(html).toContain('role="tooltip"');
    expect(html).toContain(C["library.visibilityHint"]);
  });

  it("without the flag: no (i) tooltip", () => {
    const html = render(false);
    expect(html).not.toContain('role="tooltip"');
    expect(html).not.toContain(C["library.visibilityHint"]);
  });
});
