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

import { purgeProjectHistoryOnOff } from "./purgeProjectHistoryOnOff";
import { tickProjectComputerHistory } from "./tickProjectComputerHistory";
import { writeLocalProjectHistoryState } from "./localProjectHistoryState";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";
import { writeProjectHistorySkillgenEpisodes } from "./writeProjectHistorySkillgenEpisodes";
import type { OwnerLlmDraftWriter } from "./ownerLlmDraftWriter.port";

const validSkill = `---
name: deploy-staging
description: Deploy current branch to staging and verify health.
version: 0.1.0
source_message_ids: [m0, m1, m2]
status: draft
---
## Steps
1. Build the app
2. Push to staging
3. Verify health
`;

describe("tickProjectComputerHistory skillgen e2e", () => {
  let tempRoot = "";
  const pullMock = vi.fn();

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-e2e-"));
    layoutState.root = tempRoot;
    pullMock.mockReset();
    pullMock.mockResolvedValue({ ok: true, skipped: false, skills: [] });
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("mines a draft, skips a second identical run, and purges skillgen on OFF", async () => {
    writeLocalProjectHistoryState({ projectId: "p1", state: "on_ready" });
    writeProjectHistorySkillgenEpisodes({
      projectId: "p1",
      file: {
        episodes: [
          {
            episodeId: "ep-fail-prior",
            projectId: "p1",
            state: "FAILED_VALIDATE",
            messageIds: ["old-m1"],
            startedAtMs: 1,
            lastMessageAtMs: 2,
            closedAtMs: 3,
            reason: "too_few_steps",
            scrubbedTranscript: null,
            ownerMarkedSaveAsSkill: false,
            hasSuccessSignal: false,
            validateAttempts: 2,
            draftId: null,
            contentHash: null,
            mergeDraftId: null,
            tokensUsed: 0,
          },
        ],
        cursorMessageId: null,
        cursorSavedAtMs: null,
        updatedAt: "2026-10-05T00:00:00.000Z",
      },
    });
    for (let i = 0; i < 20; i += 1) {
      writeProjectHistoryMessage({
        projectId: "p1",
        messageId: `m${i}`,
        message: {
          messageId: `m${i}`,
          summary:
            i === 19
              ? "all done — tests green"
              : `step ${i}: do the work carefully`,
        },
      });
    }

    const ownerLlm: OwnerLlmDraftWriter = vi.fn(async () => ({
      ok: true as const,
      skillMarkdown: validSkill,
      tokensUsed: 400,
    }));

    await tickProjectComputerHistory({
      listProjectIds: () => ["p1"],
      pullSkills: pullMock,
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
      ownerLlm,
    });

    const draftsDir = path.join(tempRoot, "p1", "skills", "_drafts");
    const draftDirs = fs
      .readdirSync(draftsDir, { withFileTypes: true })
      .filter((e) => e.isDirectory());
    expect(draftDirs).toHaveLength(1);
    expect(
      fs.existsSync(path.join(draftsDir, draftDirs[0]!.name, "SKILL.md")),
    ).toBe(true);
    expect(fs.existsSync(path.join(tempRoot, "p1", "skillgen", "episodes.json"))).toBe(
      true,
    );
    expect(ownerLlm).toHaveBeenCalledTimes(1);
    const skillBody = fs.readFileSync(
      path.join(draftsDir, draftDirs[0]!.name, "SKILL.md"),
      "utf8",
    );
    expect(skillBody).toContain("## Pitfalls");
    expect(skillBody).toContain("too_few_steps");
    const flags = JSON.parse(
      fs.readFileSync(path.join(tempRoot, "p1", "skillgen", "flags.json"), "utf8"),
    ) as { historyLearnedPitfalls?: { count?: number; active?: boolean } };
    expect(flags.historyLearnedPitfalls?.active).toBe(true);
    expect(flags.historyLearnedPitfalls?.count).toBeGreaterThanOrEqual(1);
    expect(
      fs.existsSync(
        path.join(tempRoot, "p1", "skillgen", "learned-pitfalls.json"),
      ),
    ).toBe(true);

    await tickProjectComputerHistory({
      listProjectIds: () => ["p1"],
      pullSkills: pullMock,
      cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
      ownerLlm,
    });
    const draftDirsAfter = fs
      .readdirSync(draftsDir, { withFileTypes: true })
      .filter((e) => e.isDirectory());
    expect(draftDirsAfter).toHaveLength(1);
    expect(ownerLlm).toHaveBeenCalledTimes(1);

    purgeProjectHistoryOnOff({ projectId: "p1" });
    expect(fs.existsSync(path.join(tempRoot, "p1", "skillgen"))).toBe(false);
    expect(fs.existsSync(draftsDir)).toBe(false);
  });

  it("does not merge new messages into a parked episode or move the cursor past them", async () => {
    writeLocalProjectHistoryState({ projectId: "p1", state: "on_ready" });
    for (let i = 0; i < 20; i += 1) {
      writeProjectHistoryMessage({
        projectId: "p1",
        messageId: `m${i}`,
        message: {
          messageId: `m${i}`,
          summary:
            i === 19
              ? "all done — tests green"
              : `step ${i}: do the work carefully`,
        },
      });
    }
    const tick = () =>
      tickProjectComputerHistory({
        listProjectIds: () => ["p1"],
        pullSkills: pullMock,
        cloudApi: { appOrigin: "https://example.test", pairingToken: "tok" },
        ownerLlm: null,
      });
    const readEpisodes = () =>
      JSON.parse(
        fs.readFileSync(path.join(tempRoot, "p1", "skillgen", "episodes.json"), "utf8"),
      ) as {
        cursorMessageId: string | null;
        episodes: { state: string; messageIds: string[] }[];
      };

    await tick();
    const parked = readEpisodes();
    expect(parked.episodes).toHaveLength(1);
    expect(parked.episodes[0]!.state).not.toBe("CAPTURING");
    expect(parked.episodes[0]!.messageIds).toHaveLength(20);
    expect(parked.cursorMessageId).toBe("m19");

    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m20",
      message: { messageId: "m20", summary: "a new message after parking" },
    });
    await tick();
    const after = readEpisodes();
    expect(after.episodes[0]!.messageIds).not.toContain("m20");
    expect(after.episodes[0]!.messageIds).toHaveLength(20);
    expect(after.cursorMessageId).toBe("m19");
  });
});
