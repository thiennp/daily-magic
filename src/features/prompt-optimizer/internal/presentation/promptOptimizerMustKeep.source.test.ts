import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import PromptSdlcPage from "@/features/prompt-optimizer/internal/presentation/PromptSdlcPage";
import { PROMPT_SDLC_AI_PATH_COPY } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAiPathCopy.constant";
import { PROMPT_SDLC_AWL_PAGE_HREF } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";
import { canUseThisPromptSdlcOutcome } from "@/features/prompt-optimizer/internal/presentation/promptSdlcOutcomeLabels.constant";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";

const read = (...parts: string[]): string =>
  readFileSync(join(process.cwd(), ...parts), "utf8");

describe("Prompt optimizer must-keeps", () => {
  it("cloud page is explainer + Open Local only (no Optimize runner)", () => {
    const html = renderToStaticMarkup(createElement(PromptSdlcPage));
    expect(html).toContain("Open in AgentWitch Local");
    expect(html).toContain(PROMPT_SDLC_AWL_PAGE_HREF);
    expect(PROMPT_SDLC_AWL_PAGE_HREF).toBe(
      "http://127.0.0.1:43347/prompt-optimizer",
    );
    expect(html).toContain("does not run the optimizer");
    expect(html).toContain("Download AgentWitch Local");
    expect(html).not.toContain(">Optimize<");
    expect(html).not.toContain("Before and after");
    expect(html).not.toContain("Use as my prompt");
    expect(html).not.toMatch(/Agent Witch/);
  });

  it("shows four AI path labels on the cloud page", () => {
    const html = renderToStaticMarkup(createElement(PromptSdlcPage));
    for (const path of PROMPT_SDLC_AI_PATH_COPY.paths) {
      expect(html).toContain(path.label);
    }
    expect(PROMPT_SDLC_AI_PATH_COPY.paths.map((p) => p.label)).toEqual([
      "CLI",
      "assistant",
      "buy tokens",
      "own API key",
    ]);
    expect(html).toContain("1 agent");
    expect(html.toLowerCase()).not.toContain("ai credits included");
  });

  it("never hides Marketplace; Connect + Download stay when connected", () => {
    expect(PRIMARY_NAV.map((item) => item.label)).toContain("Marketplace");
    expect(APP_SHELL_COMPUTERS_COPY.connectThis).toBe("Connect this computer");
    expect(APP_SHELL_COMPUTERS_COPY.download).toBe("Download AgentWitch Local");
    const panel = read("src/features/home/HomeConnectedMacsPanel.tsx");
    expect(panel).toContain("ComputersDownloadLink");
    expect(panel).toContain("ConnectAnotherMacButton");
  });

  it("gates use-this-prompt on passed only", () => {
    expect(canUseThisPromptSdlcOutcome("passed")).toBe(true);
    expect(canUseThisPromptSdlcOutcome("failed")).toBe(false);
    expect(canUseThisPromptSdlcOutcome("stopped")).toBe(false);
    const localBest = read(
      "apps/live/features/prompt-optimizer/internal/core/renderPromptSdlcLocalBestPrompt.ts",
    );
    expect(localBest).toContain('cycle.status === "passed"');
    expect(localBest).toContain("useThisPrompt");
    expect(localBest).toContain(
      "Save-as-skill is available only when status is passed",
    );
  });

  it("keeps Local wizard four compose steps + Quick fill chips", () => {
    const page = read(
      "apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalPage.ts",
    );
    expect(page).toContain(">Project</");
    expect(page).toContain("Prompt and goal");
    expect(page).toContain(">CLI</");
    expect(page).toContain(">Summary</");
    const presets = read(
      "apps/live/features/prompt-optimizer/internal/core/promptSdlcGoalPresets.constant.ts",
    );
    for (const label of [
      "Save tokens",
      "Shorter prompt",
      "Clearer instructions",
      "Add guardrails",
      "Template variables",
      "Raise judge score",
    ]) {
      expect(presets).toContain(label);
    }
  });
});
