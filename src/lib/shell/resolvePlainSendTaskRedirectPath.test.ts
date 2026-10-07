import { describe, expect, it } from "vitest";

import {
  isPlainSendTaskNewTaskQuery,
  resolvePlainSendTaskRedirectPath,
} from "@/lib/shell/resolvePlainSendTaskRedirectPath";

describe("resolvePlainSendTaskRedirectPath", () => {
  it("maps bare sendTask and customTask to the projects new-task intent", () => {
    expect(
      resolvePlainSendTaskRedirectPath(new URLSearchParams("sendTask=1")),
    ).toBe("/projects?intent=new-task");
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&customTask=1"),
      ),
    ).toBe("/projects?intent=new-task");
    expect(
      isPlainSendTaskNewTaskQuery(
        new URLSearchParams("sendTask=1&customTask=1"),
      ),
    ).toBe(true);
  });

  it("maps projectId / project to project Chat Task mode", () => {
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&projectId=p1"),
      ),
    ).toBe("/projects/p1#chat?mode=task");
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&project=p2"),
      ),
    ).toBe("/projects/p2#chat?mode=task");
  });

  it("keeps Mac / composer deep links on the legacy modal", () => {
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&deviceId=mac-1"),
      ),
    ).toBeNull();
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&openShell=1"),
      ),
    ).toBeNull();
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&libraryCapabilityId=cap-1"),
      ),
    ).toBeNull();
    expect(
      resolvePlainSendTaskRedirectPath(
        new URLSearchParams("sendTask=1&prompt=hi"),
      ),
    ).toBeNull();
  });
});
