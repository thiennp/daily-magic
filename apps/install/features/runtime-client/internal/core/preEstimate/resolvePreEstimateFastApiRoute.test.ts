import { describe, expect, it, vi } from "vitest";

import { resolvePreEstimateFastApiRoute } from "./resolvePreEstimateFastApiRoute";

vi.mock("../writerApi/readWriterApiSecrets", () => ({
  readWriterApiProviderSecret: vi.fn(),
}));

import { readWriterApiProviderSecret } from "../writerApi/readWriterApiSecrets";

const mockedReadSecret = vi.mocked(readWriterApiProviderSecret);

describe("resolvePreEstimateFastApiRoute", () => {
  it("prefers google when multiple keys exist", () => {
    mockedReadSecret.mockImplementation((_dir, provider) => {
      if (provider === "google" || provider === "openai") {
        return { apiKey: "key" };
      }
      return null;
    });

    expect(resolvePreEstimateFastApiRoute("/profile")).toEqual({
      provider: "google",
      model: "gemini-2.0-flash",
    });
  });

  it("falls back to openai then anthropic", () => {
    mockedReadSecret.mockImplementation((_dir, provider) => {
      if (provider === "openai") {
        return { apiKey: "key" };
      }
      return null;
    });

    expect(resolvePreEstimateFastApiRoute("/profile")).toEqual({
      provider: "openai",
      model: "gpt-4.1-mini",
    });
  });

  it("returns null when no API keys", () => {
    mockedReadSecret.mockReturnValue(null);
    expect(resolvePreEstimateFastApiRoute("/profile")).toBeNull();
  });
});
