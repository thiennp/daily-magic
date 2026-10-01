"use client";

import { useEffect, type ReactNode } from "react";

import {
  PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
  PROJECTS_STORYBOOK_COMPOSITION_ITEMS,
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

  if (url.includes("/composition") && (init?.method ?? "GET") === "GET") {
    return Response.json({
      ok: true,
      counts: PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
      items: PROJECTS_STORYBOOK_COMPOSITION_ITEMS,
    });
  }

  if ((init?.method ?? "GET") === "DELETE") {
    return Response.json({ ok: true });
  }

  if ((init?.method ?? "GET") === "PATCH") {
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
