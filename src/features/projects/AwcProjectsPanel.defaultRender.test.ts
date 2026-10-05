import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import {
  buildHomeRenderTestProject,
  projectsState,
} from "@/features/home/homeProjectsPanelRenderTestSetup";

describe("AwcProjectsPanel default render", () => {
  beforeEach(() => {
    projectsState.projects = [
      buildHomeRenderTestProject("alpha", "2026-09-01T00:00:00.000Z"),
      buildHomeRenderTestProject("bravo", "2026-10-04T00:00:00.000Z"),
      buildHomeRenderTestProject("charlie", null),
      buildHomeRenderTestProject("delta", "2026-10-05T00:00:00.000Z"),
      buildHomeRenderTestProject("echo", "2026-10-01T00:00:00.000Z"),
    ];
  });

  it("keeps the full /projects panel (all projects + New project) by default", async () => {
    const { default: AwcProjectsPanel } =
      await import("@/features/projects/AwcProjectsPanel");
    const html = renderToStaticMarkup(createElement(AwcProjectsPanel));

    for (const id of ["alpha", "bravo", "charlie", "delta", "echo"]) {
      expect(html).toContain(`Project ${id}`);
    }
    expect(html).toContain("New project");
    expect(html).toContain("create-project-form-stub");
  });
});
