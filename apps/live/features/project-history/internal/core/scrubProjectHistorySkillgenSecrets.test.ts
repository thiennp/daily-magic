import { describe, expect, it } from "vitest";

import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";

describe("scrubProjectHistorySkillgenSecrets", () => {
  it("redacts emails and sk- secrets", () => {
    const result = scrubProjectHistorySkillgenSecrets(
      "mail me at a@b.co with sk-abcdefghijklmnopqrstuvwxyz12",
    );
    expect(result.scrubbed).toContain("[redacted-email]");
    expect(result.scrubbed).toContain("[redacted-secret]");
    expect(result.scrubbed).not.toContain("a@b.co");
    expect(result.scrubbed).not.toContain("sk-abc");
    expect(result.residualSecret).toBe(false);
    expect(result.replacementCount).toBeGreaterThanOrEqual(2);
  });

  it("redacts PEM private keys", () => {
    const pem = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg\n-----END PRIVATE KEY-----`;
    const result = scrubProjectHistorySkillgenSecrets(`key:\n${pem}`);
    expect(result.scrubbed).toContain("[redacted-private-key]");
    expect(result.scrubbed).not.toContain("BEGIN PRIVATE KEY");
    expect(result.residualSecret).toBe(false);
  });

  it("redacts bearer and password assignments", () => {
    const result = scrubProjectHistorySkillgenSecrets(
      'Authorization: Bearer abcdefghijklmnop token=supersecretvalue99',
    );
    expect(result.scrubbed).toContain("[redacted-secret]");
    expect(result.residualSecret).toBe(false);
  });
});
