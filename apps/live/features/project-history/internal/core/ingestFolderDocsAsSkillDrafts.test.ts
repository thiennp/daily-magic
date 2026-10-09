import { describe, expect, it, vi } from "vitest";

import type {
  AutoSkillCloudSettings,
  AutoSkillSuggestionPayload,
} from "./autoSkillCloud";
import { docClusterId } from "./evaluateDocSource";
import {
  COMMAND_DOC,
  makeDocFolder,
  POINTER_SKILL,
  QA_DOC,
} from "./docSkillFixtures.testutil";
import { ingestFolderDocsAsSkillDrafts } from "./ingestFolderDocsAsSkillDrafts";

const settings = (over: Partial<AutoSkillCloudSettings> = {}) => ({
  enabled: true,
  judgePref: "auto" as const,
  publishMode: "draft" as const,
  neverClusterIds: [],
  savedClusterIds: [],
  pendingClusterIds: [],
  ...over,
});

const run = (
  files: Record<string, string>,
  over: Partial<AutoSkillCloudSettings> = {},
  extra: { existingNames?: string[]; backfilledCount?: number } = {},
) => {
  const postSuggestion = vi.fn(
    async (...args: [string, AutoSkillSuggestionPayload]) =>
      args.length && undefined,
  );
  const result = ingestFolderDocsAsSkillDrafts({
    projectId: "p",
    folderPath: makeDocFolder(files),
    cloud: { getSettings: async () => settings(over), postSuggestion },
    existingNames: extra.existingNames ?? [],
    backfilledCount: extra.backfilledCount ?? 0,
  });
  return { result, postSuggestion };
};

const FILES = {
  "docs/qa/release-notes.md": QA_DOC,
  ".cursor/commands/command-quick-commit.md": COMMAND_DOC,
  ".cursor/skills/skill-pointers/SKILL.md": POINTER_SKILL,
};

describe("ingestFolderDocsAsSkillDrafts", () => {
  it("asks about procedural docs only, with a no-AI disclosure, and publishes nothing", async () => {
    const { result, postSuggestion } = run(FILES);
    expect(await result).toMatchObject({
      outcome: "done",
      scanned: 3,
      eligible: 2,
      asked: 2,
      skipped: { mostly_links: 1 },
    });
    const asked = postSuggestion.mock.calls.map((call) => call[1]);
    expect(asked[0]?.judgeLabel).toMatch(/No AI used/);
    expect(asked[0]?.judgeLabel?.length).toBeLessThanOrEqual(120);
    expect(
      asked.every((row) => row.draftBody.includes("origin: folder-doc")),
    ).toBe(true);
  });

  it("does nothing while auto skills are off", async () => {
    const { result, postSuggestion } = run(FILES, { enabled: false });
    expect(await result).toMatchObject({ outcome: "disabled", asked: 0 });
    expect(postSuggestion).not.toHaveBeenCalled();
  });

  it("never re-asks a doc version the owner saved, refused or has pending", async () => {
    const first = run(FILES);
    const sent = (await first.result, first.postSuggestion.mock.calls);
    const ids = sent.map(
      (call) => (call[1] as { clusterId: string }).clusterId,
    );
    const second = run(FILES, {
      neverClusterIds: [ids[0] ?? ""],
      pendingClusterIds: [ids[1] ?? ""],
    });
    expect(await second.result).toMatchObject({ eligible: 0, asked: 0 });
  });

  it("a changed file is a new question", () => {
    expect(docClusterId("docs/qa/a.md", "1".repeat(40))).not.toBe(
      docClusterId("docs/qa/a.md", "2".repeat(40)),
    );
  });

  it("skips docs a skill already covers and respects the caps", async () => {
    const covered = run(FILES, {}, { existingNames: ["release-notes"] });
    expect(await covered.result).toMatchObject({ asked: 1 });
    const capped = run(FILES, {}, { backfilledCount: 10 });
    expect(await capped.result).toMatchObject({ eligible: 2, asked: 0 });
    const full = run(
      FILES,
      {},
      { existingNames: Array.from({ length: 30 }, (_, i) => `s${i}`) },
    );
    expect(await full.result).toMatchObject({ asked: 0 });
  });

  it("keeps a doc with a leaked secret out of the cloud", async () => {
    const leaked = QA_DOC.replace(
      "Keep them short.",
      "Token sk-abcdefghijklmnopqrstuvwxyz0123456789 works.",
    );
    const { result, postSuggestion } = run({
      "docs/qa/release-notes.md": leaked,
    });
    const done = await result;
    const body = JSON.stringify(postSuggestion.mock.calls);
    expect(body).not.toContain("sk-abcdefghijklmnopqrstuvwxyz");
    expect(done.scanned).toBe(1);
  });
});
