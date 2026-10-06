import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcRunsWithoutApprovalSwitch from "@/features/projects/settings/runsWithoutApproval/AwcRunsWithoutApprovalSwitch";
import { RUNS_WITHOUT_APPROVAL_COPY as C } from "@/features/projects/settings/runsWithoutApproval/runsWithoutApprovalCopy.constant";

const noop = () => undefined;
const render = (overrides: Record<string, unknown> = {}): string =>
  renderToStaticMarkup(
    createElement(AwcRunsWithoutApprovalSwitch, {
      canEdit: true,
      loadState: "ready",
      enabled: false,
      saving: false,
      saveFailed: false,
      onToggle: noop,
      onRetry: noop,
      ...overrides,
    }),
  ).replaceAll("&#x27;", "'");

describe("AwcRunsWithoutApprovalSwitch (S0-2)", () => {
  it("shows label and hint, off by default", () => {
    const html = render();
    expect(html).toContain(C.label);
    expect(html).toContain(C.hint);
    expect(html).toContain('aria-checked="false"');
    expect(html).not.toContain('disabled=""');
  });

  it("shows on when enabled", () => {
    expect(render({ enabled: true })).toContain('aria-checked="true"');
  });

  it("shows a visible reason when disabled", () => {
    const saving = render({ saving: true });
    expect(saving).toContain('disabled=""');
    expect(saving).toContain(C.saving);
    const failed = render({ loadState: "error" });
    expect(failed).toContain(C.loadError);
    expect(failed).toContain(C.retry);
  });

  it("non-owner sees the current state, switch off, with the reason", () => {
    const html = render({ canEdit: false, enabled: true });
    expect(html).toContain(C.label);
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('disabled=""');
    expect(html).toContain(C.ownerOnlyReason);
    expect(html).toContain('aria-describedby="p-set-rwa-reason"');
  });

  it("shows the save error", () => {
    expect(render({ saveFailed: true })).toContain(C.saveError);
  });
});
