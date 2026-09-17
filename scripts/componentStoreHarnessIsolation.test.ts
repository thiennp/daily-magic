import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { persistHarnessSetVersionToComponentStore } from "../apps/live/features/harness/internal/core/componentStore/persistHarnessSetVersionToComponentStore";
import { readComponentVersionManifest } from "../apps/live/features/harness/internal/core/componentStore/readComponentVersionManifest";
import { resolveAgentWitchComponentStorePaths } from "../apps/live/features/harness/internal/core/componentStore/resolveAgentWitchComponentStorePaths";
import { harnessSetComponentId } from "../apps/live/features/harness/internal/core/componentStore/componentStore.constants";

const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

describe("component store harness isolation (P2)", () => {
  it("keeps prior set version bytes when another set is re-submitted", () => {
    const installDir = fs.mkdtempSync(
      path.join(os.homedir(), ".agent-witch-component-store-test-"),
    );
    tempRoots.push(installDir);
    const harnessRootDir = path.join(installDir, "harness");
    const sharedItemPath = "shared/items/rule-1/rules/demo.mdc";
    const itemAbsolute = path.join(harnessRootDir, sharedItemPath);

    const writeItem = (content: string): void => {
      fs.mkdirSync(path.dirname(itemAbsolute), { recursive: true });
      fs.writeFileSync(itemAbsolute, content);
    };

    writeItem("version-a\n");
    persistHarnessSetVersionToComponentStore({
      installDir,
      harnessRootDir,
      setSlug: "set-a",
      setEntry: {
        version: 1,
        items: [
          {
            id: "rule-1",
            kind: "rule",
            title: "Demo",
            path: sharedItemPath,
          },
        ],
      },
    });

    const storePaths = resolveAgentWitchComponentStorePaths(installDir);
    const versionA = readComponentVersionManifest({
      versionsDir: storePaths.versionsDir,
      componentId: harnessSetComponentId("set-a"),
      versionId: "1",
    });
    expect(versionA?.items[0]?.contentSha256).toBeDefined();
    const blobA = versionA?.items[0]?.contentSha256 ?? "";
    expect(fs.existsSync(path.join(storePaths.storeDir, blobA))).toBe(true);

    writeItem("version-b\n");
    persistHarnessSetVersionToComponentStore({
      installDir,
      harnessRootDir,
      setSlug: "set-b",
      setEntry: {
        version: 1,
        items: [
          {
            id: "rule-1",
            kind: "rule",
            title: "Demo",
            path: sharedItemPath,
          },
        ],
      },
    });

    const versionB = readComponentVersionManifest({
      versionsDir: storePaths.versionsDir,
      componentId: harnessSetComponentId("set-b"),
      versionId: "1",
    });
    const blobB = versionB?.items[0]?.contentSha256 ?? "";
    expect(blobB).not.toBe(blobA);
    expect(fs.readFileSync(path.join(storePaths.storeDir, blobA), "utf8")).toBe(
      "version-a\n",
    );
    expect(fs.readFileSync(path.join(storePaths.storeDir, blobB), "utf8")).toBe(
      "version-b\n",
    );
  });
});
