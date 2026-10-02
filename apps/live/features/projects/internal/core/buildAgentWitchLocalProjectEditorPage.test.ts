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

const cloudAppOrigin = "https://www.agentwitch.com";

const installedWithOneSet: InstalledLocalHarnessSnapshot = {
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

describe("buildAgentWitchLocalProjectEditorPageBody", () => {
  it("makes Pull into repo a working Harness link when nothing is installed (AWL-P1)", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
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
    expect(html).not.toContain('action="/projects/pull-bound-harness"');
  });

  it("pulls a Console-linked playbook when nothing is installed locally (MARKETPLACE-009)", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: emptyInstalled,
      linkedSetSlugs: [],
      composition: {
        counts: { harness: 1, workflow: 1, agent: 0 },
        items: [
          {
            id: "bind-1",
            componentId: "comp-1",
            kind: "harness",
            name: "Freelancer client proposal harness",
            versionLabel: null,
          },
        ],
      },
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain('action="/projects/pull-bound-harness"');
    expect(html).toContain('type="submit">Pull into repo</button>');
    expect(html).not.toContain('href="/harness"');
  });

  it("submits checked harness sets when Pull into repo is used with installed sets", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: installedWithOneSet,
      linkedSetSlugs: [],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain('action="/projects/link-harness"');
    expect(html).toContain('type="submit">Pull into repo</button>');
    expect(html).toContain('value="check24-style-guide" checked');
    expect(html).toContain("Check the sets to write into this repo");
    expect(html).not.toContain(" disabled");
  });

  it("shows Update in repo when harness sets are already materialized in the folder", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: installedWithOneSet,
      linkedSetSlugs: ["check24-style-guide"],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain('action="/projects/link-harness"');
    expect(html).toContain('type="submit">Update in repo</button>');
    expect(html).not.toContain('type="submit">Pull into repo</button>');
    expect(html).toContain("already in this repo");
    expect(html).toContain("in repo");
    expect(html).toContain('value="check24-style-guide" checked');
  });

  it("does not offer first-time Pull when ledger already has sets but profile harness is empty", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: emptyInstalled,
      linkedSetSlugs: ["template-vibe-coding-app-feature"],
      composition: {
        counts: { harness: 1, workflow: 0, agent: 0 },
        items: [
          {
            id: "bind-1",
            componentId: "comp-1",
            kind: "harness",
            name: "Add vibe coding app feature harness",
            versionLabel: null,
          },
        ],
      },
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain("already materialized");
    expect(html).toContain('type="submit">Update in repo</button>');
    expect(html).not.toContain('type="submit">Pull into repo</button>');
    expect(html).toContain('action="/projects/pull-bound-harness"');
    expect(html).toContain("template-vibe-coding-app-feature");
  });
});
