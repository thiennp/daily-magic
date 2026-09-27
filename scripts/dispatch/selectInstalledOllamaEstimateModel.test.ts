import { describe, expect, it } from "vitest";

import {
  parseOllamaListModelNames,
  selectInstalledOllamaEstimateModel,
} from "./selectInstalledOllamaEstimateModel";

describe("selectInstalledOllamaEstimateModel", () => {
  it("parses ollama list and skips the header", () => {
    const names = parseOllamaListModelNames(
      "NAME           ID    SIZE    MODIFIED\nqwen2.5:7b     abc   4 GB    today\nnomic-embed-text:latest def 274 MB today\n",
    );

    expect(names).toEqual(["qwen2.5:7b", "nomic-embed-text:latest"]);
  });

  it("uses the requested model when that tag is installed", () => {
    expect(
      selectInstalledOllamaEstimateModel(
        ["llama3.1:8b", "qwen2.5:14b"],
        "qwen2.5:14b",
      ),
    ).toBe("qwen2.5:14b");
  });

  it("prefers qwen2.5:7b over a larger sibling and skips embedding models", () => {
    expect(
      selectInstalledOllamaEstimateModel(
        ["nomic-embed-text:latest", "qwen2.5:32b", "qwen2.5:7b"],
        null,
      ),
    ).toBe("qwen2.5:7b");
  });

  it("falls back to the next installed chat model", () => {
    expect(
      selectInstalledOllamaEstimateModel(
        ["nomic-embed-text:latest", "llama3.2:latest"],
        "qwen2.5:7b",
      ),
    ).toBe("llama3.2:latest");
  });

  it("returns null when no chat model is installed", () => {
    expect(
      selectInstalledOllamaEstimateModel(["nomic-embed-text:latest"], null),
    ).toBeNull();
  });
});
