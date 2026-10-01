import { describe, expect, it } from "vitest";

import { createAwcStorybookMswHandlers } from "@/utils/storybook/awcStorybookMswHandlers";
import { AWC_STORYBOOK_SAMPLE_RUN } from "@/utils/storybook/awcStorybookMswSampleData";

describe("createAwcStorybookMswHandlers", () => {
  it("includes capability templates for guest library stories", () => {
    const handlers = createAwcStorybookMswHandlers("guest");
    expect(handlers.length).toBeGreaterThan(0);
  });

  it("returns distinct handler sets for loading and ready", () => {
    const loading = createAwcStorybookMswHandlers("loading");
    const ready = createAwcStorybookMswHandlers("ready");
    expect(loading.length).toBeGreaterThan(0);
    expect(ready.length).toBeGreaterThan(loading.length - 1);
  });

  it("includes harness marketplace handlers for loading and error states", () => {
    const loading = createAwcStorybookMswHandlers("loading");
    const error = createAwcStorybookMswHandlers("error");
    const ready = createAwcStorybookMswHandlers("ready");
    expect(loading.length).toBeGreaterThanOrEqual(8);
    expect(error.length).toBeGreaterThan(loading.length - 1);
    expect(ready.length).toBeGreaterThan(loading.length);
  });

  it("includes enriched storybook sample run with operator-facing emails", () => {
    expect(AWC_STORYBOOK_SAMPLE_RUN.requesterEmail).toBe(
      "storybook@agentwitch.com",
    );
    expect(AWC_STORYBOOK_SAMPLE_RUN.dispatchPolicy).toBe("open");
    expect(AWC_STORYBOOK_SAMPLE_RUN.status).toBe("completed");
  });
});
