import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import type { UpsertPitfallInput } from "../../public-api/types";
import { createPitfallRegistry } from "./createPitfallRegistry";

const tempDirs: string[] = [];

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

const openTempRegistry = () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-upsert-"));
  tempDirs.push(tempDir);
  return createPitfallRegistry({ dbPath: path.join(tempDir, "token-saver.db") });
};

const override = (
  patch: Partial<UpsertPitfallInput> = {},
): UpsertPitfallInput => ({
  id: "health-lag",
  projectId: "proj-1",
  symptom: "Override symptom",
  cause: "Override cause",
  avoidance: "Override avoidance",
  check: { kind: "command", value: "npm run ci" },
  keywords: ["health"],
  ...patch,
});

describe("upsertPitfall never rewrites counters (must-fix b)", () => {
  it("keeps hitCount + lastSeenAt across override creation and edits", () => {
    const registry = openTempRegistry();
    const seenAt = "2026-10-05T10:00:00.000Z";
    registry.recordHit({ projectId: "proj-1", id: "health-lag" });
    registry.recordHit({ projectId: "proj-1", id: "health-lag", nowIso: seenAt });

    const created = registry.upsertPitfall(override());
    expect(created.ok && created.pitfall.hitCount).toBe(2);
    expect(created.ok && created.pitfall.lastSeenAt).toBe(seenAt);

    const edited = registry.upsertPitfall(override({ avoidance: "Edited" }));
    expect(edited.ok && edited.pitfall.hitCount).toBe(2);

    const read = registry.getPitfall({ projectId: "proj-1", id: "health-lag" });
    expect(read?.avoidance).toBe("Edited");
    expect(read?.hitCount).toBe(2);
    expect(read?.lastSeenAt).toBe(seenAt);

    const bumped = registry.recordHit({ projectId: "proj-1", id: "health-lag" });
    expect(bumped.ok && bumped.pitfall.hitCount).toBe(3);
    expect(bumped.ok && bumped.pitfall.source).toBe("project");
    registry.close();
  });

  it("re-opening the registry (re-seed) keeps counters", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pitfall-reseed-"));
    tempDirs.push(tempDir);
    const dbPath = path.join(tempDir, "token-saver.db");
    const first = createPitfallRegistry({ dbPath });
    first.recordHit({ projectId: "proj-1", id: "health-lag" });
    first.close();

    const second = createPitfallRegistry({ dbPath });
    expect(second.getPitfall({ projectId: "proj-1", id: "health-lag" })?.hitCount).toBe(1);
    second.close();
  });
});

describe("id inputs are trimmed (must-fix c)", () => {
  it("getPitfall, recordHit and upsertPitfall all resolve the trimmed id", () => {
    const registry = openTempRegistry();
    expect(registry.getPitfall({ id: "  health-lag \n" })?.id).toBe("health-lag");
    expect(
      registry.getPitfall({ projectId: "proj-1", id: "\thealth-lag " })?.id,
    ).toBe("health-lag");

    const hit = registry.recordHit({ projectId: "proj-1", id: " health-lag  " });
    expect(hit.ok && hit.pitfall.id).toBe("health-lag");

    const upserted = registry.upsertPitfall(override({ id: "  my-pit  " }));
    expect(upserted.ok && upserted.pitfall.id).toBe("my-pit");
    registry.recordHit({ projectId: "proj-1", id: "my-pit " });
    registry.recordHit({ projectId: "proj-1", id: " my-pit" });
    expect(registry.getPitfall({ projectId: "proj-1", id: " my-pit " })?.hitCount).toBe(2);

    expect(registry.getPitfall({ id: "   " })).toBeNull();
    expect(registry.recordHit({ projectId: "proj-1", id: "  " }).ok).toBe(false);
    registry.close();
  });
});
