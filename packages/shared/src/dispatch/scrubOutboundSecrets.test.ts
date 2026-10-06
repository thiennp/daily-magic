import { describe, expect, it } from "vitest";

import { scrubOutboundSecrets } from "./scrubOutboundSecrets";

/** Obviously fake values, assembled so no file holds a real-looking secret. */
const FAKE = "FAKE".repeat(6);
const FAKE_PEM = [
  "-----BEGIN " + "RSA PRIVATE KEY-----",
  "FAKEFAKEFAKE",
  "-----END " + "RSA PRIVATE KEY-----",
].join("\n");

const expectRedacted = (input: string, leaked: string): void => {
  const result = scrubOutboundSecrets(input);
  expect(result.scrubbed).not.toContain(leaked);
  expect(result.scrubbed).toContain("[redacted-");
  expect(result.residualSecret).toBe(false);
  expect(result.replacementCount).toBeGreaterThan(0);
};

describe("scrubOutboundSecrets", () => {
  it.each([
    ["OpenAI-style key", `key sk-${FAKE}`, `sk-${FAKE}`],
    ["Anthropic-style key", `sk-ant-api03-${FAKE}`, FAKE],
    ["GitHub classic token", `ghp_${FAKE}`, `ghp_${FAKE}`],
    ["GitHub fine-grained PAT", `github_pat_11${FAKE}`, FAKE],
    ["Slack token", `xoxb-0000-${FAKE}`, FAKE],
    ["AWS access key id", "id AKIA" + "FAKEFAKEFAKEFAKE", "FAKEFAKEFAKEFAKE"],
    ["bearer token", `Authorization: Bearer ${FAKE}`, FAKE],
    ["PEM private key", `before\n${FAKE_PEM}\nafter`, "FAKEFAKEFAKE"],
    ["pairingToken JSON", `{"pairingToken": "pt_${FAKE}"}`, FAKE],
    ["inline password", `password=${FAKE}`, FAKE],
  ])("redacts %s", (_label, input, leaked) => {
    expectRedacted(input, leaked);
  });

  it("redacts .env-style secret lines but keeps the name", () => {
    const env = `export OPENAI_API_KEY="${FAKE}"\nDB_PASSWORD=${FAKE}\nPATH=/usr/bin`;
    const result = scrubOutboundSecrets(env);
    expect(result.scrubbed).toContain("export OPENAI_API_KEY=");
    expect(result.scrubbed).toContain("DB_PASSWORD=[redacted-secret]");
    expect(result.scrubbed).toContain("PATH=/usr/bin");
    expect(result.scrubbed).not.toContain(FAKE);
  });

  it("redacts a PEM block cut off mid-stream", () => {
    const head = "-----BEGIN " + "PRIVATE KEY-----\nFAKEFAKEFAKE";
    expect(scrubOutboundSecrets(head).scrubbed).toBe("[redacted-private-key]");
  });

  it("leaves ordinary output alone", () => {
    const text = "Ran 12 tests in task-runner. commit 1a2b3c4d done.";
    const result = scrubOutboundSecrets(text);
    expect(result.scrubbed).toBe(text);
    expect(result.replacementCount).toBe(0);
  });

  it("does not double-redact already scrubbed text", () => {
    const once = scrubOutboundSecrets(`API_KEY=${FAKE}`).scrubbed;
    expect(scrubOutboundSecrets(once).replacementCount).toBe(0);
  });
});
