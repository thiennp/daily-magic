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
    expect(html).toContain(
      'class="btn btn-primary" type="submit">Pull into repo</button>',
    );
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
    expect(html).toContain(
      'form="link-harness-form" class="btn btn-primary" type="submit">Pull into repo</button>',
    );
    expect(html).toContain('value="check24-style-guide" checked');
    expect(html).toContain("Check the playbooks to write into this repo");
    expect(html).not.toContain(" disabled");
  });

  it("shows secondary Refresh in repo when harness sets are already materialized in the folder", () => {
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
    expect(html).toContain(
      'form="link-harness-form" class="btn btn-secondary" type="submit">Refresh in repo…</button>',
    );
    expect(html).not.toContain('type="submit">Pull into repo</button>');
    expect(html).not.toContain('type="submit">Update in repo</button>');
    expect(html).not.toContain('btn-primary" type="submit">Refresh in repo');
    expect(html).toContain("already in this repo");
    expect(html).toContain("in repo");
    expect(html).toContain('value="check24-style-guide" checked');
    expect(html).toContain('action="/projects/remove-harness-set"');
    expect(html).toContain('name="setSlug" value="check24-style-guide"');
    expect(html).toContain(
      'class="btn btn-danger btn-compact" type="submit">Remove from repo</button>',
    );
    expect(html).toContain(
      "return confirm('Remove this playbook from the repo? Files stay installed on this computer.')",
    );
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

    expect(html).toContain("already in this repo");
    expect(html).toContain(
      'class="btn btn-secondary" type="submit">Refresh in repo…</button>',
    );
    expect(html).not.toContain('type="submit">Pull into repo</button>');
    expect(html).not.toContain('type="submit">Update in repo</button>');
    expect(html).toContain('action="/projects/pull-bound-harness"');
    expect(html).toContain("template-vibe-coding-app-feature");
    expect(html).toContain('action="/projects/remove-harness-set"');
    expect(html).toContain(
      'name="setSlug" value="template-vibe-coding-app-feature"',
    );
    expect(html).toContain(
      'class="btn btn-danger btn-compact" type="submit">Remove from repo</button>',
    );
  });

  it("does not show Remove from repo for installed sets that are not yet in the repo", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: installedWithOneSet,
      linkedSetSlugs: [],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain(
      'form="link-harness-form" class="btn btn-primary" type="submit">Pull into repo</button>',
    );
    expect(html).not.toContain("Remove from repo");
    expect(html).not.toContain('action="/projects/remove-harness-set"');
  });

  it("offers Open in AgentWitch Cloud and labels the composition tab Playbooks", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: emptyInstalled,
      linkedSetSlugs: [],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain(">Open in AgentWitch Cloud</a>");
    expect(html).toContain('href="https://www.agentwitch.com/projects/proj-1"');
    expect(html).toContain(">Rename…</a>");
    expect(html).toContain("Playbooks (0)");
    expect(html).not.toContain("Harness (0)");
    expect(html).toContain("No playbook on this computer yet");
  });

  it("adds a Pitfalls tab next to Knowledge with the active count", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: emptyInstalled,
      linkedSetSlugs: [],
      composition: null,
      knowledgeCandidateCount: 0,
      pitfalls: {
        ok: true,
        syncedAt: null,
        items: [
          {
            id: "seed-a",
            projectId: null,
            symptom: "Build breaks after rename",
            cause: "Old path left behind.",
            avoidance: "Search for old imports first.",
            check: { kind: "id", value: "seed-a" },
            keywords: ["rename"],
            tags: [],
            source: "seed",
            overridesSeed: false,
            hitCount: 0,
            lastSeenAt: null,
            updatedAt: null,
            severity: "warn",
          },
        ],
      },
      activeTab: "pitfalls",
    });

    expect(html).toMatch(
      /Knowledge \(0\)<\/a>\s*<a class="project-tab project-tab-active" href="\/project\?id=proj-1&tab=pitfalls">Pitfalls \(1\)<\/a>/,
    );
    expect(html).toContain("Build breaks after rename");
    expect(html).toContain(">Add pitfall</a>");
  });

  it("labels the Pitfalls tab without a count when the list is not loaded", () => {
    const html = buildAgentWitchLocalProjectEditorPageBody({
      project,
      cloudAppOrigin,
      installed: emptyInstalled,
      linkedSetSlugs: [],
      composition: null,
      knowledgeCandidateCount: 0,
      activeTab: "harness",
    });

    expect(html).toContain('tab=pitfalls">Pitfalls</a>');
  });
});
