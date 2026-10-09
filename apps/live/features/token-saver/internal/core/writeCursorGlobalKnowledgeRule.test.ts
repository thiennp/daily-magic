import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { createTempCliIo } from "./createNodeCliFs";
import {
  CURSOR_GLOBAL_KNOWLEDGE_RULE_RELATIVE,
  HTML_MARKER_BEGIN,
} from "./tokenSaverMarkers.constants";
import { writeCursorGlobalKnowledgeRule } from "./writeCursorGlobalKnowledgeRule";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("writeCursorGlobalKnowledgeRule", () => {
  it("writes global knowledge rule with AWB path and is idempotent", () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), "awl-global-knowledge-"),
    );
    tempDirs.push(root);
    const io = createTempCliIo(root);
    const first = writeCursorGlobalKnowledgeRule({ io });
    expect(first.wrote).toBe(true);
    const filePath = path.join(root, CURSOR_GLOBAL_KNOWLEDGE_RULE_RELATIVE);
    const body = io.readUtf8(filePath);
    expect(body).toContain("alwaysApply: true");
    expect(body).toContain("/knowledge/update");
    expect(body).toContain(HTML_MARKER_BEGIN);
    const second = writeCursorGlobalKnowledgeRule({ io });
    expect(second.wrote).toBe(false);
  });
});
