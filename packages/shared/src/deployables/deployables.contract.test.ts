import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_BRIDGE_PORT_LOCALHOST_INSTALL,
  AGENT_WITCH_BRIDGE_PORT_PRODUCTION_INSTALL,
  DEPLOYABLE_META,
} from "./index";
import { AGENT_WITCH_LIVE_APP_PORT } from "../network/agentWitchLiveNetwork.constant";

const APP_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../..",
); // repo root: deployables → src → shared → packages → root

describe("@agent-witch/shared deployables", () => {
  it("DEPLOYABLE_META matches apps/deployables.registry.json ids", () => {
    const registryPath = path.join(APP_ROOT, "apps/deployables.registry.json");
    const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
      deployables: { id: string; slug: string; folder: string }[];
    };

    const registryIds = registry.deployables.map((row) => row.id).sort();
    expect(registryIds).toEqual(Object.keys(DEPLOYABLE_META).sort());

    registry.deployables.forEach((row) => {
      const meta = DEPLOYABLE_META[row.id as keyof typeof DEPLOYABLE_META];
      expect(meta.slug).toBe(row.slug);
      expect(meta.targetFolder).toBe(row.folder);
    });
  });

  it("ports align with registry defaults", () => {
    const registry = JSON.parse(
      readFileSync(
        path.join(APP_ROOT, "apps/deployables.registry.json"),
        "utf8",
      ),
    ) as {
      deployables: {
        id: string;
        defaultPort?: number;
        defaultPorts?: { productionInstall: number; localhostInstall: number };
      }[];
    };

    const awl = registry.deployables.find((row) => row.id === "AWL");
    const awb = registry.deployables.find((row) => row.id === "AWB");

    expect(awl?.defaultPort).toBe(AGENT_WITCH_LIVE_APP_PORT);
    expect(awb?.defaultPorts).toEqual({
      productionInstall: AGENT_WITCH_BRIDGE_PORT_PRODUCTION_INSTALL,
      localhostInstall: AGENT_WITCH_BRIDGE_PORT_LOCALHOST_INSTALL,
    });
  });
});
