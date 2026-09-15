import { describe, expect, it } from "vitest";

import {
  loadAgentBootstrapManifest,
  matchRoutingRow,
} from "./lib/loadAgentBootstrapManifest";
import { renderAgentBootstrapGitHooksMarkdown } from "./lib/renderAgentBootstrapGitHooksMarkdown";

describe("loadAgentBootstrapManifest", () => {
  it("loads routing and verify workflow scripts", () => {
    const manifest = loadAgentBootstrapManifest();

    expect(manifest.version).toBe(1);
    expect(manifest.routing.length).toBeGreaterThan(0);
    expect(manifest.workflows.verify.scripts).toContain(
      "npm run cursor:verify",
    );
  });
});

describe("matchRoutingRow", () => {
  it("HARNESS-001: prefers comprehensive commit over generic verify", () => {
    const manifest = loadAgentBootstrapManifest();
    const row = matchRoutingRow(
      manifest,
      "run comprehensive commit review before verify",
    );

    expect(row?.command).toBe("command-git-commit-comprehensive-review.md");
    expect(row?.priority).toBe(1);
  });

  it("matches verify intent when no higher-priority signal matches", () => {
    const manifest = loadAgentBootstrapManifest();
    const row = matchRoutingRow(
      manifest,
      "please run post-change verify and lint",
    );

    expect(row?.command).toBe(
      "command-verify-post-change-lint-typecheck-tests.md",
    );
  });
});

describe("renderAgentBootstrapGitHooksMarkdown", () => {
  it("includes pre-commit steps from manifest", () => {
    const manifest = loadAgentBootstrapManifest();
    const md = renderAgentBootstrapGitHooksMarkdown(manifest);

    expect(md).toContain("agent-bootstrap.manifest.json");
    expect(md).toContain("npm run cursor:architecture -- --staged");
  });
});
