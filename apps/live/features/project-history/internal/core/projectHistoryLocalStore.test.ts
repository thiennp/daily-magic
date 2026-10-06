import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const layoutState = vi.hoisted(() => ({ root: "" }));
const sqliteState = vi.hoisted(() => ({
  forceOff: false,
}));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchLocalLayout: () => ({ projectDataDir: layoutState.root }),
}));

vi.mock("@agent-witch/live-token-saver", async () => {
  const actual = await vi.importActual<
    typeof import("@agent-witch/live-token-saver")
  >("@agent-witch/live-token-saver");
  return {
    ...actual,
    loadNodeSqlite: () => {
      if (sqliteState.forceOff) {
        return {
          ok: false as const,
          reason: "forced_off_for_test",
        };
      }
      return actual.loadNodeSqlite();
    },
  };
});

import { getLocalChatMessage } from "./getLocalChatMessage";
import { listLocalChatIndexPage } from "./listLocalChatIndexPage";
import { listLocalChatThreadKeys } from "./listLocalChatThreadKeys";
import {
  PROJECT_HISTORY_DIR_NAME,
  PROJECT_HISTORY_INDEX_DIR_NAME,
  PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
} from "./projectHistoryPaths.constant";
import { rebuildProjectHistoryIndex } from "./rebuildProjectHistoryIndex";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import { writeProjectHistoryMessage } from "./writeProjectHistoryMessage";

describe("S5 local chat index + store API", () => {
  let tempRoot = "";

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ph-s5-"));
    layoutState.root = tempRoot;
    sqliteState.forceOff = false;
  });

  afterEach(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("ingests into index after durable write and pages newest-first", () => {
    const runtimeHasSqlite =
      typeof process.getBuiltinModule === "function" &&
      process.getBuiltinModule("node:sqlite") !== undefined;
    if (!runtimeHasSqlite) {
      return;
    }

    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-old",
      message: {
        messageId: "m-old",
        threadKey: "t1",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-new",
      message: {
        messageId: "m-new",
        threadKey: "t1",
        createdAt: "2026-01-03T00:00:00.000Z",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-mid",
      message: {
        messageId: "m-mid",
        threadKey: "t1",
        createdAt: "2026-01-02T00:00:00.000Z",
      },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m-other",
      message: {
        messageId: "m-other",
        threadKey: "t2",
        createdAt: "2026-01-04T00:00:00.000Z",
      },
    });

    const page = listLocalChatIndexPage({
      projectId: "p1",
      threadKey: "t1",
      limit: 10,
    });
    expect(page.available).toBe(true);
    expect(page.rows.map((r) => r.messageId)).toEqual([
      "m-new",
      "m-mid",
      "m-old",
    ]);

    const before = listLocalChatIndexPage({
      projectId: "p1",
      threadKey: "t1",
      beforeCreatedAt: "2026-01-03T00:00:00.000Z",
      beforeMessageId: "m-new",
      limit: 10,
    });
    expect(before.rows.map((r) => r.messageId)).toEqual(["m-mid", "m-old"]);

    const threads = listLocalChatThreadKeys({ projectId: "p1" });
    expect(threads.threadKeys).toEqual(["t1", "t2"]);

    const body = getLocalChatMessage({ projectId: "p1", messageId: "m-new" });
    expect(body?.messageId).toBe("m-new");
    expect(body?.message.threadKey).toBe("t1");

    const storeDb = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_INDEX_DIR_NAME,
      PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
    );
    expect(fs.existsSync(storeDb)).toBe(true);
  });

  it("rebuild scans history/*.json and skips state.json", () => {
    const runtimeHasSqlite =
      typeof process.getBuiltinModule === "function" &&
      process.getBuiltinModule("node:sqlite") !== undefined;
    if (!runtimeHasSqlite) {
      return;
    }

    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: { messageId: "m1", threadKey: "tx", createdAt: "2026-02-01T00:00:00.000Z" },
    });
    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m2",
      message: { messageId: "m2", threadKey: "tx", createdAt: "2026-02-02T00:00:00.000Z" },
    });

    const historyDir = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_DIR_NAME,
    );
    fs.writeFileSync(path.join(historyDir, "state.json"), '{"state":"on"}\n');

    const storeDb = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_INDEX_DIR_NAME,
      PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
    );
    fs.rmSync(storeDb, { force: true });

    const rebuilt = rebuildProjectHistoryIndex({ projectId: "p1" });
    expect(rebuilt).toEqual({ ok: true, scanned: 2, ingested: 2 });

    const page = listLocalChatIndexPage({ projectId: "p1", threadKey: "tx" });
    expect(page.rows.map((r) => r.messageId)).toEqual(["m2", "m1"]);
  });

  it("index-off degrades: write still durable, reads fall back / empty-safe", () => {
    sqliteState.forceOff = true;

    const record = writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "m1",
      message: {
        messageId: "m1",
        threadKey: "t-off",
        createdAt: "2026-03-01T00:00:00.000Z",
      },
    });
    expect(record.messageId).toBe("m1");

    const filePath = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_DIR_NAME,
      "m1.json",
    );
    expect(fs.existsSync(filePath)).toBe(true);

    const storeDb = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_INDEX_DIR_NAME,
      PROJECT_HISTORY_INDEX_STORE_DB_FILE_NAME,
    );
    expect(fs.existsSync(storeDb)).toBe(false);

    const rebuilt = rebuildProjectHistoryIndex({ projectId: "p1" });
    expect(rebuilt.ok).toBe(false);
    if (!rebuilt.ok) {
      expect(rebuilt.reason).toBe("forced_off_for_test");
    }

    const page = listLocalChatIndexPage({
      projectId: "p1",
      threadKey: "t-off",
    });
    expect(page.rows.map((r) => r.messageId)).toEqual(["m1"]);
    expect(getLocalChatMessage({ projectId: "p1", messageId: "m1" })?.messageId).toBe(
      "m1",
    );
  });

  it("history file survives index operations", () => {
    const runtimeHasSqlite =
      typeof process.getBuiltinModule === "function" &&
      process.getBuiltinModule("node:sqlite") !== undefined;

    writeProjectHistoryMessage({
      projectId: "p1",
      messageId: "survive",
      message: { messageId: "survive", text: "keep-me" },
    });
    const filePath = path.join(
      resolveProjectDataDir("p1"),
      PROJECT_HISTORY_DIR_NAME,
      "survive.json",
    );
    const before = fs.readFileSync(filePath, "utf8");

    if (runtimeHasSqlite) {
      rebuildProjectHistoryIndex({ projectId: "p1" });
      listLocalChatIndexPage({ projectId: "p1", limit: 5 });
    }

    expect(fs.readFileSync(filePath, "utf8")).toBe(before);
    expect(JSON.parse(before).message.text).toBe("keep-me");
  });
});
