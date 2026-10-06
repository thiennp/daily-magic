import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { atomicWriteFile0600, ensureDir0700 } from "./atomicWriteFile0600";
import type { ProjectComputerHistoryCloudStateRead } from "./fetchProjectComputerHistoryCloudState";
import { reconcileProjectHistoryOffPurge } from "./reconcileProjectHistoryOffPurge";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

const cloudApi = { appOrigin: "https://example.test", pairingToken: "tok" };

const cloud =
  (read: ProjectComputerHistoryCloudStateRead) =>
  async (): Promise<ProjectComputerHistoryCloudStateRead> =>
    read;

const seedProject = (projectId: string): string => {
  const root = ensureProjectDataTree(projectId);
  atomicWriteFile0600(path.join(root, "history", "m1.json"), "{}\n");
  ensureDir0700(path.join(root, "skills", "_drafts", "d1"));
  atomicWriteFile0600(path.join(root, "skills", "_drafts", "d1", "SKILL.md"), "x\n");
  atomicWriteFile0600(path.join(root, "skillgen", "episodes.json"), "{}\n");
  ensureDir0700(path.join(root, "skills", "keep-me"));
  atomicWriteFile0600(path.join(root, "skills", "keep-me", "meta.json"), "{}\n");
  atomicWriteFile0600(path.join(root, "skills", "_tombstones", "gone.json"), "{}\n");
  return root;
};

const expectHistoryDataKept = (root: string) => {
  expect(fs.existsSync(path.join(root, "history", "m1.json"))).toBe(true);
  expect(fs.existsSync(path.join(root, "skills", "_drafts", "d1", "SKILL.md"))).toBe(true);
  expect(fs.existsSync(path.join(root, "skillgen", "episodes.json"))).toBe(true);
};

describe("reconcileProjectHistoryOffPurge", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-offpurge-"));
    layoutState.root = tempRoot;
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("confirmed OFF with files present → purged; mirror and tombstones kept", async () => {
    const root = seedProject("p1");
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p1",
      cloudApi,
      deps: { fetchCloudState: cloud({ kind: "known", state: "off" }) },
    });
    expect(outcome).toBe("purged");
    expect(fs.existsSync(path.join(root, "history"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "_drafts"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "keep-me", "meta.json"))).toBe(true);
    expect(fs.existsSync(path.join(root, "skills", "_tombstones", "gone.json"))).toBe(true);
  });

  it("is idempotent: a second confirmed OFF finds nothing to purge", async () => {
    seedProject("p1");
    const deps = { fetchCloudState: cloud({ kind: "known", state: "off" }) };
    expect(await reconcileProjectHistoryOffPurge({ projectId: "p1", cloudApi, deps })).toBe("purged");
    expect(await reconcileProjectHistoryOffPurge({ projectId: "p1", cloudApi, deps })).toBe(
      "nothing_to_purge",
    );
  });

  it("confirmed OFF with nothing on disk → no-op, purge not called", async () => {
    const purge = vi.fn();
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p-empty",
      cloudApi,
      deps: { fetchCloudState: cloud({ kind: "known", state: "off" }), purge },
    });
    expect(outcome).toBe("nothing_to_purge");
    expect(purge).not.toHaveBeenCalled();
  });

  it("settings read error → skipped_unknown, nothing deleted", async () => {
    const root = seedProject("p1");
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p1",
      cloudApi,
      deps: { fetchCloudState: cloud({ kind: "unknown", reason: "http_500" }) },
    });
    expect(outcome).toBe("skipped_unknown");
    expectHistoryDataKept(root);
  });

  it("fetch throwing → skipped_unknown, nothing deleted", async () => {
    const root = seedProject("p1");
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p1",
      cloudApi,
      deps: {
        fetchCloudState: async () => {
          throw new Error("boom");
        },
      },
    });
    expect(outcome).toBe("skipped_unknown");
    expectHistoryDataKept(root);
  });

  it("no cloud config → skipped_unknown without fetching", async () => {
    const root = seedProject("p1");
    const fetchCloudState = vi.fn();
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p1",
      cloudApi: null,
      deps: { fetchCloudState },
    });
    expect(outcome).toBe("skipped_unknown");
    expect(fetchCloudState).not.toHaveBeenCalled();
    expectHistoryDataKept(root);
  });

  it("History ON → no purge", async () => {
    const root = seedProject("p1");
    const purge = vi.fn();
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p1",
      cloudApi,
      deps: { fetchCloudState: cloud({ kind: "known", state: "on_ready" }), purge },
    });
    expect(outcome).toBe("history_on");
    expect(purge).not.toHaveBeenCalled();
    expectHistoryDataKept(root);
  });

  it("purge failure → purge_failed, never throws", async () => {
    seedProject("p1");
    const outcome = await reconcileProjectHistoryOffPurge({
      projectId: "p1",
      cloudApi,
      deps: {
        fetchCloudState: cloud({ kind: "known", state: "off" }),
        purge: () => {
          throw new Error("EACCES");
        },
      },
    });
    expect(outcome).toBe("purge_failed");
  });
});
