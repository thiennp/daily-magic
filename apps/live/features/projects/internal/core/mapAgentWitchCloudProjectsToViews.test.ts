import { describe, expect, it } from "vitest";

import {
  findAgentWitchProjectById,
  mapAgentWitchCloudProjectsToViews,
} from "./mapAgentWitchCloudProjectsToViews";

describe("mapAgentWitchCloudProjectsToViews", () => {
  it("maps cloud rows to local app views", () => {
    const views = mapAgentWitchCloudProjectsToViews([
      {
        id: "cloud-uuid-1",
        name: "Live App",
        folderPath: "/Users/me/dev/app",
      },
    ]);

    expect(views).toHaveLength(1);
    expect(views[0]).toEqual({
      id: "cloud-uuid-1",
      name: "Live App",
      projectFolderPath: "/Users/me/dev/app",
    });
  });

  it("finds a project by cloud id", () => {
    const views = mapAgentWitchCloudProjectsToViews([
      {
        id: "cloud-uuid-1",
        name: "Live App",
        folderPath: "/Users/me/dev/app",
      },
    ]);

    expect(findAgentWitchProjectById(views, "cloud-uuid-1")?.name).toBe(
      "Live App",
    );
    expect(findAgentWitchProjectById(views, "missing")).toBeNull();
  });
});
