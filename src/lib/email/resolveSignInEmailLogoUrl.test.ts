import { afterEach, describe, expect, it, vi } from "vitest";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { SIGN_IN_EMAIL_LOGO_PATH } from "./signInEmailBrand.constant";
import resolveSignInEmailLogoUrl from "./resolveSignInEmailLogoUrl";

describe("resolveSignInEmailLogoUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("resolves an absolute logo URL for production", () => {
    vi.stubEnv("NODE_ENV", "production");

    expect(resolveSignInEmailLogoUrl()).toBe(
      `${AGENT_WITCH_DEFAULT_ORIGIN}${SIGN_IN_EMAIL_LOGO_PATH}`,
    );
  });
});
