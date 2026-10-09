import { describe, expect, it, vi } from "vitest";

import type { AutoSkillSuggestionPayload } from "./autoSkillCloud";
import { gitBlobSha } from "./collectDocSources";
import { COMMAND_DOC, makeDocFolder } from "./docSkillFixtures.testutil";
import { ingestFolderDocsAsSkillDrafts } from "./ingestFolderDocsAsSkillDrafts";

const REL = ".cursor/commands/command-quick-commit.md";

const run = (
  made: { skillId: string; sha: string } | null,
  existingNames: string[],
  backfilledCount = 10,
) => {
  const posted: AutoSkillSuggestionPayload[] = [];
  const result = ingestFolderDocsAsSkillDrafts({
    projectId: "p",
    folderPath: makeDocFolder({ [REL]: COMMAND_DOC }),
    cloud: {
      getSettings: async () => ({
        enabled: true,
        judgePref: "auto" as const,
        publishMode: "draft" as const,
        neverClusterIds: [],
        savedClusterIds: [],
        pendingClusterIds: [],
      }),
      postSuggestion: vi.fn(
        async (...args: [string, AutoSkillSuggestionPayload]) => {
          posted.push(args[1]);
        },
      ),
    },
    existingNames,
    backfilledCount,
    docOrigin: made === null ? [] : [{ ...made, relPath: REL }],
  });
  return { result, posted };
};

describe("ingestFolderDocsAsSkillDrafts when the doc already made a skill", () => {
  it("skips a doc whose file has not changed", async () => {
    const sha = gitBlobSha(Buffer.from(COMMAND_DOC));
    const { result, posted } = run({ skillId: "command-quick-commit", sha }, [
      "command-quick-commit",
    ]);
    expect(await result).toMatchObject({
      asked: 0,
      skipped: { up_to_date: 1 },
    });
    expect(posted).toHaveLength(0);
  });

  it("asks to update that skill when the file changed, even with the caps full", async () => {
    const { result, posted } = run(
      { skillId: "command-quick-commit", sha: "0".repeat(40) },
      [
        "command-quick-commit",
        ...Array.from({ length: 30 }, (_, i) => `s${i}`),
      ],
    );
    expect(await result).toMatchObject({ asked: 1 });
    expect(posted[0]?.title).toMatch(
      /changed\. Update the skill command-quick-commit\?/,
    );
    expect(posted[0]?.draftBody).toContain("updates: command-quick-commit");
  });

  it("a doc with no skill yet is still a normal new question", async () => {
    const { result, posted } = run(null, [], 0);
    expect(await result).toMatchObject({ asked: 1 });
    expect(posted[0]?.draftBody).not.toContain("updates:");
  });
});
