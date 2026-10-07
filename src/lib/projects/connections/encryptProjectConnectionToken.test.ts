import { describe, expect, it } from "vitest";

import { decryptProjectConnectionToken } from "@/lib/projects/connections/decryptProjectConnectionToken";
import { encryptProjectConnectionToken } from "@/lib/projects/connections/encryptProjectConnectionToken";

describe("project connection token encryption", () => {
  it("round-trips a token with AUTH_SECRET", () => {
    const { ciphertext, iv } = encryptProjectConnectionToken(
      "gho_test_token_abc",
      "test-auth-secret",
    );
    expect(
      decryptProjectConnectionToken(ciphertext, iv, "test-auth-secret"),
    ).toBe("gho_test_token_abc");
  });

  it("fails with a wrong secret", () => {
    const { ciphertext, iv } = encryptProjectConnectionToken(
      "secret",
      "right-secret",
    );
    expect(() =>
      decryptProjectConnectionToken(ciphertext, iv, "wrong-secret"),
    ).toThrow();
  });
});
