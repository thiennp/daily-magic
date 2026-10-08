import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveTokenSaverDbPath } from "./resolveTokenSaverDbPath";
import { TOKEN_SAVER_DB_FILE_NAME } from "./pitfall.constants";
import { resolveDeclinedProjectsPath } from "./resolveDeclinedProjectsPath";
import { DECLINED_PROJECTS_FILE_NAME } from "./tokenSaverMarkers.constants";

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

describe("resolveDeclinedProjectsPath (shared profile path helper)", () => {
  it("scopes the decline store next to the DB under profiles/<email>", () => {
    const layout = {
      installDir: "/tmp/aw-home",
      profileEmail: "user@example.com",
    };
    expect(resolveDeclinedProjectsPath(layout)).toBe(
      path.join(
        "/tmp/aw-home",
        "profiles",
        "user@example.com",
        DECLINED_PROJECTS_FILE_NAME,
      ),
    );
    expect(path.dirname(resolveDeclinedProjectsPath(layout))).toBe(
      path.dirname(resolveTokenSaverDbPath(layout)),
    );
  });

  it("falls back to install root when profileEmail is null", () => {
    expect(
      resolveDeclinedProjectsPath({
        installDir: "/tmp/aw-home",
        profileEmail: null,
      }),
    ).toBe(path.join("/tmp/aw-home", DECLINED_PROJECTS_FILE_NAME));
  });
});
