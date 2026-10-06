import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));
vi.mock("@agent-witch/install-runtime-client", () => ({
  readAgentWitchRunConfig: () => ({
    wsUrl: "wss://example.test/ws",
    pairingToken: "tok",
  }),
}));
vi.mock("../../../projects/internal/core/agentWitchCloudApi", () => ({
  resolveAgentWitchCloudApiConfig: () => ({
    appOrigin: "https://example.test",
    pairingToken: "tok",
  }),
}));
vi.mock("./createHttpProjectSkillAwcPublishedSource", () => ({
  createHttpProjectSkillAwcPublishedSource: () => ({
    listPublished: vi.fn(),
    getPublishedBody: vi.fn(),
  }),
}));
vi.mock("./createProjectSkillHistoryPort", () => ({
  createProjectSkillHistoryPort: () => ({ tag: "port" }),
}));

import { atomicWriteFile0600, ensureDir0700 } from "./atomicWriteFile0600";
import { writeLocalProjectHistoryState } from "./localProjectHistoryState";
import { ensureProjectDataTree } from "./resolveProjectDataDir";
import { tickProjectComputerHistory } from "./tickProjectComputerHistory";

const seedOnProject = (projectId: string): string => {
  writeLocalProjectHistoryState({ projectId, state: "on_ready" });
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

const stubCloudHistory = (respond: () => Response | Promise<Response>) => {
  const fetchMock = vi.fn(async (url: string | URL) => {
    if (String(url).endsWith("/computer-history")) {
      return respond();
    }
    throw new Error(`unexpected fetch ${String(url)}`);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

describe("tickProjectComputerHistory History OFF purge e2e", () => {
  let tempRoot = "";
  const pullMock = vi.fn();
  const runSkillgen = vi.fn();

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-offpurge-e2e-"));
    layoutState.root = tempRoot;
    pullMock.mockReset();
    pullMock.mockResolvedValue({ ok: true, skipped: false, skills: [] });
    runSkillgen.mockReset();
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("purges an ON-on-disk project on the tick after the owner turns History OFF", async () => {
    const root = seedOnProject("p1");
    stubCloudHistory(() => Response.json({ ok: true, state: "off", backlog: [] }));

    await tickProjectComputerHistory({ pullSkills: pullMock, runSkillgen });

    expect(fs.existsSync(path.join(root, "history"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "_drafts"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
    expect(fs.existsSync(path.join(root, "skills", "keep-me", "meta.json"))).toBe(true);
    expect(fs.existsSync(path.join(root, "skills", "_tombstones", "gone.json"))).toBe(true);
    expect(runSkillgen).not.toHaveBeenCalled();
    expect(pullMock).not.toHaveBeenCalled();

    // Next tick: nothing left to purge, project is no longer visited.
    const fetchMock = stubCloudHistory(() =>
      Response.json({ ok: true, state: "off", backlog: [] }),
    );
    await tickProjectComputerHistory({ pullSkills: pullMock, runSkillgen });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("purges leftovers of a project whose local state is already off/missing", async () => {
    const root = ensureProjectDataTree("p-stale");
    atomicWriteFile0600(path.join(root, "skillgen", "learned-pitfalls.json"), "{}\n");
    stubCloudHistory(() => Response.json({ ok: true, state: "off" }));

    await tickProjectComputerHistory({ pullSkills: pullMock, runSkillgen });

    expect(fs.existsSync(path.join(root, "skillgen"))).toBe(false);
    expect(runSkillgen).not.toHaveBeenCalled();
  });

  it("keeps everything and keeps mining when the cloud read fails", async () => {
    const root = seedOnProject("p1");
    stubCloudHistory(() => new Response("bad gateway", { status: 502 }));

    await tickProjectComputerHistory({ pullSkills: pullMock, runSkillgen });

    expect(fs.existsSync(path.join(root, "history", "m1.json"))).toBe(true);
    expect(fs.existsSync(path.join(root, "skills", "_drafts", "d1", "SKILL.md"))).toBe(true);
    expect(fs.existsSync(path.join(root, "skillgen", "episodes.json"))).toBe(true);
    expect(runSkillgen).toHaveBeenCalledWith({ projectId: "p1" });
    expect(pullMock).toHaveBeenCalledTimes(1);
  });

  it("keeps everything when the cloud says History is ON", async () => {
    const root = seedOnProject("p1");
    stubCloudHistory(() => Response.json({ ok: true, state: "on_ready", backlog: [] }));

    await tickProjectComputerHistory({ pullSkills: pullMock, runSkillgen });

    expect(fs.existsSync(path.join(root, "history", "m1.json"))).toBe(true);
    expect(runSkillgen).toHaveBeenCalledWith({ projectId: "p1" });
  });
});
