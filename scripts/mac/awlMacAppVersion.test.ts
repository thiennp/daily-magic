import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("AWL Mac app version sources stay in sync", () => {
  it("package.json version matches MacAppConstants.appVersion and the build script", () => {
    const packageJson = JSON.parse(
      readFileSync(join(root, "package.json"), "utf8"),
    ) as { version: string };
    expect(packageJson.version).toBe("0.2.4");

    const constants = readFileSync(
      join(
        root,
        "apps/mac/Sources/AgentWitchLocalCore/Models/MacAppConstants.swift",
      ),
      "utf8",
    );
    expect(constants).toContain(
      `public static let appVersion = "${packageJson.version}"`,
    );

    const buildScript = readFileSync(
      join(root, "scripts/mac/build-awl-mac-dmg.sh"),
      "utf8",
    );
    expect(buildScript).toContain(
      "require('${ROOT_DIR}/package.json').version",
    );
    expect(buildScript).toContain(`echo "${packageJson.version}"`);
    expect(buildScript).toContain("CFBundleShortVersionString");
    expect(buildScript).toContain("AgentWitchLocal.zip");
  });
});
