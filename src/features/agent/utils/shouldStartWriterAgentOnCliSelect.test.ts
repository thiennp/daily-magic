import { describe, expect, it } from "vitest";

import { shouldStartWriterAgentOnCliSelect } from "@/features/agent/utils/shouldStartWriterAgentOnCliSelect";

describe("shouldStartWriterAgentOnCliSelect (AGENT-028)", () => {
  it("does not auto-start for custom task (empty library id)", () => {
    expect(shouldStartWriterAgentOnCliSelect("")).toBe(false);
  });

  it("does not auto-start for a library workflow either", () => {
    expect(shouldStartWriterAgentOnCliSelect("cap-sample-weekly")).toBe(false);
  });
});
