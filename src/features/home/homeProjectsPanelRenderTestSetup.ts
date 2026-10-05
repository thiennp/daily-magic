import { createElement, type ReactNode } from "react";
import { vi } from "vitest";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Mutable fixture list shared by home/projects panel render tests. */
export const projectsState: { projects: UserProjectRecord[] } = {
  projects: [],
};

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    readonly href: string;
    readonly children?: ReactNode;
    readonly [key: string]: unknown;
  }) => createElement("a", { href, ...rest }, children),
}));

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { id: "user-1", email: "u@example.com" } },
    status: "authenticated",
  }),
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

vi.mock("@/features/projects/hooks/useAwcProjectDevicePresentation", () => ({
  default: () => ({
    presence: { statusIcon: "offline" as const, text: "No Mac linked" },
    editCta: {
      state: "unknown_device" as const,
      buttonLabel: "Edit on this Mac",
      href: null,
      helperText: null,
    },
  }),
}));

export const buildHomeRenderTestProject = (
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
