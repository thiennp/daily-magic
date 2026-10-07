import { describe, expect, it } from "vitest";

import { resolveAwcRouteSkeleton } from "@/features/shell/loading/resolveAwcRouteSkeleton";

describe("DF-016 resolveAwcRouteSkeleton", () => {
  it("maps main pages to matching skeletons", () => {
    expect(resolveAwcRouteSkeleton("/")).toBe("home");
    expect(resolveAwcRouteSkeleton("/projects")).toBe("projects");
    expect(resolveAwcRouteSkeleton("/projects/p_1")).toBe("project");
    expect(resolveAwcRouteSkeleton("/library/item_1")).toBe("project");
    expect(resolveAwcRouteSkeleton("/library")).toBe("projects");
    expect(resolveAwcRouteSkeleton("/new-task")).toBe("projects");
    expect(resolveAwcRouteSkeleton("/marketplace")).toBe("page");
  });

  it("draws no app chrome for non-shell routes", () => {
    expect(resolveAwcRouteSkeleton("/login")).toBe("none");
    expect(resolveAwcRouteSkeleton("/privacy")).toBe("none");
    expect(resolveAwcRouteSkeleton("/accountx")).toBe("none");
  });
});
