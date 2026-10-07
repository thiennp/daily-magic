import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE } from "./agentWitchLocalApp.constants";
import {
  isKeptPromptOptimizerApiPath,
  isRetiredAgentWitchLocalBrowserUiPath,
  isRetiredAgentWitchLocalBrowserUiRequest,
} from "./isRetiredAgentWitchLocalBrowserUiRequest";

describe("isRetiredAgentWitchLocalBrowserUiRequest (AWL-H7 Exact FIX-1)", () => {
  it("keeps prompt-optimizer agent and skills/query APIs", () => {
    expect(isKeptPromptOptimizerApiPath("/prompt-optimizer/agent")).toBe(true);
    expect(isKeptPromptOptimizerApiPath("/prompt-optimizer/skills/query")).toBe(
      true,
    );
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "POST",
        pathname: "/prompt-optimizer/agent",
      }),
    ).toBe(false);
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "POST",
        pathname: "/prompt-optimizer/skills/query",
      }),
    ).toBe(false);
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "GET",
        pathname: "/prompt-optimizer/agent",
      }),
    ).toBe(false);
  });

  it.each([
    "/prompt-optimizer",
    "/prompt-optimizer/guide",
    "/prompt-sdlc",
    "/prompt-sdlc/guide",
    "/project/skill-drafts",
    "/status",
    "/",
  ] as const)("retires GET %s (pages / fragments pathname)", (pathname) => {
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({ method: "GET", pathname }),
    ).toBe(true);
  });

  it("retires fragments/cycle via /prompt-optimizer pathname", () => {
    expect(isRetiredAgentWitchLocalBrowserUiPath("/prompt-optimizer")).toBe(
      true,
    );
  });

  it("retires HTML form POSTs on retired page paths", () => {
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "POST",
        pathname: "/prompt-optimizer",
      }),
    ).toBe(true);
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "POST",
        pathname: "/prompt-optimizer/guide",
      }),
    ).toBe(true);
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "POST",
        pathname: "/project",
      }),
    ).toBe(true);
  });

  it("does not retire health or select-folder", () => {
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "GET",
        pathname: "/health",
      }),
    ).toBe(false);
    expect(
      isRetiredAgentWitchLocalBrowserUiRequest({
        method: "GET",
        pathname: "/projects/select-folder",
      }),
    ).toBe(false);
  });

  it("retired message stays plain English guidance", () => {
    expect(AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE).toBe(
      "Open AgentWitch Local from the menu bar.",
    );
  });
});
