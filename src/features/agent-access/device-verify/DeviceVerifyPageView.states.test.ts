import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import DeviceVerifyPageView from "@/features/agent-access/device-verify/DeviceVerifyPageView";
import type { DeviceVerifyView } from "@/features/agent-access/device-verify/resolveDeviceVerifyView";

const render = (view: DeviceVerifyView): string =>
  renderToStaticMarkup(
    createElement(DeviceVerifyPageView, {
      assistantName: "Claude",
      codeForForms: "BCDF-GHJK",
      showClient: true,
      view,
    }),
  );

const text = (html: string): string =>
  html
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&#x27;", "'")
    .replace(/\s+/g, " ");

describe("/device/verify states (S4 a11y + layout)", () => {
  it("success is a polite status with the next step pointing at Approve", () => {
    const html = render({
      message: "You're already this assistant's owner.",
      tone: "success",
      canDecide: false,
      showNextStep: true,
    });
    expect(html).toMatch(/role="status"[^>]*aria-live="polite"/);
    expect(text(html)).toContain(
      "Next step Your assistant asks to join a project with its invite. The project owner approves it in Access › People.",
    );
    expect(text(html).toLowerCase()).not.toMatch(/\bbots?\b/);
  });

  it("errors are an assertive alert and mark the code field invalid", () => {
    const html = render({
      message: "x",
      tone: "error",
      canDecide: false,
      showNextStep: false,
    });
    expect(html).toMatch(/role="alert"[^>]*aria-live="assertive"/);
    expect(html).toContain('aria-invalid="true"');
    expect(html).not.toContain("data-next-step");
  });

  it("code field is labelled, described, and mobile-friendly; buttons are 44px", () => {
    const html = render({
      message: null,
      tone: "info",
      canDecide: true,
      showNextStep: false,
    });
    expect(html).toMatch(/<label for="device-verify-code"/);
    expect(html).toContain('aria-describedby="device-verify-code-help"');
    expect(html).toContain('id="device-verify-code-help"');
    expect(html).toContain('autoCapitalize="characters"');
    expect(html).toContain('maxLength="9"');
    expect(html).not.toContain("aria-invalid");
    expect(html).not.toContain('role="status"');
    expect(html.match(/min-h-11/g)?.length).toBe(2);
    expect(html).toContain("flex-col gap-3 sm:flex-row");
  });
});
