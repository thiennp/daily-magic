import { describe, expect, it } from "vitest";

import { buildAssignAgentOptions } from "@/features/projects/tasks/utils/buildAssignAgentOptions";

const mac = {
  id: "comp-1",
  projectDisplayName: "Thien Mac",
  isAgent: false,
  memberKind: "computer",
  assignable: true,
  connectVersionStatus: "ok",
  agents: [
    { writerAgent: "codex", label: "Codex", isOnline: true },
    { writerAgent: "claude-cli", label: "Claude Code", isOnline: true },
  ],
} as const;

describe("buildAssignAgentOptions", () => {
  it("lists each coding tool on a computer as its own named agent", () => {
    const options = buildAssignAgentOptions([mac]);
    expect(options.map((o) => [o.name, o.subtitle, o.writerAgent])).toEqual([
      ["Codex", "Thien Mac", "codex"],
      ["Claude Code", "Thien Mac", "claude-cli"],
    ]);
    expect(options.every((o) => !o.disabled)).toBe(true);
  });

  it("keeps agents of an offline computer visible but disabled", () => {
    const options = buildAssignAgentOptions([
      {
        ...mac,
        assignable: false,
        agents: mac.agents.map((a) => ({ ...a, isOnline: false })),
      },
    ]);
    expect(options.map((o) => [o.disabled, o.statusLabel])).toEqual([
      [true, "Offline"],
      [true, "Offline"],
    ]);
  });

  it("flags a signed-out tool and keeps bots", () => {
    const options = buildAssignAgentOptions([
      {
        ...mac,
        agents: [
          {
            writerAgent: "codex",
            label: "Codex",
            isOnline: true,
            needsSignIn: true,
          },
        ],
      },
      {
        id: "bot-1",
        projectDisplayName: "Planner",
        isAgent: true,
        memberKind: "bot",
      },
    ]);
    expect(options[0]?.statusLabel).toBe("Sign in needed");
    expect(options[1]).toMatchObject({ memberKind: "bot", name: "Planner" });
  });

  it("falls back to one computer row when no tools were reported", () => {
    const options = buildAssignAgentOptions([{ ...mac, agents: undefined }]);
    expect(options).toHaveLength(1);
    expect(options[0]?.writerAgent).toBeUndefined();
  });
});
