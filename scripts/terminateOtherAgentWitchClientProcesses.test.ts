import { describe, expect, it } from "vitest";

import {
  __testOnlyParseAgentWitchClientPids,
  isAgentWitchClientProcessCommand,
} from "./terminateOtherAgentWitchClientProcesses";

describe("terminateOtherAgentWitchClientProcesses (AGENT-059)", () => {
  const installDir = "/Users/me/.agent-witch";

  it("finds sibling agent-witch.ts pids for the same install dir", () => {
    const psOutput = [
      ` 111 /usr/bin/node ${installDir}/node_modules/tsx/dist/cli.mjs ${installDir}/agent-witch.ts`,
      ` 222 /usr/bin/node ${installDir}/node_modules/tsx/dist/cli.mjs ${installDir}/agent-witch.ts`,
      ` 333 /usr/bin/node /other/.agent-witch/agent-witch.ts`,
      ` 444 /bin/zsh`,
    ].join("\n");

    expect(
      __testOnlyParseAgentWitchClientPids(psOutput, installDir, 111),
    ).toEqual([222]);
  });

  it("does not treat shells that mention agent-witch.ts as clients", () => {
    const shellCommand = `/bin/zsh -c snap=$(command cat); ... ${installDir}/agent-witch.ts ... pgrep`;
    expect(isAgentWitchClientProcessCommand(shellCommand, installDir)).toBe(
      false,
    );

    const psOutput = [
      ` 111 /usr/bin/node ${installDir}/node_modules/tsx/dist/cli.mjs ${installDir}/agent-witch.ts`,
      ` 500 ${shellCommand}`,
    ].join("\n");

    expect(
      __testOnlyParseAgentWitchClientPids(psOutput, installDir, 111),
    ).toEqual([]);
  });
});
