import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ServerResponse } from "node:http";

import { streamLocalHarnessReveal } from "./streamLocalHarnessReveal";

const createMockSseResponse = (): {
  readonly response: ServerResponse;
  readonly chunks: string[];
} => {
  const chunks: string[] = [];
  const response = {
    write: (chunk: string) => {
      chunks.push(chunk);
    },
  } as ServerResponse;

  return { response, chunks };
};

describe("streamLocalHarnessReveal", () => {
  it("emits folder and set events for a .cursor tree", () => {
    const tempRoot = fs.mkdtempSync(
      path.join(os.homedir(), ".agent-witch-test-stream-"),
    );
    const repoDir = path.join(tempRoot, "stream-repo");
    const cursorDir = path.join(repoDir, ".cursor");
    fs.mkdirSync(path.join(cursorDir, "rules"), { recursive: true });
    fs.writeFileSync(
      path.join(cursorDir, "rules", "demo-rule.mdc"),
      "---\ndescription: demo\n---\n",
    );

    const { response, chunks } = createMockSseResponse();
    const reveal = streamLocalHarnessReveal({
      scanRoot: tempRoot,
      response,
      shouldAbort: () => false,
    });

    expect(reveal.sets.length).toBe(1);
    expect(chunks.some((chunk) => chunk.includes("event: folder"))).toBe(true);
    expect(chunks.some((chunk) => chunk.includes("event: set"))).toBe(true);
    expect(chunks.some((chunk) => chunk.includes("event: done"))).toBe(true);

    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("rejects scan roots outside the home directory", () => {
    const { response, chunks } = createMockSseResponse();
    const reveal = streamLocalHarnessReveal({
      scanRoot: "/tmp/not-under-home",
      response,
      shouldAbort: () => false,
    });

    expect(reveal.sets).toEqual([]);
    expect(chunks.some((chunk) => chunk.includes("event: error"))).toBe(true);
  });
});
