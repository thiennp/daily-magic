import { describe, expect, it } from "vitest";

import { handleAgentWitchInstructionsGet } from "@/lib/agentWitch/instructions/handleAgentWitchInstructionsGet";

describe("handleAgentWitchInstructionsGet", () => {
  it("returns JSON instructions", async () => {
    const response = handleAgentWitchInstructionsGet(
      new Request("http://localhost:3000/api/agent-witch/instructions"),
      "http://localhost:3000",
    );
    const payload: unknown = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      productName: "Agent Witch",
      schemaVersion: 1,
    });
  });

  it("returns markdown when format=text", async () => {
    const response = handleAgentWitchInstructionsGet(
      new Request(
        "http://localhost:3000/api/agent-witch/instructions?format=text&section=tasks",
      ),
      "http://localhost:3000",
    );
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/markdown");
    expect(body).toContain("Sending tasks");
    expect(body).toContain("Which AI runs the job");
  });

  it("returns 404 for unknown section", async () => {
    const response = handleAgentWitchInstructionsGet(
      new Request(
        "http://localhost:3000/api/agent-witch/instructions?section=missing",
      ),
      "http://localhost:3000",
    );

    expect(response.status).toBe(404);
  });
});
