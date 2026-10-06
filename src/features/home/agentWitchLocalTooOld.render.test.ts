import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock(
  "@/features/agent-witch/macDevices/repairManually/AwlRepairManuallyInfoButton",
  () => ({
    default: () => createElement("button", { "data-testid": "repair-i" }),
  }),
);

const notice = {
  kind: "version_too_old" as const,
  installBundleVersion: "241",
  minBundleVersion: "252",
  downloadUrl: "/download",
};

describe("too-old notices (COPY.md §6)", () => {
  it("Connect modal notice uses the locked copy and no bundle numbers", async () => {
    const { default: ConnectThisMacModalNotice } =
      await import("@/features/home/ConnectThisMacModalNotice");
    const html = renderToStaticMarkup(
      createElement(ConnectThisMacModalNotice, {
        notice,
        isRetrying: false,
        onRetry: () => undefined,
      }),
    );
    expect(html).toContain(
      '<p class="font-semibold">Update AgentWitch Local</p>',
    );
    expect(html).toContain(
      "AgentWitch Local on this computer is too old to connect. Update it, then try again.",
    );
    expect(html).toContain('href="/download"');
    expect(html).toContain(">Update AgentWitch Local</a>");
    expect(html).toContain(">Try again</button>");
    expect(html).not.toMatch(/bundle|241|252|AWL too old|Download update/i);
  });

  it("device row note says Too old to connect + Update link + (i)", async () => {
    const { default: HomeMacDeviceTooOldNote } =
      await import("@/features/home/HomeMacDeviceTooOldNote");
    const html = renderToStaticMarkup(createElement(HomeMacDeviceTooOldNote));
    expect(html).toContain("Too old to connect.");
    expect(html).toContain('href="/download"');
    expect(html).toContain(">Update AgentWitch Local</a>");
    expect(html).toContain('data-testid="repair-i"');
    expect(html).not.toMatch(/bundle|AWL too old|Download update/i);
  });
});
