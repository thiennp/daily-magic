import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveTokenSaverDbPath } from "./resolveTokenSaverDbPath";
import { TOKEN_SAVER_DB_FILE_NAME } from "./pitfall.constants";

describe("resolveTokenSaverDbPath", () => {
  it("scopes under profiles/<email>/token-saver.db", () => {
    expect(
      resolveTokenSaverDbPath({
        installDir: "/tmp/aw-home",
        profileEmail: "user@example.com",
      }),
    ).toBe(
      path.join(
        "/tmp/aw-home",
        "profiles",
        "user@example.com",
        TOKEN_SAVER_DB_FILE_NAME,
      ),
    );
  });

  it("falls back to install root when profileEmail is null", () => {
    expect(
      resolveTokenSaverDbPath({
        installDir: "/tmp/aw-home",
        profileEmail: null,
      }),
    ).toBe(path.join("/tmp/aw-home", TOKEN_SAVER_DB_FILE_NAME));
  });
});
