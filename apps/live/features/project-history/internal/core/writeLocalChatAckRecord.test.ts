import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

import { writeLocalChatAckRecord } from "./writeLocalChatAckRecord";
import {
  PROJECT_HISTORY_ACKS_DIR_NAME,
  PROJECT_HISTORY_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

describe("writeLocalChatAckRecord", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-ack-"));
    layoutState.root = tempRoot;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("persists under history/acks/<messageId>.json and bumps lastSeenAt", () => {
    const first = writeLocalChatAckRecord({
      projectId: "p1",
      deviceId: "dev-1",
      messageId: "m1",
      nowIso: "2026-01-01T00:00:00.000Z",
    });
    expect(first).toEqual({
      deviceId: "dev-1",
      messageId: "m1",
      ackedAt: "2026-01-01T00:00:00.000Z",
      lastSeenAt: "2026-01-01T00:00:00.000Z",
    });
    const filePath = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_DIR_NAME,
      PROJECT_HISTORY_ACKS_DIR_NAME,
      "m1.json",
    );
    expect(fs.existsSync(filePath)).toBe(true);
    const second = writeLocalChatAckRecord({
      projectId: "p1",
      deviceId: "dev-1",
      messageId: "m1",
      nowIso: "2026-01-02T00:00:00.000Z",
    });
    expect(second.ackedAt).toBe("2026-01-01T00:00:00.000Z");
    expect(second.lastSeenAt).toBe("2026-01-02T00:00:00.000Z");
  });
});
