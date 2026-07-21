import { describe, expect, it } from "vitest";

import { decryptCursorCloudApiKey } from "@/lib/cursorCloud/decryptCursorCloudApiKey";
import { encryptCursorCloudApiKey } from "@/lib/cursorCloud/encryptCursorCloudApiKey";

describe("cursor cloud api key encryption", () => {
  it("round-trips an API key with AUTH_SECRET", () => {
    const { ciphertext, iv } = encryptCursorCloudApiKey(
      "key_test_123",
      "test-auth-secret",
    );
    expect(decryptCursorCloudApiKey(ciphertext, iv, "test-auth-secret")).toBe(
      "key_test_123",
    );
  });
});
