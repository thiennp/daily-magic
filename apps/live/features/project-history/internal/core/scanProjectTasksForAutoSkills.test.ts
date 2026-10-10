import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  root: "",
  fed: [] as string[],
  outcome: "no_repeat" as string,
  statusNote: null as string | null,
}));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: state.root }),
}));
vi.mock("./reportAutoSkillRunCompleted", () => ({
  reportAutoSkillRunCompleted: async (input: {
    run: { runId: string };
  }): Promise<string> => {
    state.fed.push(input.run.runId);
    return state.outcome;
  },
}));
vi.mock("./autoSkillCloud", () => ({
  createHttpAutoSkillCloud: () => ({
    getSettings: async () => ({ judgePref: "auto" }),
    postStatus: async (_p: string, status: { note: string | null }) => {
      state.statusNote = status.note;
    },
  }),
}));
vi.mock("./autoSkillOllama", () => ({
  probeAutoSkillOllamaModel: async () => null,
}));
vi.mock("./autoSkillAgent", () => ({
  probeSignedInAutoSkillAgent: async () => "codex",
}));

import { scanProjectTasksForAutoSkills } from "./scanProjectTasksForAutoSkills";

const PROJECT_ID = "da2e0474-6323-44f8-acd4-82f9688c73b3";

const writeTask = (
  dir: string,
  id: string,
  patch: Record<string, unknown>,
): void =>
  fs.writeFileSync(
    path.join(dir, `${id}.json`),
    JSON.stringify({
      taskId: id,
      status: "completed",
      promptBody: `do ${id}`,
      resultBody: null,
      writerAgent: "codex",
      createdAt: "2026-10-08T10:00:00.000Z",
      completedAt: "2026-10-08T10:05:00.000Z",
      ...patch,
    }),
  );

const scan = () =>
  scanProjectTasksForAutoSkills({
    cloudApi: { appOrigin: "https://x", pairingToken: "t" } as never,
    layout: {} as never,
    projectId: PROJECT_ID,
  });

describe("scanProjectTasksForAutoSkills", () => {
  let tasksDir = "";

  beforeEach(() => {
    state.root = fs.mkdtempSync(path.join(os.tmpdir(), "as-scan-"));
    state.fed = [];
    state.outcome = "no_repeat";
    state.statusNote = null;
    tasksDir = path.join(state.root, PROJECT_ID, "tasks");
    fs.mkdirSync(tasksDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(state.root, { recursive: true, force: true });
  });

  it("stops after two runs in a row the judge could not answer, and says why", async () => {
    for (const id of ["a", "b", "c", "d"]) {
      writeTask(tasksDir, id, {
        createdAt: `2026-10-08T0${id.charCodeAt(0) - 96}:00:00.000Z`,
      });
    }
    state.outcome = "judge_failed";
    const summary = await scan();
    expect(state.fed).toEqual(["a", "b"]);
    expect(summary.stoppedReason).toBe("judge_failed");
    expect(state.statusNote).toContain("Stopped: the judge could not answer");
  });

  it("feeds only completed tasks with a prompt, oldest first", async () => {
    writeTask(tasksDir, "b", { createdAt: "2026-10-08T11:00:00.000Z" });
    writeTask(tasksDir, "a", { createdAt: "2026-10-08T09:00:00.000Z" });
    writeTask(tasksDir, "failed", { status: "failed" });
    writeTask(tasksDir, "empty", { promptBody: "   " });
    fs.writeFileSync(path.join(tasksDir, "broken.json"), "{nope");

    const summary = await scan();

    expect(state.fed).toEqual(["a", "b"]);
    expect(summary).toMatchObject({ scanned: 2, asked: 0 });
    expect(state.statusNote).toBe(
      "Scanned 2 finished tasks on this computer · nothing worth saving as a skill yet.",
    );
  });

  it("counts raised questions in the summary line", async () => {
    writeTask(tasksDir, "a", {});
    state.outcome = "asked";

    const summary = await scan();

    expect(summary.asked).toBe(1);
    expect(state.statusNote).toContain("1 question raised");
  });

  it("stops early when auto skills are disabled", async () => {
    writeTask(tasksDir, "a", { createdAt: "2026-10-08T09:00:00.000Z" });
    writeTask(tasksDir, "b", { createdAt: "2026-10-08T10:00:00.000Z" });
    state.outcome = "disabled";

    await scan();

    expect(state.fed).toEqual(["a"]);
  });

  it("reports an empty scan without feeding anything", async () => {
    const summary = await scan();

    expect(state.fed).toEqual([]);
    expect(summary.scanned).toBe(0);
    expect(state.statusNote).toBe(
      "Scanned this computer: no finished tasks to check yet.",
    );
  });
});
