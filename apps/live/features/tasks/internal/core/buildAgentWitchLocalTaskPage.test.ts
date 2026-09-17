import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalTaskPageBody } from "./buildAgentWitchLocalTaskPage";

describe("buildAgentWitchLocalTaskPageBody", () => {
  it("renders delegate form when bridge is connected", () => {
    const html = buildAgentWitchLocalTaskPageBody({
      defaultWorkspace: "/Users/me/project",
      wsConnected: true,
    });

    expect(html).toContain('action="/task/dispatch"');
    expect(html).toContain("Delegate task");
    expect(html).toContain("/Users/me/project");
    expect(html).not.toContain("disabled");
  });

  it("disables submit when bridge is offline", () => {
    const html = buildAgentWitchLocalTaskPageBody({
      defaultWorkspace: "",
      wsConnected: false,
      flashError: "Task failed.",
    });

    expect(html).toContain("disabled");
    expect(html).toContain("Task failed.");
  });
});
