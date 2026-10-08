import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import {
  buildHomeRenderTestProject,
  projectsState,
} from "@/features/home/homeProjectsPanelRenderTestSetup";

describe("HomeProjectsPanel render", () => {
  beforeEach(() => {
    projectsState.projects = [
      buildHomeRenderTestProject("alpha", "2026-09-01T00:00:00.000Z"),
      buildHomeRenderTestProject("bravo", "2026-10-04T00:00:00.000Z"),
      buildHomeRenderTestProject("charlie", null),
      buildHomeRenderTestProject("delta", "2026-10-05T00:00:00.000Z"),
      buildHomeRenderTestProject("echo", "2026-10-01T00:00:00.000Z"),
    ];
  });

  it("renders shared /projects cards for the 4 most recently active projects", async () => {
    const { default: HomeProjectsPanel } =
      await import("@/features/home/HomeProjectsPanel");
    const html = renderToStaticMarkup(createElement(HomeProjectsPanel));

    expect(html).toContain("Your projects");
    expect(html).toContain(">All projects<");
    expect(html).toContain('href="/projects"');
    expect(html).toContain("Project delta");
    expect(html).toContain("Project bravo");
    expect(html).toContain("Project echo");
    expect(html).toContain("Project alpha");
    expect(html).not.toContain("Project charlie");
    expect(html).toContain('href="/projects/delta"');
    expect(html).toContain('href="/projects/alpha"');
    expect(html.indexOf("Project delta")).toBeLessThan(
      html.indexOf("Project bravo"),
    );
    expect(html.indexOf("Project bravo")).toBeLessThan(
      html.indexOf("Project echo"),
    );
    expect(html.indexOf("Project echo")).toBeLessThan(
      html.indexOf("Project alpha"),
    );
    expect(html).toContain(">New project<");
    expect(html).not.toContain("Your most recent projects");
    expect(html).not.toContain("create-project-form-stub");
    expect(html).not.toContain(">Edit<");
  }, 15_000);
});
