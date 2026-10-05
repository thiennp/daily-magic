import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const projectsState = vi.hoisted(() => ({
  projects: [] as UserProjectRecord[],
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/features/agent/hooks/useUserProjects", () => ({
  useUserProjects: () => ({
    projects: projectsState.projects,
    compositionCountsByProjectId: {},
    isLoading: false,
    loadFailed: false,
    refreshProjects: vi.fn(async () => undefined),
    addProject: vi.fn(),
    removeProject: vi.fn(),
  }),
}));

vi.mock("@/features/agent/hooks/useMyMacDevices", () => ({
  default: () => ({ devices: [], displayNameById: new Map() }),
}));

vi.mock("@/features/agent/SendTaskComposerCreateProjectForm", () => ({
  default: () => createElement("div", null, "create-project-form-stub"),
}));

vi.mock("@/features/home/hooks/useLocalMacBrowserContext", () => ({
  default: () => ({ localTokenHash: null }),
}));

const buildProject = (
  id: string,
  lastUsedAt: string | null,
): UserProjectRecord => ({
  id,
  ownerUserId: "user-1",
  deviceId: null,
  name: `Project ${id}`,
  folderPath: `/repos/${id}`,
  repoUrls: [],
  defaultBranch: null,
  lastUsedAt,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("HomeProjectsPanel render", () => {
  beforeEach(() => {
    projectsState.projects = [
      buildProject("alpha", "2026-09-01T00:00:00.000Z"),
      buildProject("bravo", "2026-10-04T00:00:00.000Z"),
      buildProject("charlie", null),
      buildProject("delta", "2026-10-05T00:00:00.000Z"),
      buildProject("echo", "2026-10-01T00:00:00.000Z"),
    ];
  });

  it(
    "renders the shared /projects cards for only the 3 most recently active projects",
    async () => {
    const { default: HomeProjectsPanel } =
      await import("@/features/home/HomeProjectsPanel");
    const html = renderToStaticMarkup(createElement(HomeProjectsPanel));

    expect(html).toContain("Your projects");
    expect(html).toContain('href="/projects"');
    expect(html).toContain("Project delta");
    expect(html).toContain("Project bravo");
    expect(html).toContain("Project echo");
    expect(html).not.toContain("Project alpha");
    expect(html).not.toContain("Project charlie");
    expect(html.indexOf("Project delta")).toBeLessThan(
      html.indexOf("Project bravo"),
    );
    expect(html.indexOf("Project bravo")).toBeLessThan(
      html.indexOf("Project echo"),
    );
    expect(html).not.toContain("New project");
    expect(html).not.toContain("create-project-form-stub");
  },
    15_000,
  );

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
