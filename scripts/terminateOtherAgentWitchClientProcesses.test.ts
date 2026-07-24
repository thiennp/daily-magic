import { describe, expect, it } from "vitest";

import {
  __testOnlyParseAgentWitchClientPids,
  isAgentWitchClientProcessCommand,
} from "./terminateOtherAgentWitchClientProcesses";

describe("terminateOtherAgentWitchClientProcesses (AGENT-059)", () => {
  const installDir = "/Users/me/.agent-witch";
  const bundlePath = `${installDir}/app/agent-witch.js`;

  it("finds sibling bundled client pids for the same install dir", () => {
    const psOutput = [
      ` 111 /usr/bin/node ${bundlePath}`,
      ` 222 /usr/bin/node ${bundlePath}`,
      ` 333 /usr/bin/node /other/.agent-witch/app/agent-witch.js`,
      ` 444 /bin/zsh`,
    ].join("\n");

    expect(
      __testOnlyParseAgentWitchClientPids(psOutput, installDir, 111),
    ).toEqual([222]);
  });

  it("does not treat shells that mention agent-witch.js as clients", () => {
    const shellCommand = `/bin/zsh -c snap=$(command cat); ... ${bundlePath} ... pgrep`;
    expect(isAgentWitchClientProcessCommand(shellCommand, installDir)).toBe(
      false,
    );

    const psOutput = [
      ` 111 /usr/bin/node ${bundlePath}`,
      ` 500 ${shellCommand}`,
    ].join("\n");

    expect(
      __testOnlyParseAgentWitchClientPids(psOutput, installDir, 111),
    ).toEqual([]);
  });
});
