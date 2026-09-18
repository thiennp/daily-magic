import { describe, expect, it } from "vitest";

import type { InstalledLocalHarnessSnapshot } from "../../../harness/internal/core/readInstalledLocalHarnessSnapshot";
import type AgentWitchProjectView from "./agentWitchProjectView.type";
import { buildAgentWitchLocalProjectEditorPageBody } from "./buildAgentWitchLocalProjectEditorPage";

const project: AgentWitchProjectView = {
  id: "proj-1",
  name: "daily-magic",
  projectFolderPath: "/Users/me/code/daily-magic",
};

const emptyInstalled: InstalledLocalHarnessSnapshot = {
  manifestUpdatedAt: null,
  sets: [],
};

describe("buildAgentWitchLocalProjectEditorPageBody", () => {
  it("makes Pull into repo a working Harness link when nothing is installed (AWL-P1)", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      installed: emptyInstalled,
      linkedSetSlugs: [],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain("Pull into repo");
    expect(html).toContain('href="/harness"');
    expect(html).not.toContain(" disabled");
    expect(html).not.toContain('action="/projects/link-harness"');
  });

  it("submits checked harness sets when Pull into repo is used with installed sets", () => {
    const installed: InstalledLocalHarnessSnapshot = {
      manifestUpdatedAt: "2026-09-18T00:00:00.000Z",
      sets: [
        {
          slug: "check24-style-guide",
          name: "CHECK24 style guide",
          itemCount: 3,
          updatedAt: "2026-09-18T00:00:00.000Z",
        },
      ],
    };

    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      installed,
      linkedSetSlugs: ["check24-style-guide"],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain('action="/projects/link-harness"');
    expect(html).toContain('type="submit">Pull into repo</button>');
    expect(html).toContain('value="check24-style-guide" checked');
    expect(html).not.toContain(" disabled");
  });
});
