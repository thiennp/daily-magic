import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ComputersDownloadLink from "@/features/home/ComputersDownloadLink";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";

describe("ComputersDownloadLink", () => {
  it("HARD: links to /download with design Download AgentWitch label", () => {
    const html = renderToStaticMarkup(createElement(ComputersDownloadLink));
    expect(html).toContain('href="/download"');
    expect(html).toContain(APP_SHELL_COMPUTERS_COPY.download);
    expect(APP_SHELL_COMPUTERS_COPY.download).toBe("Download AgentWitch Local");
  });

  it("HARD: HomeConnectedMacsPanel mounts Download when devices exist", () => {
    const panel = readFileSync(
      join(process.cwd(), "src/features/home/HomeConnectedMacsPanel.tsx"),
      "utf8",
    );
    expect(panel).toContain("ComputersDownloadLink");
    expect(panel).toContain("hasExistingDevices");
  });

  it("HARD: empty Computers state also mounts Download", () => {
    const empty = readFileSync(
      join(process.cwd(), "src/features/home/HomeConnectedMacsEmptyState.tsx"),
      "utf8",
    );
    expect(empty).toContain("ComputersDownloadLink");
  });

  it("HARD: ConnectAnotherMacButton is not gated on shouldShowAgentWitchAppDownloadCta", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/home/ConnectAnotherMacButton.tsx"),
      "utf8",
    );
    expect(source).not.toContain("shouldShowAgentWitchAppDownloadCta");
    expect(source).not.toContain("isLocalAppInstalled");
  });
});
