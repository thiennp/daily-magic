import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/ui/dropdown/DropdownItem", () => ({
  DropdownItem: ({
    children,
    href,
  }: {
    readonly children?: ReactNode;
    readonly href?: string;
  }) => createElement("a", { href }, children),
}));

vi.mock("@/features/projects/AwcProjectDeleteMenuItem", () => ({
  default: () =>
    createElement("li", { "data-testid": "delete-item" }, "Delete"),
}));

vi.mock("@/features/projects/AwcProjectLeaveMenuItem", () => ({
  default: () =>
    createElement("li", { "data-testid": "leave-item" }, "Leave"),
}));

const baseProps = {
  projectId: "p1",
  isDefaultProject: false,
  assignTasksHref: "/?projectId=p1",
  editCta: {
    state: "unknown_device" as const,
    buttonLabel: "Edit on this computer",
    href: null,
    helperText: "Connect a computer to edit this project.",
  },
  editHelperId: undefined as string | undefined,
  onClose: () => undefined,
  onRequestDelete: () => undefined,
  onRequestLeave: () => undefined,
};

describe("AwcProjectCardActionsMenuItems delete visibility", () => {
  it("shows Delete when canDelete; Leave when canLeave and not Default", async () => {
    const { default: Items } =
      await import("@/features/projects/AwcProjectCardActionsMenuItems");

    const ownerHtml = renderToStaticMarkup(
      createElement(
        "ul",
        null,
        createElement(Items, {
          ...baseProps,
          canDelete: true,
          canLeave: false,
        }),
      ),
    );
    expect(ownerHtml).toContain('data-testid="delete-item"');
    expect(ownerHtml).not.toContain('data-testid="leave-item"');

    const memberHtml = renderToStaticMarkup(
      createElement(
        "ul",
        null,
        createElement(Items, {
          ...baseProps,
          canDelete: false,
          canLeave: true,
        }),
      ),
    );
    expect(memberHtml).not.toContain('data-testid="delete-item"');
    expect(memberHtml).toContain('data-testid="leave-item"');

    const defaultHtml = renderToStaticMarkup(
      createElement(
        "ul",
        null,
        createElement(Items, {
          ...baseProps,
          canDelete: true,
          canLeave: true,
          isDefaultProject: true,
        }),
      ),
    );
    // Default projects may be deleted by the owner (d2761a76); Leave stays hidden.
    expect(defaultHtml).toContain('data-testid="delete-item"');
    expect(defaultHtml).not.toContain('data-testid="leave-item"');
  });
});
