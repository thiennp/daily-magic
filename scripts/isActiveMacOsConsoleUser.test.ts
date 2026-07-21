import { describe, expect, it } from "vitest";

import { isActiveMacOsConsoleUser } from "./isActiveMacOsConsoleUser";
import { isValidMacOsConsoleUsername } from "./readMacOsConsoleUsername";

describe("isValidMacOsConsoleUsername", () => {
  it("AGENT-042: rejects loginwindow and setup users", () => {
    expect(isValidMacOsConsoleUsername("loginwindow")).toBe(false);
    expect(isValidMacOsConsoleUsername("_mbsetupuser")).toBe(false);
    expect(isValidMacOsConsoleUsername("root")).toBe(false);
    expect(isValidMacOsConsoleUsername("")).toBe(false);
  });

  it("AGENT-042: accepts real macOS short usernames", () => {
    expect(isValidMacOsConsoleUsername("alice")).toBe(true);
    expect(isValidMacOsConsoleUsername("Bob")).toBe(true);
  });
});

describe("isActiveMacOsConsoleUser", () => {
  it("AGENT-042: allows non-macOS platforms for dev and CI", () => {
    expect(
      isActiveMacOsConsoleUser({
        platform: "linux",
        consoleUsername: "alice",
        currentUsername: "bob",
      }),
    ).toBe(true);
  });

  it("AGENT-042: matches console and current user case-insensitively", () => {
    expect(
      isActiveMacOsConsoleUser({
        platform: "darwin",
        consoleUsername: "Alice",
        currentUsername: "alice",
      }),
    ).toBe(true);
  });

  it("AGENT-042: rejects background macOS sessions", () => {
    expect(
      isActiveMacOsConsoleUser({
        platform: "darwin",
        consoleUsername: "alice",
        currentUsername: "bob",
      }),
    ).toBe(false);
  });

  it("AGENT-042: rejects when console has no logged-in user", () => {
    expect(
      isActiveMacOsConsoleUser({
        platform: "darwin",
        consoleUsername: null,
        currentUsername: "alice",
      }),
    ).toBe(false);
  });
});
