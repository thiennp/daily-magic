"use client";

import { useEffect, type ReactNode } from "react";

import {
  PROJECTS_STORYBOOK_ACCESS_MEMBERS,
  PROJECTS_STORYBOOK_ACCESS_PENDING,
  PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
  PROJECTS_STORYBOOK_COMPOSITION_ITEMS,
  PROJECTS_STORYBOOK_DISPLAY_NAME_PRESETS,
  PROJECTS_STORYBOOK_INVITES,
  PROJECTS_STORYBOOK_SAMPLE_PROJECT,
} from "@/features/projects/storybook/projectsStorybookFixtures";

const isProjectsStorybookApiUrl = (url: string): boolean =>
  url.includes("/api/projects/");

const buildMockResponse = (
  url: string,
  init: RequestInit | undefined,
): Response | null => {
  if (!isProjectsStorybookApiUrl(url)) {
    return null;
  }

  const method = init?.method ?? "GET";

  if (url.includes("/composition") && method === "GET") {
    return Response.json({
      ok: true,
      counts: PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
      items: PROJECTS_STORYBOOK_COMPOSITION_ITEMS,
    });
  }

  if (url.includes("/display-name-presets") && method === "GET") {
    return Response.json(PROJECTS_STORYBOOK_DISPLAY_NAME_PRESETS);
  }

  if (url.includes("/invites") && method === "GET") {
    return Response.json({ invites: PROJECTS_STORYBOOK_INVITES });
  }

  if (url.includes("/invites") && method === "POST") {
    return Response.json(
      {
        inviteId: "invite-fresh",
        url: "https://www.agentwitch.com/invite/p/storybook-token-once",
        expiresAt: "2026-10-09T00:00:00.000Z",
        maxUses: 1,
        usesRemaining: 1,
        teamLabel: null,
        scopes: ["acl:self", "project:meta"],
      },
      { status: 201 },
    );
  }

  if (url.includes("/invites/") && method === "DELETE") {
    return new Response(null, { status: 204 });
  }

  if (url.includes("/access") && method === "GET") {
    return Response.json({
      ok: true,
      members: PROJECTS_STORYBOOK_ACCESS_MEMBERS,
      pendingRequests: PROJECTS_STORYBOOK_ACCESS_PENDING,
    });
  }

  if (url.includes("/access") && method === "PATCH") {
    return Response.json({ ok: true });
  }

  if (url.includes("/memberships/") && method === "PATCH") {
    return Response.json({ ok: true });
  }

  if (url.includes("/folder-refs") && method === "GET") {
    return Response.json({ ok: true, folderRefs: [] });
  }

  if (url.includes("/activity") && method === "GET") {
    return Response.json({ ok: true, events: [] });
  }

  if (method === "DELETE") {
    return Response.json({ ok: true });
  }

  if (method === "PATCH") {
    return Response.json({
      ok: true,
      project: PROJECTS_STORYBOOK_SAMPLE_PROJECT,
    });
  }

  return Response.json({ ok: true });
};

const ProjectsStorybookMockFetchProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;
      const mock = buildMockResponse(url, init);

      if (mock !== null) {
        await new Promise((resolve) => {
          setTimeout(resolve, 120);
        });
        return mock;
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return children;
};

export default ProjectsStorybookMockFetchProvider;
