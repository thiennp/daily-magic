import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { queryPromptSdlcFolderSkills } from "./queryPromptSdlcFolderSkills";
import { servePromptSdlcFolderSkillsQuery } from "./servePromptSdlcFolderSkillsQuery";

const writeSkill = (
  root: string,
  fileName: string,
  name: string,
  description: string,
  body: string,
): void => {
  const dir = path.join(root, ".cursor", "skills", fileName);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "SKILL.md"),
    [
      "---",
      `name: "${name}"`,
      `description: "${description}"`,
      "---",
      "",
      body,
      "",
    ].join("\n"),
    "utf8",
  );
};

describe("queryPromptSdlcFolderSkills", () => {
  it("ranks folder skills by TF-IDF over name, description, and body", () => {
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-skill-query-"),
    );
    writeSkill(
      folder,
      "customer-support",
      "Customer support reply",
      "Answer support tickets politely",
      "Write a helpful reply to the customer ticket.",
    );
    writeSkill(
      folder,
      "deploy-checklist",
      "Deploy checklist",
      "Ship a release to production",
      "Run typecheck, tests, and deploy the release.",
    );
    writeSkill(
      folder,
      "sql-migration",
      "SQL migration",
      "Write a database migration",
      "Create a safe SQL migration for the schema change.",
    );

    const result = queryPromptSdlcFolderSkills({
      workingDirectory: folder,
      query: "customer support ticket reply",
      limit: 2,
    });

    expect(result.query).toBe("customer support ticket reply");
    expect(result.hits.length).toBeGreaterThan(0);
    expect(result.hits[0]?.skillId).toBe("customer-support");
    expect(result.hits[0]?.source).toBe("filesystem");
    expect(result.hits[0]?.sourcePath).toContain(
      path.join(".cursor", "skills", "customer-support", "SKILL.md"),
    );
    expect(result.hits[0]?.score).toBeGreaterThan(0);
    expect(result.context).toMatch(/Customer support reply/);

    const deploy = queryPromptSdlcFolderSkills({
      workingDirectory: folder,
      query: "production deploy release checklist",
      limit: 1,
    });
    expect(deploy.hits[0]?.skillId).toBe("deploy-checklist");
  });

  it("returns an empty hit list for an empty query or missing folder", () => {
    expect(
      queryPromptSdlcFolderSkills({
        workingDirectory: "/tmp",
        query: "   ",
      }).hits,
    ).toEqual([]);
    expect(
      queryPromptSdlcFolderSkills({
        workingDirectory: path.join(os.tmpdir(), "no-such-folder-xyz"),
        query: "anything",
      }).hits,
    ).toEqual([]);
  });
});

describe("servePromptSdlcFolderSkillsQuery", () => {
  it("validates POST JSON and returns ranked hits", () => {
    const folder = fs.mkdtempSync(
      path.join(os.tmpdir(), "prompt-sdlc-skill-api-"),
    );
    writeSkill(
      folder,
      "note-taker",
      "Note taker",
      "Summarize meeting notes",
      "Capture action items from the meeting transcript.",
    );

    expect(
      servePromptSdlcFolderSkillsQuery({ method: "GET", rawBody: "" }),
    ).toMatchObject({ status: 405 });

    const bad = servePromptSdlcFolderSkillsQuery({
      method: "POST",
      rawBody: JSON.stringify({ query: "notes" }),
    });
    expect(bad.status).toBe(400);

    const ok = servePromptSdlcFolderSkillsQuery({
      method: "POST",
      rawBody: JSON.stringify({
        workingDirectory: folder,
        query: "meeting notes action items",
        limit: 3,
      }),
    });
    expect(ok.status).toBe(200);
    const body = ok.body as {
      hits: { skillId: string }[];
      context: string;
    };
    expect(body.hits[0]?.skillId).toBe("note-taker");
    expect(body.context).toMatch(/Note taker/);
  });
});
