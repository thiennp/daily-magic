import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  DELETE_DIR,
  FORBIDDEN_SPECIFIERS,
  walkGraph,
} from "@/lib/projects/delete/walkProjectDeleteModuleGraph.testUtils";

describe("project delete module graph is DB-only", () => {
  const { files, bare } = walkGraph();

  it("walks the orchestrator and its helpers", () => {
    expect(
      files.some((f) => f.endsWith("orchestrateDeleteProjectDbOnly.ts")),
    ).toBe(true);
    expect(files.some((f) => f.endsWith("src/lib/db.ts"))).toBe(true);
  });

  it("never imports fs, child_process, net, or http (directly or transitively)", () => {
    for (const specifier of FORBIDDEN_SPECIFIERS) {
      expect(bare.has(specifier), specifier).toBe(false);
    }
  });

  it("lists the runtime packages it does use (DB driver only)", () => {
    expect([...bare].sort()).toMatchInlineSnapshot(`
      [
        "@neondatabase/serverless",
        "node:path",
      ]
    `);
  });

  it("never calls fetch, the local AgentWitch, or a wake port", () => {
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/\bfetch\(|XMLHttpRequest|WebSocket\(/);
    }
    // Transitive helpers only compare hostname strings (isLocalAgentWitchHostname);
    // the delete code itself must not name a local origin or wake port.
    const ownFiles = files.filter((file) => file.includes(`/${DELETE_DIR}/`));
    for (const file of ownFiles) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(
        /127\.0\.0\.1|localhost|WAKE_PORT|wakePort/i,
      );
    }
  });
});
