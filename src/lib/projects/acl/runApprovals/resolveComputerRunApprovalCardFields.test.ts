import { beforeEach, describe, expect, it, vi } from "vitest";

const findDevice = vi.fn();
const getProject = vi.fn();

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: (id: string) => findDevice(id),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: (id: string) => getProject(id),
}));

import { resolveComputerRunApprovalCardFields } from "@/lib/projects/acl/runApprovals/resolveComputerRunApprovalCardFields";

describe("resolveComputerRunApprovalCardFields", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    findDevice.mockResolvedValue({
      displayName: "Studio Mac",
      deviceLabel: "studio",
    });
    getProject.mockResolvedValue({ folderPath: "/Users/t/proj" });
  });

  it("sources tool, computerName, projectFolder from run + device + project", async () => {
    await expect(
      resolveComputerRunApprovalCardFields({
        writerAgent: "claude-cli",
        deviceId: "dev-1",
        projectId: "proj-1",
      }),
    ).resolves.toEqual({
      tool: "claude-cli",
      computerName: "Studio Mac",
      projectFolder: "/Users/t/proj",
    });
    expect(findDevice).toHaveBeenCalledWith("dev-1");
    expect(getProject).toHaveBeenCalledWith("proj-1");
  });

  it("falls back when the device row is missing", async () => {
    findDevice.mockResolvedValue(null);
    getProject.mockResolvedValue({ folderPath: "" });
    await expect(
      resolveComputerRunApprovalCardFields({
        writerAgent: "  ",
        deviceId: "dev-x",
        projectId: "proj-1",
      }),
    ).resolves.toEqual({
      tool: "claude-cli",
      computerName: "Computer dev-x",
      projectFolder: "",
    });
  });
});
