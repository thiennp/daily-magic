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

  it("HARD: HomeConnectedMacsPanel always mounts Download when not loading", () => {
    const panel = readFileSync(
      join(process.cwd(), "src/features/home/HomeConnectedMacsPanel.tsx"),
      "utf8",
    );
    expect(panel).toContain("ComputersDownloadLink");
    expect(panel).toContain("!isLoading");
    // Download is not gated on hasExistingDevices (Online / connected still show it).
    expect(panel).toMatch(
      /\{!isLoading \? \([\s\S]*ComputersDownloadLink[\s\S]*\) : null\}/,
    );
  });

  it("HARD: empty Computers state does not double-render Download (panel footer owns it)", () => {
    const empty = readFileSync(
      join(process.cwd(), "src/features/home/HomeConnectedMacsEmptyState.tsx"),
      "utf8",
    );
    expect(empty).not.toContain("ComputersDownloadLink");
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
