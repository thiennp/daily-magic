import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import WorkflowTaskFieldBlock from "@/features/workflows/WorkflowTaskFieldBlock";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

describe("WorkflowTaskFieldBlock", () => {
  it("associates the caption with the input (WORKFLOWS-001)", () => {
    const html = renderToStaticMarkup(
      createElement(WorkflowTaskFieldBlock, {
        field: {
          key: "clientName",
          label: "Client or company name",
          type: WorkflowFieldInputType.TEXT,
          required: true,
        },
        value: "",
        onChange: () => undefined,
      }),
    );

    expect(html).toContain('for="workflow-field-clientName"');
    expect(html).toContain('id="workflow-field-clientName"');
    expect(html).toContain("Client or company name");
  });
});
