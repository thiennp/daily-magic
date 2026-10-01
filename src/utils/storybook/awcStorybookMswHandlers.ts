import { http, HttpResponse } from "msw";

import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";
import { AWC_STORYBOOK_SAMPLE_PROJECTS } from "@/utils/storybook/awcStorybookFixtures";
import { awcStorybookCapabilityTemplateSuccessHandlers } from "@/utils/storybook/awcStorybookMswCapabilityHandlers";
import {
  awcStorybookMswErrorHandlers,
  awcStorybookMswInfiniteHandlers,
} from "@/utils/storybook/awcStorybookMswLoadingAndErrorHandlers";
import { createAwcStorybookAutomationsSuccessHandler } from "@/utils/storybook/awcStorybookMswAutomationsHandlers";
import { createAwcStorybookMarketplaceSuccessHandler } from "@/utils/storybook/awcStorybookMswMarketplaceHandlers";
import {
  AWC_STORYBOOK_SAMPLE_CAPABILITY,
  AWC_STORYBOOK_SAMPLE_DEVICE,
  AWC_STORYBOOK_SAMPLE_RUN,
} from "@/utils/storybook/awcStorybookMswSampleData";

const disconnectedCursorCloudSummary = {
  connected: false,
  apiKeyName: null,
  cursorUserEmail: null,
  connectedAt: null,
};

export const createAwcStorybookMswHandlers = (
  status: StorybookPageStatus,
): ReturnType<typeof http.get>[] => {
  if (status === "loading") {
    return awcStorybookMswInfiniteHandlers;
  }

  if (status === "error") {
    return awcStorybookMswErrorHandlers;
  }

  const hasData = status !== "empty" && status !== "guest";
  const devices = hasData ? [AWC_STORYBOOK_SAMPLE_DEVICE] : [];
  const projects = hasData ? [...AWC_STORYBOOK_SAMPLE_PROJECTS] : [];
  const runs = hasData ? [AWC_STORYBOOK_SAMPLE_RUN] : [];
  const capabilities = hasData ? [AWC_STORYBOOK_SAMPLE_CAPABILITY] : [];

  return [
    http.get("/api/cursor-cloud/connection", () =>
      HttpResponse.json(disconnectedCursorCloudSummary),
    ),
    http.get("/api/agent-witch/devices", () =>
      HttpResponse.json({ devices, serverInstallBundleVersion: "200" }),
    ),
    http.get("/api/projects", () =>
      HttpResponse.json({
        projects,
        compositionCountsByProjectId: hasData
          ? {
              [AWC_STORYBOOK_SAMPLE_PROJECTS[0].id]: {
                harness: 1,
                workflow: 0,
                agent: 0,
              },
              [AWC_STORYBOOK_SAMPLE_PROJECTS[1].id]: {
                harness: 0,
                workflow: 0,
                agent: 0,
              },
              [AWC_STORYBOOK_SAMPLE_PROJECTS[2].id]: {
                harness: 2,
                workflow: 1,
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
      HttpResponse.json({ capabilities }),
    ),
    createAwcStorybookAutomationsSuccessHandler(hasData),
    createAwcStorybookMarketplaceSuccessHandler(status),
    ...awcStorybookCapabilityTemplateSuccessHandlers,
  ];
};
