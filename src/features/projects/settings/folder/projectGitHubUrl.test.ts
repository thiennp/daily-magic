import { describe, expect, it } from "vitest";

import { toGitHubWebUrl } from "./projectGitHubUrl";

describe("toGitHubWebUrl", () => {
  it("converts https, scp and ssh GitHub remotes", () => {
    const web = "https://github.com/thiennp/baby-care";
    expect(toGitHubWebUrl("https://github.com/thiennp/baby-care.git")).toBe(
      web,
    );
    expect(toGitHubWebUrl("git@github.com:thiennp/baby-care.git")).toBe(web);
    expect(toGitHubWebUrl("ssh://git@github.com/thiennp/baby-care")).toBe(web);
  });

  it("returns null for other hosts", () => {
    expect(toGitHubWebUrl("https://gitlab.com/a/b.git")).toBeNull();
  });
});
