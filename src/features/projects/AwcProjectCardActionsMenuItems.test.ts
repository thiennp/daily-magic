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
  default: ({ projectName }: { readonly projectName: string }) =>
    createElement(
      "li",
      { "data-testid": "delete-item" },
      `Delete ${projectName}`,
    ),
}));

const baseProps = {
  projectId: "p1",
  projectName: "Alpha",
  isDefaultProject: false,
  assignTasksHref: "/?projectId=p1",
  editCta: {
    state: "unknown_device" as const,
    buttonLabel: "Edit on this Mac",
    href: null,
    helperText: "Connect a Mac to edit this project.",
  },
  editHelperId: undefined as string | undefined,
  onClose: () => undefined,
};

describe("AwcProjectCardActionsMenuItems delete visibility", () => {
  it("shows Delete only when canDelete is true and project is not Default", async () => {
    const { default: Items } = await import(
      "@/features/projects/AwcProjectCardActionsMenuItems"
    );

    const ownerHtml = renderToStaticMarkup(
      createElement(
        "ul",
        null,
        createElement(Items, { ...baseProps, canDelete: true }),
      ),
    );
    expect(ownerHtml).toContain('data-testid="delete-item"');

    const memberHtml = renderToStaticMarkup(
      createElement(
        "ul",
        null,
        createElement(Items, { ...baseProps, canDelete: false }),
      ),
    );
    expect(memberHtml).not.toContain('data-testid="delete-item"');

    const defaultHtml = renderToStaticMarkup(
      createElement(
        "ul",
        null,
        createElement(Items, {
          ...baseProps,
          canDelete: true,
          isDefaultProject: true,
          projectName: "Default",
        }),
      ),
    );
    expect(defaultHtml).not.toContain('data-testid="delete-item"');
  });
});
