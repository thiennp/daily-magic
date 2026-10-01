import { delay, http, HttpResponse } from "msw";

import { awcStorybookAutomationsLoadingHandler } from "@/utils/storybook/awcStorybookMswAutomationsHandlers";
import { awcStorybookCapabilityTemplateErrorHandlers } from "@/utils/storybook/awcStorybookMswCapabilityHandlers";
import { awcStorybookAutomationsErrorHandler } from "@/utils/storybook/awcStorybookMswAutomationsHandlers";
import {
  awcStorybookMarketplaceErrorHandler,
  awcStorybookMarketplaceLoadingHandler,
} from "@/utils/storybook/awcStorybookMswMarketplaceHandlers";

export const awcStorybookMswInfiniteHandlers = [
  http.get("/api/cursor-cloud/connection", async () => {
    await delay("infinite");
  }),
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
  awcStorybookAutomationsLoadingHandler,
  http.get("/api/capabilities/templates", async () => {
    await delay("infinite");
  }),
  awcStorybookMarketplaceLoadingHandler,
];

export const awcStorybookMswErrorHandlers = [
  http.get("/api/cursor-cloud/connection", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
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
  awcStorybookAutomationsErrorHandler,
  awcStorybookMarketplaceErrorHandler,
  ...awcStorybookCapabilityTemplateErrorHandlers,
];
