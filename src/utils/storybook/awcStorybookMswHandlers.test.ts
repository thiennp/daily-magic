import { describe, expect, it } from "vitest";

import { createAwcStorybookMswHandlers } from "@/utils/storybook/awcStorybookMswHandlers";

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
});
