import { describe, expect, it } from "vitest";

import buildProjectPitfallsTab, {
  formatPitfallLastHit,
  formatPitfallUpdatedAt,
} from "./buildProjectPitfallsTab";
import { buildPitfallFixture } from "./projectPitfallFixtures.testUtil";

const nowMs = Date.parse("2026-10-05T12:00:00.000Z");
const seed = buildPitfallFixture();
const projectItem = buildPitfallFixture({
  id: "project-tests-hang-a1b2c3",
  symptom: "Tests hang on <watch> mode",
  avoidance: "Run tests once with --run.",
  keywords: ["vitest", "watch"],
  source: "project",
  severity: "block",
  lastSeenAt: null,
  updatedAt: null,
});
const retired = buildPitfallFixture({
  id: "seed-old-node",
  symptom: "Wrong Node version",
  source: "retired",
});

const render = (
  overrides: Partial<Parameters<typeof buildProjectPitfallsTab>[0]> = {},
) =>
  buildProjectPitfallsTab({
    projectId: "proj-1",
    list: { ok: true, items: [seed, projectItem, retired], syncedAt: null },
    showRetired: false,
    editId: null,
    nowMs,
    ...overrides,
  });

describe("buildProjectPitfallsTab", () => {
  it("lists active pitfalls with Title, Fix, Triggers, Last hit, and hides retired", () => {
    const html = render();
    expect(html).toContain("2 of 64 active");
    expect(html).toContain("Install fails after a branch switch");
    expect(html).toContain("Fix: Run a clean install before you start.");
    expect(html).toContain("Triggers: vitest, watch");
    expect(html).toContain("Last hit 2h ago");
    expect(html).toContain("Never hit");
    expect(html).toContain("Updated 2026-10-05");
    expect(html).toContain("Not updated yet");
    expect(html).toContain("Built-in");
    expect(html).toContain("Must fix");
    expect(html).not.toContain("Wrong Node version");
    expect(html).toContain(">Show retired</a>");
    expect(html).toContain(">Add pitfall</a>");
    expect(html).toContain('action="/project/pitfalls/retire"');
  });

  it("escapes user text", () => {
    const html = render();
    expect(html).toContain("Tests hang on &lt;watch&gt; mode");
    expect(html).not.toContain("<watch>");
  });

  it("shows retired rows with Bring back when Show retired is on", () => {
    const html = render({ showRetired: true });
    expect(html).toContain("Wrong Node version");
    expect(html).toContain('action="/project/pitfalls/restore"');
    expect(html).toContain(">Bring back</button>");
    expect(html).toContain(">Hide retired</a>");
    expect(html).toContain('name="showRetired" value="1"');
  });

  it("opens a prefilled edit form for a seed with an override note", () => {
    const html = render({ editId: seed.id });
    expect(html).toContain('action="/project/pitfalls/save"');
    expect(html).toContain('name="pitfallId" value="seed-stale-lockfile"');
    expect(html).toContain('value="lockfile, install"');
    expect(html).toContain('value="npm ci"');
    expect(html).toContain("Your changes apply to this project only.");
    expect(html).toContain('maxlength="120"');
    expect(html).toContain('maxlength="280"');
    expect(html).toContain('maxlength="200"');
    expect(html).toContain('name="cause" required');
    expect(html).not.toContain(">Add pitfall</a>");
  });

  it("opens an empty add form", () => {
    const html = render({ editId: "new" });
    expect(html).toContain('name="pitfallId" value=""');
    expect(html).toContain(">Save pitfall</button>");
    expect(html).toContain('<option value="warn" selected>Warning</option>');
  });

  it("hides Add at 64 active and explains how to free a slot", () => {
    const full = Array.from({ length: 64 }, (_, i) =>
      buildPitfallFixture({ id: `p-${i}`, source: "project" }),
    );
    const html = render({
      list: { ok: true, items: full, syncedAt: null },
      editId: "new",
    });
    expect(html).toContain("64 of 64 active. Retire one to add another.");
    expect(html).not.toContain(">Add pitfall</a>");
    expect(html).not.toContain(">Save pitfall</button>");
  });

  it("shows plain empty and error states", () => {
    expect(render({ list: { ok: true, items: [], syncedAt: null } })).toContain(
      "No pitfalls for this project.",
    );
    expect(render({ list: { ok: false, reason: "unavailable" } })).toContain(
      "Could not load pitfalls.",
    );
    expect(render({ list: null })).toContain("Could not load pitfalls.");
  });

  it("avoids jargon and weak words in visible copy", () => {
    const html = [
      render(),
      render({ showRetired: true, editId: seed.id }),
      render({ list: { ok: false, reason: "unavailable" } }),
    ].join("\n");
    expect(html).not.toMatch(
      /\b(API|endpoint|JSON|HMAC|beta|experimental|unverified|not yet)\b/i,
    );
  });
});

describe("formatPitfallUpdatedAt", () => {
  it('shows "Not updated yet" for null or invalid', () => {
    expect(formatPitfallUpdatedAt(null)).toBe("Not updated yet");
    expect(formatPitfallUpdatedAt("bad")).toBe("Not updated yet");
    expect(formatPitfallUpdatedAt("2026-10-05T09:00:00.000Z")).toBe(
      "Updated 2026-10-05",
    );
  });
});

describe("formatPitfallLastHit", () => {
  it("formats relative times", () => {
    expect(formatPitfallLastHit(null, nowMs)).toBe("Never hit");
    expect(formatPitfallLastHit("bad", nowMs)).toBe("Never hit");
    expect(formatPitfallLastHit("2026-10-05T11:59:30.000Z", nowMs)).toBe(
      "Last hit just now",
    );
    expect(formatPitfallLastHit("2026-10-05T11:45:00.000Z", nowMs)).toBe(
      "Last hit 15 min ago",
    );
    expect(formatPitfallLastHit("2026-10-04T12:00:00.000Z", nowMs)).toBe(
      "Last hit 1 day ago",
    );
    expect(formatPitfallLastHit("2026-07-01T00:00:00.000Z", nowMs)).toBe(
      "Last hit 2026-07-01",
    );
  });

  it("disables submit buttons on retire/restore/save so double-clicks cannot race", () => {
    const active = render();
    expect(active).toContain("querySelectorAll('button')");
    expect(active).toContain("b.disabled=true");
    const retired = render({ showRetired: true });
    expect(retired).toContain('action="/project/pitfalls/restore"');
    expect(retired).toContain("b.disabled=true");
    const form = render({ editId: seed.id });
    expect(form).toContain('action="/project/pitfalls/save"');
    expect(form).toContain("b.disabled=true");
  });
});
