import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveTaskWriterEstimateLabel } from "./resolveTaskWriterEstimateLabel";

describe("resolveTaskWriterEstimateLabel", () => {
  it("names the CLI writer when API mode is off", () => {
    expect(
      resolveTaskWriterEstimateLabel({
        writerAgent: "cursor",
        writerExecutionBackend: "cli",
        configPath: "/tmp/missing/config.json",
      }),
    ).toBe("Cursor agent CLI");
  });

  it("names the API model saved for that writer", () => {
    const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-writer-"));
    fs.writeFileSync(
      path.join(profileDir, "writer-api-secrets.json"),
      JSON.stringify({
        anthropic: {
          apiKey: "sk-test",
          model: "claude-3-5-haiku-20241022",
        },
      }),
    );

    expect(
      resolveTaskWriterEstimateLabel({
        writerAgent: "claude-cli",
        writerExecutionBackend: "api",
        configPath: path.join(profileDir, "config.json"),
      }),
    ).toBe("Anthropic API model claude-3-5-haiku-20241022");
  });

  it("falls back to the CLI label when API mode has no key", () => {
    expect(
      resolveTaskWriterEstimateLabel({
        writerAgent: "codex",
        writerExecutionBackend: "api",
        configPath: "/tmp/missing/config.json",
      }),
    ).toBe("Codex CLI");
  });

  it("uses a generic label for an unknown writer", () => {
    expect(
      resolveTaskWriterEstimateLabel({
        writerAgent: "unknown",
        writerExecutionBackend: "cli",
        configPath: "/tmp/missing/config.json",
      }),
    ).toBe("the selected writer");
  });
});
