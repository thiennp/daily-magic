import { delay, http, HttpResponse } from "msw";

import { AWC_STORYBOOK_SAMPLE_AUTOMATION } from "@/utils/storybook/awcStorybookMswSampleData";

export const awcStorybookAutomationsLoadingHandler = http.get(
  "/api/automations",
  async () => {
    await delay("infinite");
  },
);

export const awcStorybookAutomationsErrorHandler = http.get(
  "/api/automations",
  () => HttpResponse.json({ error: "Server error" }, { status: 500 }),
);

export const createAwcStorybookAutomationsSuccessHandler = (
  includeAutomations: boolean,
): ReturnType<typeof http.get> =>
  http.get("/api/automations", () =>
    HttpResponse.json({
      ok: true,
      automations: includeAutomations ? [AWC_STORYBOOK_SAMPLE_AUTOMATION] : [],
    }),
  );
