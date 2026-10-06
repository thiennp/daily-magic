import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

const DIR = join(
  process.cwd(),
  "src/features/projects/access/invites/joinTypes",
);
type FixtureType = {
  readonly id: string;
  readonly label: string;
  readonly match: readonly string[];
  readonly matchHints: readonly string[];
  readonly connectPath: string;
  readonly deliveryMode: string;
  readonly steps: readonly string[];
  readonly note?: string;
};
/** Verbatim JSON `types[]` from COPY.md §S0c-types (Product EN lock). */
const FIXTURE = JSON.parse(
  readFileSync(join(DIR, "__fixtures__/copyS0cTypes.json"), "utf8"),
) as readonly FixtureType[];

describe("join type registry vs Product EN lock", () => {
  it("matches the COPY.md §S0c-types JSON verbatim, module by module", () => {
    expect(PROJECT_INVITE_JOIN_TYPES).toHaveLength(FIXTURE.length);
    PROJECT_INVITE_JOIN_TYPES.forEach((type, index) => {
      const expected = FIXTURE[index];
      expect(expected?.matchHints, type.id).toEqual(expected?.match);
      expect(
        { ...type, steps: [...type.steps], match: [...type.match] },
        type.id,
      ).toEqual({
        id: expected?.id,
        label: expected?.label,
        match: expected?.match,
        connectPath: expected?.connectPath,
        deliveryMode: expected?.deliveryMode,
        steps: expected?.steps,
        ...(expected?.note ? { note: expected.note } : {}),
      });
    });
  });

  it("only names AgentWitch URLs and tools that exist", () => {
    const urls = buildAgentAccessUrls();
    const knownUrls = new Set([urls.registerUrl, urls.mcpUrl, urls.invokeUrl]);
    const knownTools = new Set(AGENT_ACCESS_TOOLS.map((tool) => tool.name));
    const text = PROJECT_INVITE_JOIN_TYPES.flatMap((t) => t.steps).join(" ");
    for (const url of text.match(/https:\/\/www\.agentwitch\.com[^\s,;."]*/g) ??
      []) {
      expect(knownUrls.has(url), url).toBe(true);
    }
    for (const path of text.match(/\/api\/agent-access\/[a-z]+/g) ?? []) {
      expect(knownUrls.has(`${urls.origin}${path}`), path).toBe(true);
    }
    const tools =
      text.match(
        /\b(?:list|get|ack|register|redeem|rotate|project|leave|check)_[a-z_]+\b/g,
      ) ?? [];
    expect(tools.length).toBeGreaterThan(0);
    for (const tool of tools) {
      expect(knownTools.has(tool), tool).toBe(true);
    }
  });
});
