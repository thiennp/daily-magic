import { readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MAC_DEVICE_LOCAL_STATUS_LINK_LABEL } from "@/features/agent-witch/macDevices/public-api/types";

const isMobileClient = vi.hoisted(() => ({ value: false }));

vi.mock("@/hooks/useIsMobileClient", () => ({
  default: () => isMobileClient.value,
}));

vi.mock("@/features/home/hooks/useThisMacHasConnectedLocalBridge", () => ({
  default: () => true,
}));

vi.mock("@/features/agent-witch/macDevices/ReviveAwlMacModal", () => ({
  default: () => null,
}));

import HomeMacSettingsLink from "@/features/home/HomeMacSettingsLink";

describe("HomeMacSettingsLink", () => {
  beforeEach(() => {
    isMobileClient.value = false;
  });

  it("labels the local status button Status & settings on this computer and links Download", () => {
    const source = readFileSync(
      path.join(process.cwd(), "src/features/home/HomeMacSettingsLink.tsx"),
      "utf8",
    );

    expect(source).toContain("Status & settings on this computer");
    expect(source).toContain('href="/download"');
    expect(source).toContain("<HomeOpenLocalStatusButton>");
    expect(MAC_DEVICE_LOCAL_STATUS_LINK_LABEL).toBe(
      "Status & settings on this computer",
    );
    const html = renderToStaticMarkup(createElement(HomeMacSettingsLink));
    // renderToStaticMarkup escapes & in text nodes
    expect(html).toContain("Status &amp; settings on this computer");
    expect(html).toContain('href="/download"');
  });

  it("hides the computer settings links on mobile", () => {
    isMobileClient.value = true;

    expect(renderToStaticMarkup(createElement(HomeMacSettingsLink))).toBe("");
  });
});
