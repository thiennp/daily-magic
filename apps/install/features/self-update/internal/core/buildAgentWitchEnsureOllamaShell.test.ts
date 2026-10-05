import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_OLLAMA_EMBED_MODEL,
  AGENT_WITCH_OLLAMA_ESTIMATE_MODEL,
} from "./agentWitchOllamaInstall.constant";
import {
  buildAgentWitchEnsureOllamaShell,
  buildAgentWitchInstallScriptOllama,
} from "./buildAgentWitchEnsureOllamaShell";
import { ensureAgentWitchOllamaInstalled } from "./ensureAgentWitchOllamaInstalled";

describe("buildAgentWitchEnsureOllamaShell", () => {
  it("installs Ollama with Homebrew when the command is missing", () => {
    const script = buildAgentWitchEnsureOllamaShell();

    expect(script).toContain("command -v ollama");
    expect(script).toContain("brew");
    expect(script).toContain("install ollama");
    expect(script).toContain("ollama-darwin.tgz");
    expect(script).toContain("services start ollama");
    expect(script).toContain(AGENT_WITCH_OLLAMA_ESTIMATE_MODEL);
    expect(script).toContain(AGENT_WITCH_OLLAMA_EMBED_MODEL);
    expect(script).toContain("ollama pull");
  });

  it("keeps going when the install script cannot install Ollama", () => {
    const script = buildAgentWitchInstallScriptOllama();

    expect(script).toContain("agent_witch_ensure_ollama || echo");
    expect(script).toContain("Agent Witch will continue without it.");
  });
});

describe("ensureAgentWitchOllamaInstalled", () => {
  it("reports failure without throwing when the shell exits non-zero", async () => {
    const result = await ensureAgentWitchOllamaInstalled(async (script) => {
      expect(script).toContain("agent_witch_ensure_ollama");
      return { exitCode: 1, output: "Could not install Ollama." };
    });

    expect(result.ok).toBe(false);
    expect(result.message).toBe("Could not install Ollama.");
  });

  it("refuses the default shell runner under VITEST without opt-in", async () => {
    const result = await ensureAgentWitchOllamaInstalled();

    expect(result.ok).toBe(false);
    expect(result.message).toContain(
      "Refusing Ollama host side effects under VITEST",
    );
  });
});
