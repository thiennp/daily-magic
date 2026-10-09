import { describe, expect, it } from "vitest";

import {
  findProjectHistorySkillgenIdentifiers,
  scrubProjectHistorySkillgenIdentifiers,
} from "./scrubProjectHistorySkillgenIdentifiers";

describe("scrubProjectHistorySkillgenIdentifiers", () => {
  it("replaces tickets, PRs, commit hashes, urls, paths and ids", () => {
    const out = scrubProjectHistorySkillgenIdentifiers(
      "SmartAlarm NRG-3260: tip 306a44bb62 pushed as PR 4745, see https://x.io/a?b=1 in ~/nrg/core and 81459574-dd1e-44a5-96dd-ffd46344da37",
    );
    expect(out).toBe(
      "SmartAlarm <ticket>: tip <commit> pushed as <pr>, see <url> in <path> and <id>",
    );
  });

  it("keeps standards, plain words and placeholders", () => {
    const text = "Use UTF-8 and SHA-256, read <report-path>, defaced build";
    expect(scrubProjectHistorySkillgenIdentifiers(text)).toBe(text);
  });

  it("replaces known names whole-word, case-insensitive, longest first", () => {
    const out = scrubProjectHistorySkillgenIdentifiers(
      "NRG Lead asked thien to ask Thien Nguyen; Lead stays",
      ["Thien", "NRG Lead", "Thien Nguyen"],
    );
    expect(out).toBe("<person> asked <person> to ask <person>; Lead stays");
  });

  it("reports which identifier kinds remain", () => {
    expect(findProjectHistorySkillgenIdentifiers("generic steps only")).toEqual(
      [],
    );
    expect(
      findProjectHistorySkillgenIdentifiers("fix NRG-1 with Ann", ["Ann"]),
    ).toEqual(["person", "ticket"]);
  });
});
