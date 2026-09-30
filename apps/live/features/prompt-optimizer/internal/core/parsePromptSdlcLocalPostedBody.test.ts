import { describe, expect, it } from "vitest";

import { parsePromptSdlcLocalPostedBody } from "./parsePromptSdlcLocalPostedBody";

describe("parsePromptSdlcLocalPostedBody", () => {
  it("parses urlencoded bodies", () => {
    const params = parsePromptSdlcLocalPostedBody(
      "application/x-www-form-urlencoded",
      "intent=run&goal=Hello&prompt=World",
    );
    expect(params.get("intent")).toBe("run");
    expect(params.get("goal")).toBe("Hello");
    expect(params.get("prompt")).toBe("World");
  });

  it("parses multipart form-data bodies", () => {
    const body = [
      "------WebKitFormBoundaryTEST",
      'Content-Disposition: form-data; name="goal"',
      "",
      "Improve skill",
      "------WebKitFormBoundaryTEST",
      'Content-Disposition: form-data; name="prompt"',
      "",
      "Skill prompt text",
      "------WebKitFormBoundaryTEST",
      'Content-Disposition: form-data; name="intent"',
      "",
      "run",
      "------WebKitFormBoundaryTEST--",
      "",
    ].join("\r\n");
    const params = parsePromptSdlcLocalPostedBody(
      "multipart/form-data; boundary=----WebKitFormBoundaryTEST",
      body,
    );
    expect(params.get("intent")).toBe("run");
    expect(params.get("goal")).toBe("Improve skill");
    expect(params.get("prompt")).toBe("Skill prompt text");
  });
});
