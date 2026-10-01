import { http, HttpResponse } from "msw";

import { listCapabilityTemplateSummaries } from "@/lib/capabilities/templates/listCapabilityTemplates";

export const awcStorybookCapabilityTemplateSuccessHandlers = [
  http.get("/api/capabilities/templates", () =>
    HttpResponse.json({ templates: listCapabilityTemplateSummaries() }),
  ),
  http.get("/api/capabilities/templates/:templateId", ({ params }) => {
    const summaries = listCapabilityTemplateSummaries();
    const summary = summaries.find(
      (template) => template.id === String(params.templateId),
    );
    if (summary === undefined) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    return HttpResponse.json({ template: summary });
  }),
];

export const awcStorybookCapabilityTemplateErrorHandlers = [
  http.get("/api/capabilities/templates", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
  http.get("/api/capabilities/templates/:templateId", () =>
    HttpResponse.json({ error: "Server error" }, { status: 500 }),
  ),
];
