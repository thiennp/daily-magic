import { describe, expect, it } from "vitest";

import { REPORT_SURFACES } from "@/features/projects/access/invites/projectBotPlaybookReport.surfaces.testutil";

const sentences = (text: string): readonly string[] =>
  text.split(/(?<=[.;:])\s+/);

describe("bot Playbook report copy lock: forbidden wording", () => {
  it.each(Object.entries(REPORT_SURFACES))(
    "%s never calls a Playbook skill a knowledge card or requires an onboarding skill",
    (_name, text) => {
      expect(text).not.toMatch(/knowledge cards?/i);
      expect(text).not.toMatch(/REQUIRED[^.]*onboarding/);
      expect(text).not.toMatch(/so AgentWitch can learn auto skills/i);
    },
  );

  it.each(Object.entries(REPORT_SURFACES))(
    "%s never ties resultSummary to auto-skill learning",
    (_name, text) => {
      const offending = sentences(text).filter(
        (sentence) =>
          /resultSummary/.test(sentence) && /auto[- ]skill/i.test(sentence),
      );
      expect(offending).toEqual([]);
    },
  );

  it.each(Object.entries(REPORT_SURFACES))(
    "%s never tells a bot to read the whole library",
    (_name, text) => {
      expect(text).not.toMatch(
        /list_project_skills(,| and) (then )?get_project_skill/,
      );
    },
  );
});
