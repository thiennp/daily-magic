import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { AGENT_WITCH_LIVE_APP_PORT } from "@agent-witch/shared/network";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

interface DeployableRow {
  readonly id: string;
  readonly slug: string;
  readonly folder: string;
  readonly defaultPort?: number;
  readonly defaultPorts?: {
    readonly productionInstall: number;
    readonly localhostInstall: number;
  };
}

describe("deployables.registry.json", () => {
  const registryPath = path.join(APP_ROOT, "apps/deployables.registry.json");
  const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
    deployables: DeployableRow[];
  };

  it("defines AWC, AWL, AWB, AWI with existing README folders", () => {
    const ids = registry.deployables.map((row) => row.id).sort();
    expect(ids).toEqual(["AWB", "AWC", "AWI", "AWL"]);

    registry.deployables.forEach((row) => {
      const readme = path.join(APP_ROOT, row.folder, "README.md");
      expect(readFileSync(readme, "utf8").length).toBeGreaterThan(20);
    });
  });

  it("AWL port matches AGENT_WITCH_LOCAL_APP_PORT", () => {
    const awl = registry.deployables.find((row) => row.id === "AWL");
    expect(awl?.defaultPort).toBe(AGENT_WITCH_LIVE_APP_PORT);
    expect(AGENT_WITCH_LIVE_APP_PORT).toBe(43347);
  });

  it("AWB wake ports match install layout convention", () => {
    const awb = registry.deployables.find((row) => row.id === "AWB");
    expect(awb?.defaultPorts).toEqual({
      productionInstall: 47892,
      localhostInstall: 47893,
    });
  });
});
