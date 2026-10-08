import { describe, expect, it } from "vitest";

import { filterAgentWitchLaunchAgentLabelsForProcess } from "./bootoutAgentWitchLaunchAgentsForCurrentUser";

const labels = [
  "com.agent-witch-wake",
  "com.agent-witch",
  "com.agent-witch.aaa",
  "com.agent-witch.bbb",
];

describe("filterAgentWitchLaunchAgentLabelsForProcess (dd5c338d)", () => {
  it("monolith (no host-services.json) keeps every label", () => {
    expect(
      filterAgentWitchLaunchAgentLabelsForProcess({
        labels,
        accountLabels: null,
        ownAccountLabel: null,
      }),
    ).toEqual(labels);
  });

  it("an account host never boots out another account's LaunchAgent", () => {
    expect(
      filterAgentWitchLaunchAgentLabelsForProcess({
        labels,
        accountLabels: ["com.agent-witch.aaa", "com.agent-witch.bbb"],
        ownAccountLabel: "com.agent-witch.aaa",
      }),
    ).toEqual([
      "com.agent-witch-wake",
      "com.agent-witch",
      "com.agent-witch.aaa",
    ]);
  });

  it("the launcher boots out no account LaunchAgent", () => {
    expect(
      filterAgentWitchLaunchAgentLabelsForProcess({
        labels,
        accountLabels: ["com.agent-witch.aaa", "com.agent-witch.bbb"],
        ownAccountLabel: null,
      }),
    ).toEqual(["com.agent-witch-wake", "com.agent-witch"]);
  });
});
