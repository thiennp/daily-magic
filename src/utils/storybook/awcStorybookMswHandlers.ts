import { delay, http, HttpResponse } from "msw";

import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";
import { AWC_STORYBOOK_SAMPLE_PROJECT } from "@/utils/storybook/awcStorybookFixtures";
import {
  AWC_STORYBOOK_SAMPLE_DEVICE,
  AWC_STORYBOOK_SAMPLE_RUN,
} from "@/utils/storybook/awcStorybookMswSampleData";

const infiniteHandlers = [
  http.get("/api/agent-witch/devices", async () => {
    await delay("infinite");
  }),
  http.get("/api/projects", async () => {
    await delay("infinite");
  }),
  http.get("/api/agent-runs", async () => {
    await delay("infinite");
  }),
  http.get("/api/agent-runs/:runId", async () => {
    await delay("infinite");
  }),
  http.get("/api/capabilities/mine", async () => {
    await delay("infinite");
  }),
];

const errorHandlers = [
  http.get("/api/agent-witch/devices", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
  http.get("/api/projects", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
  http.get("/api/agent-runs", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
  http.get("/api/agent-runs/:runId", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
  http.get("/api/capabilities/mine", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
];

export const createAwcStorybookMswHandlers = (
  status: StorybookPageStatus,
): ReturnType<typeof http.get>[] => {
  if (status === "loading") {
    return infiniteHandlers;
  }

  if (status === "error") {
    return errorHandlers;
  }

  const hasData = status !== "empty" && status !== "guest";
  const devices = hasData ? [AWC_STORYBOOK_SAMPLE_DEVICE] : [];
  const projects = hasData ? [AWC_STORYBOOK_SAMPLE_PROJECT] : [];
  const runs = hasData ? [AWC_STORYBOOK_SAMPLE_RUN] : [];

  return [
    http.get("/api/agent-witch/devices", () =>
      HttpResponse.json({ devices, serverInstallBundleVersion: "200" }),
    ),
    http.get("/api/projects", () =>
      HttpResponse.json({
        projects,
        compositionCountsByProjectId: hasData
          ? {
              [AWC_STORYBOOK_SAMPLE_PROJECT.id]: {
                harness: 1,
                workflow: 0,
                agent: 0,
              },
            }
          : {},
      }),
    ),
    http.get("/api/agent-runs", () => HttpResponse.json({ runs })),
    http.get("/api/agent-runs/:runId", ({ params }) => {
      if (!hasData) {
        return HttpResponse.json({ error: "Not found" }, { status: 404 });
      }
      return HttpResponse.json({
        run: { ...AWC_STORYBOOK_SAMPLE_RUN, id: String(params.runId) },
      });
    }),
    http.get("/api/capabilities/mine", () =>
      HttpResponse.json({ capabilities: [] }),
    ),
  ];
};
